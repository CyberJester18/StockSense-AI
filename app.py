#"""Main entrypoint for StockSense-AI pipeline execution.

#Fetches stock data, computes indicators, trains model, and evaluates accuracy.


import logging
import sys

from analysis.indicators import calculate_indicators
import config
from models.trend_predictor import train_model
from services.stock_fetcher import get_stock_data

# Set up logging format and levels
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    handlers=[
        logging.StreamHandler(sys.stdout),
    ],
)

logger = logging.getLogger(__name__)


def main() -> None:
    """Executes the end-to-end stock prediction pipeline."""
    logger.info("Starting StockSense-AI prediction pipeline.")

    try:
        # 1. Fetch data
        stock_data = get_stock_data(
            symbol=config.SYMBOL,
            start_date=config.START_DATE,
            end_date=config.END_DATE,
        )

        # 2. Calculate Indicators
        stock_data = calculate_indicators(stock_data)

        # 3. Handle any residual missing values
        stock_data = stock_data.dropna()

        # 4. Train Model
        model, accuracy = train_model(stock_data)

        # Output final statistics
        print(stock_data.isnull().sum())
        print(stock_data.shape)

        print(f"Model Accuracy: {accuracy * 100:.2f}%")
        print("\nTarget Distribution:")
        print(stock_data[config.TARGET_COLUMN].value_counts())

        logger.info("StockSense-AI pipeline completed successfully.")

    except Exception as e:
        logger.error("Pipeline execution failed: %s", str(e), exc_info=True)
        sys.exit(1)


if __name__ == "__main__":
    main()
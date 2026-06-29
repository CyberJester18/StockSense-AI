#"""Main entrypoint for StockSense-AI pipeline execution.

#Fetches stock data, computes indicators, trains model, and evaluates accuracy.


import logging
import sys


import config
from services.predictor import predict_stock
from models.trend_predictor import train_model
from services.dataset_builder import build_dataset
from services.model_manager import save_model

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
        # 1. Build dataset
        stock_data = build_dataset()

        # 2. Train model
        model, accuracy = train_model(stock_data)
        save_model(model)

        print(stock_data.isnull().sum())
        print(stock_data.shape)

        print(f"Model Accuracy: {accuracy * 100:.2f}%")

        print("\nTarget Distribution:")
        print(stock_data[config.TARGET_COLUMN].value_counts())

        logger.info("StockSense-AI pipeline completed successfully.")

        prediction = predict_stock("RELIANCE.NS")

        print("\nPrediction for RELIANCE.NS")

        if prediction == 1:
            print("BUY")
        else:
            print("SELL")

    except Exception as e:
        logger.error("Pipeline execution failed: %s", str(e), exc_info=True)
        sys.exit(1)


if __name__ == "__main__":
    main()
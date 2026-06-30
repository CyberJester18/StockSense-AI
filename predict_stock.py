"""
Load the trained model and predict the trend for a stock.
"""

import logging
import sys

from services.predictor import predict_stock

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    handlers=[
        logging.StreamHandler(sys.stdout),
    ],
)

logger = logging.getLogger(__name__)


def main() -> None:
    logger.info("Starting stock prediction...")

    try:
        symbol = input("Enter stock symbol (e.g. RELIANCE.NS): ").strip()

        prediction = predict_stock(symbol)

        print(f"\nPrediction for {symbol}")

        if prediction == 1:
            print("BUY")
        else:
            print("SELL")

        logger.info("Prediction completed successfully.")

    except Exception as e:
        logger.error("Prediction failed: %s", str(e), exc_info=True)
        sys.exit(1)


if __name__ == "__main__":
    main()
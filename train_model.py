"""
Train the StockSense-AI model and save it.
"""

import logging
import sys

import config
from models.trend_predictor import train_model
from services.dataset_builder import build_dataset
from services.model_manager import save_model

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    handlers=[
        logging.StreamHandler(sys.stdout),
    ],
)

logger = logging.getLogger(__name__)


def main() -> None:
    logger.info("Starting model training...")

    try:
        stock_data = build_dataset()

        model, accuracy = train_model(stock_data)

        save_model(model)

        print(stock_data.isnull().sum())
        print(stock_data.shape)

        print(f"Model Accuracy: {accuracy * 100:.2f}%")

        print("\nTarget Distribution:")
        print(stock_data[config.TARGET_COLUMN].value_counts())

        logger.info("Training completed successfully.")

    except Exception as e:
        logger.error("Training failed: %s", str(e), exc_info=True)
        sys.exit(1)


if __name__ == "__main__":
    main()
"""Configuration file for StockSense-AI.

Contains settings for fetching stock data, feature definition,
and model training/evaluation parameters.
"""

from typing import Dict, List, Any

# Stock Data Fetching Settings
SYMBOL: str = "TCS.NS"
START_DATE: str = "2015-01-01"
END_DATE: str = "2025-01-01"

# Features used for the machine learning model
FEATURES: List[str] = [
    "Open",
    "High",
    "Low",
    "Close",
    "Volume",
    "MA20",
    "MA50",
    "EMA20",
    "EMA50",
    "RSI",
    "MACD",
    "MACD_SIGNAL",
    "BB_UPPER",
    "BB_LOWER",
    "ATR",
    "VOLUME_MA20",
    "Daily Return",
]

# Target variable name
TARGET_COLUMN: str = "Target"

# Model Training Settings
RANDOM_STATE: int = 42
TEST_SIZE: float = 0.2
SHUFFLE: bool = False

# Hyperparameter search settings
PARAM_GRID: Dict[str, Any] = {
    "n_estimators": [100, 200, 300, 500],
    "max_depth": [5, 10, 15, 20, None],
    "min_samples_split": [2, 5, 10],
    "min_samples_leaf": [1, 2, 4],
    "max_features": ["sqrt", "log2"],
}

N_ITER: int = 15
CV: int = 3
SCORING: str = "f1"
N_JOBS: int = -1

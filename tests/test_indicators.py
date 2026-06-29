"""Unit tests for analysis/indicators.py."""

import numpy as np
import pandas as pd
import pytest

from analysis.indicators import calculate_indicators


def test_calculate_indicators_structure():
    """Verify that all required indicators and target columns are generated."""
    # Create 100 days of synthetic stock data to satisfy window sizes (like MA50)
    dates = pd.date_range(start="2020-01-01", periods=100)
    np.random.seed(42)

    # Generate upward trending close price to trigger some positive targets
    close_prices = np.linspace(100.0, 150.0, 100) + np.random.normal(0, 1, 100)
    high_prices = close_prices + 2.0
    low_prices = close_prices - 2.0
    open_prices = close_prices + np.random.normal(0, 0.5, 100)
    volume = np.random.randint(1000, 5000, 100)

    df = pd.DataFrame(
        {
            "Open": open_prices,
            "High": high_prices,
            "Low": low_prices,
            "Close": close_prices,
            "Volume": volume,
        },
        index=dates,
    )

    result = calculate_indicators(df)

    # Expected column list
    expected_cols = {
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
        "Target",
    }

    assert expected_cols.issubset(result.columns)
    # Check that dropna worked and there are no NaN values remaining
    assert result.isnull().sum().sum() == 0
    # Check that Target contains binary outputs (0 or 1)
    assert set(result["Target"].unique()).issubset({0, 1})

"""Integration tests for StockSense-AI pipeline."""

from unittest.mock import patch
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier

from services.stock_fetcher import get_stock_data
from analysis.indicators import calculate_indicators
from models.trend_predictor import train_model


@patch("yfinance.download")
def test_pipeline_integration(mock_download):
    """Test full pipeline integration with mocked yfinance API."""
    # Generate 150 days of synthetic data
    dates = pd.date_range(start="2020-01-01", periods=150)
    np.random.seed(42)

    close_prices = np.linspace(100.0, 160.0, 150) + np.random.normal(0, 1, 150)
    df = pd.DataFrame(
        {
            "Open": close_prices - 0.5,
            "High": close_prices + 1.5,
            "Low": close_prices - 1.5,
            "Close": close_prices,
            "Volume": np.random.randint(1000, 5000, 150),
        },
        index=dates,
    )
    # mock_download expects yfinance MultiIndex or single index dataframe
    mock_download.return_value = df

    # 1. Fetch data
    fetched_data = get_stock_data("TEST", "2020-01-01", "2020-06-01")
    assert not fetched_data.empty

    # 2. Indicators
    processed_data = calculate_indicators(fetched_data)
    assert "Target" in processed_data.columns

    # 3. Model Training
    model, accuracy = train_model(processed_data)

    assert isinstance(model, RandomForestClassifier)
    assert 0.0 <= accuracy <= 1.0

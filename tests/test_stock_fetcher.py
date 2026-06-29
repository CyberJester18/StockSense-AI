"""Unit tests for services/stock_fetcher.py."""

from unittest.mock import patch
import pandas as pd
import pytest

from services.stock_fetcher import get_stock_data


def test_get_stock_data_validation():
    """Verify that invalid inputs raise ValueError."""
    with pytest.raises(ValueError, match="symbol must be a non-empty string"):
        get_stock_data(symbol="", start_date="2020-01-01", end_date="2020-01-10")

    with pytest.raises(ValueError, match="non-empty strings"):
        get_stock_data(symbol="AAPL", start_date="", end_date="2020-01-10")


@patch("yfinance.download")
def test_get_stock_data_success(mock_download):
    """Test successful data fetching and preprocessing logic."""
    # Create sample MultiIndex dataframe as returned by yfinance
    columns = pd.MultiIndex.from_tuples(
        [
            ("Open", "AAPL"),
            ("High", "AAPL"),
            ("Low", "AAPL"),
            ("Close", "AAPL"),
            ("Volume", "AAPL"),
        ]
    )
    dates = pd.date_range(start="2020-01-01", periods=5)
    data = [
        [100.0, 105.0, 99.0, 102.0, 1000],
        [100.0, 105.0, 99.0, 102.0, 1000],  # Duplicate row
        [102.0, 106.0, 101.0, 104.0, 1500],
        [104.0, 108.0, 103.0, 105.0, None],  # Contains NaN
        [105.0, 110.0, 104.0, 108.0, 1200],
    ]
    mock_df = pd.DataFrame(data, index=dates, columns=columns)
    mock_download.return_value = mock_df

    result = get_stock_data("AAPL", "2020-01-01", "2020-01-05")

    # Assert MultiIndex is converted
    assert not isinstance(result.columns, pd.MultiIndex)
    assert list(result.columns) == ["Open", "High", "Low", "Close", "Volume"]

    # Assert duplicate row is dropped (5 rows -> 4 unique index dates, one duplicate dropped)
    # The duplicate at index 1 is dropped, leaving 4 rows.
    # The row with NaN is dropped, leaving 3 rows.
    assert len(result) == 3
    assert result.isnull().sum().sum() == 0
    # Assert index is sorted
    assert result.index.is_monotonic_increasing

"""Service for fetching historical stock data from Yahoo Finance.

This module provides utility functions to retrieve and preprocess stock market data
for modeling and analysis.
"""
import os
import logging
import pandas as pd
import yfinance as yf

# Set up module-level logger
logger = logging.getLogger(__name__)
CACHE_DIR = "data/cache"
os.makedirs(CACHE_DIR, exist_ok=True)

def get_stock_data(symbol: str, start_date: str, end_date: str) -> pd.DataFrame:
    """Downloads historical stock price data and applies basic preprocessing.

    Args:
        symbol: The stock symbol or ticker (e.g., "TCS.NS").
        start_date: Start date for fetching data in 'YYYY-MM-DD' format.
        end_date: End date for fetching data in 'YYYY-MM-DD' format.

    Returns:
        A preprocessed pandas DataFrame containing the historical stock data with columns:
        Open, High, Low, Close, Adj Close, Volume, indexed by Date.

    Raises:
        ValueError: If dates are invalid, the symbol is empty, or no data was retrieved.
        RuntimeError: If yfinance download fails due to network or API issues.
    """
    if not symbol:
        raise ValueError("The stock symbol must be a non-empty string.")
    if not start_date or not end_date:
        raise ValueError("Start date and end date must be non-empty strings.")

    logger.info(
        "Attempting to download stock data for ticker '%s' from %s to %s.",
        symbol,
        start_date,
        end_date,
    )

    try:
        cache_file = os.path.join(
            CACHE_DIR,
            f"{symbol.replace('.NS', '')}.csv"
        )

        if os.path.exists(cache_file):

            logger.info("Loading cached data for %s", symbol)

            stock_data = pd.read_csv(
                cache_file,
                index_col=0,
                parse_dates=True,
            )

        else:

            logger.info("Downloading %s from Yahoo Finance...", symbol)

            stock_data = yf.download(
                symbol,
                start=start_date,
                end=end_date,
                auto_adjust=False,
            )
            # Convert MultiIndex BEFORE saving
            if isinstance(stock_data.columns, pd.MultiIndex):
               stock_data.columns = stock_data.columns.get_level_values(0)

            stock_data.to_csv(cache_file)
            logger.info("Saved cache to %s", cache_file)

    except Exception as e:
        logger.error(
                "An error occurred while downloading data for symbol %s: %s",
                symbol,
                str(e),
            )
        raise RuntimeError(
                f"Failed to download stock data for {symbol} due to: {e}"
            ) from e

    if stock_data.empty:
        logger.warning(
            "No data returned for symbol '%s' between %s and %s.",
            symbol,
            start_date,
            end_date,
        )
        raise ValueError(
            f"No stock data found for ticker '{symbol}' in the specified date range."
        )

    # Convert MultiIndex columns to normal columns
    if isinstance(stock_data.columns, pd.MultiIndex):
        logger.debug("Converting MultiIndex columns to single-level columns.")
        stock_data.columns = stock_data.columns.get_level_values(0)

    # Remove duplicate rows
    initial_len = len(stock_data)
    stock_data = stock_data.drop_duplicates()
    duplicate_count = initial_len - len(stock_data)
    if duplicate_count > 0:
        logger.info("Removed %d duplicate rows.", duplicate_count)

    # Remove rows with missing values
    initial_len = len(stock_data)
    stock_data = stock_data.dropna()
    nan_count = initial_len - len(stock_data)
    if nan_count > 0:
        logger.info("Removed %d rows containing missing values.", nan_count)

    # Sort data by date index
    stock_data = stock_data.sort_index()

    logger.info(
        "Successfully fetched and preprocessed %d records for '%s'.",
        len(stock_data),
        symbol,
    )
    return stock_data
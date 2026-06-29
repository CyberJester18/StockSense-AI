"""Module for calculating technical analysis indicators on stock data.

Computes technical indicators such as Moving Averages, RSI, MACD, Bollinger Bands,
Average True Range, Volume Moving Average, Daily Return, and defines the prediction Target.
"""

import logging
import pandas as pd
from ta.momentum import RSIIndicator
from ta.trend import EMAIndicator, MACD
from ta.volatility import AverageTrueRange, BollingerBands

# Set up module-level logger
logger = logging.getLogger(__name__)


def calculate_indicators(stock_data: pd.DataFrame) -> pd.DataFrame:
    """Calculates technical indicators and generates the target variable.

    Note: This function modifies the input DataFrame in-place and drops NaN values.

    Args:
        stock_data: A pandas DataFrame containing historical stock data with columns:
            'Open', 'High', 'Low', 'Close', 'Volume'.

    Returns:
        The input DataFrame modified in-place, containing the technical indicator features
        and the 'Target' column, with rows containing NaN values removed.
    """
    logger.info("Starting calculation of technical indicators.")
    initial_shape = stock_data.shape
    logger.debug("Input DataFrame shape: %s", initial_shape)

    # 1. Moving Averages
    logger.debug("Calculating Simple Moving Averages (MA20, MA50).")
    stock_data["MA20"] = stock_data["Close"].rolling(window=20).mean()
    stock_data["MA50"] = stock_data["Close"].rolling(window=50).mean()

    # 2. EMA
    logger.debug("Calculating Exponential Moving Averages (EMA20, EMA50).")
    stock_data["EMA20"] = EMAIndicator(
        close=stock_data["Close"], window=20
    ).ema_indicator()
    stock_data["EMA50"] = EMAIndicator(
        close=stock_data["Close"], window=50
    ).ema_indicator()

    # 3. RSI
    logger.debug("Calculating Relative Strength Index (RSI).")
    stock_data["RSI"] = RSIIndicator(
        close=stock_data["Close"], window=14
    ).rsi()

    # 4. MACD
    logger.debug("Calculating Moving Average Convergence Divergence (MACD).")
    macd = MACD(close=stock_data["Close"])
    stock_data["MACD"] = macd.macd()
    stock_data["MACD_SIGNAL"] = macd.macd_signal()

    # 5. Bollinger Bands
    logger.debug("Calculating Bollinger Bands (BB_UPPER, BB_LOWER).")
    bb = BollingerBands(close=stock_data["Close"])
    stock_data["BB_UPPER"] = bb.bollinger_hband()
    stock_data["BB_LOWER"] = bb.bollinger_lband()

    # 6. ATR
    logger.debug("Calculating Average True Range (ATR).")
    atr = AverageTrueRange(
        high=stock_data["High"], low=stock_data["Low"], close=stock_data["Close"]
    )
    stock_data["ATR"] = atr.average_true_range()

    # 7. Volume Moving Average
    logger.debug("Calculating Volume Moving Average (VOLUME_MA20).")
    stock_data["VOLUME_MA20"] = stock_data["Volume"].rolling(window=20).mean()

    # 8. Daily Return
    logger.debug("Calculating Daily Return.")
    stock_data["Daily Return"] = stock_data["Close"].pct_change()
  

    # 9. Target calculation
    # Predict whether price increases by at least 2% within the next 5 trading days
    logger.debug("Calculating Target variable (2% increase in next 5 days).")
    future_close = stock_data["Close"].shift(-5)
    stock_data["Target"] = (
        ((future_close - stock_data["Close"]) / stock_data["Close"]) >= 0.02
    ).astype(int)

    # Clean up records that don't have enough history/future data points
    logger.debug("Dropping rows containing NaN values.")
    stock_data.dropna(inplace=True)

    logger.info(
        "Finished calculating indicators. Output DataFrame shape: %s (Dropped %d rows)",
        stock_data.shape,
        initial_shape[0] - stock_data.shape[0],
    )
    return stock_data
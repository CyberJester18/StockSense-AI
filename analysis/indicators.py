import pandas as pd

from ta.trend import EMAIndicator, MACD
from ta.momentum import RSIIndicator
from ta.volatility import BollingerBands, AverageTrueRange


def calculate_indicators(stock_data):
    # Moving Averages
    stock_data["MA20"] = stock_data["Close"].rolling(window=20).mean()
    stock_data["MA50"] = stock_data["Close"].rolling(window=50).mean()

    # EMA
    stock_data["EMA20"] = EMAIndicator(
        close=stock_data["Close"], window=20
    ).ema_indicator()

    stock_data["EMA50"] = EMAIndicator(
        close=stock_data["Close"], window=50
    ).ema_indicator()

    # RSI
    stock_data["RSI"] = RSIIndicator(
        close=stock_data["Close"], window=14
    ).rsi()

    # MACD
    macd = MACD(close=stock_data["Close"])

    stock_data["MACD"] = macd.macd()
    stock_data["MACD_SIGNAL"] = macd.macd_signal()

    # Bollinger Bands
    bb = BollingerBands(close=stock_data["Close"])

    stock_data["BB_UPPER"] = bb.bollinger_hband()
    stock_data["BB_LOWER"] = bb.bollinger_lband()

    # ATR
    atr = AverageTrueRange(
        high=stock_data["High"],
        low=stock_data["Low"],
        close=stock_data["Close"]
    )

    stock_data["ATR"] = atr.average_true_range()

    # Volume Moving Average
    stock_data["VOLUME_MA20"] = (
        stock_data["Volume"].rolling(window=20).mean()
    )

    # Daily Return
    stock_data["Daily Return"] = stock_data["Close"].pct_change()

    # Predict whether price increases by at least 2% within the next 5 trading days

    future_close = stock_data["Close"].shift(-5)

    stock_data["Target"] = (
    ((future_close - stock_data["Close"]) / stock_data["Close"]) >= 0.02
    ).astype(int)

    stock_data.dropna(inplace=True)

    return stock_data
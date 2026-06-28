import pandas as pd


def calculate_indicators(stock_data):

    stock_data["MA20"] = stock_data["Close"].rolling(window=20).mean()

    stock_data["MA50"] = stock_data["Close"].rolling(window=50).mean()

    stock_data["Daily Return"] = stock_data["Close"].pct_change()

    stock_data["Target"] = (
        stock_data["Close"].shift(-1) > stock_data["Close"]
    ).astype(int) 
    stock_data = stock_data.dropna()

    return stock_data
 
def calculate_rsi(stock_data, window=14):

    delta = stock_data["Close"].diff()

    gain = delta.where(delta > 0, 0)

    loss = -delta.where(delta < 0, 0)

    average_gain = gain.rolling(window=window).mean()

    average_loss = loss.rolling(window=window).mean()

    rs = average_gain / average_loss

    rsi = 100 - (100 / (1 + rs))

    stock_data["RSI"] = rsi

    return stock_data

def calculate_macd(stock_data):

    ema12 = stock_data["Close"].ewm(span=12, adjust=False).mean()

    ema26 = stock_data["Close"].ewm(span=26, adjust=False).mean()

    stock_data["MACD"] = ema12 - ema26

    stock_data["Signal"] = stock_data["MACD"].ewm(span=9, adjust=False).mean()

    return stock_data
import yfinance as yf
import pandas as pd


def get_stock_data(symbol, start_date, end_date):

    stock_data = yf.download(
        symbol,
        start=start_date,
        end=end_date,
        auto_adjust=False
    )

    # Convert MultiIndex columns to normal columns
    if isinstance(stock_data.columns, pd.MultiIndex):
        stock_data.columns = stock_data.columns.get_level_values(0)

    # Remove duplicate rows
    stock_data = stock_data.drop_duplicates()

    # Remove rows with missing values
    stock_data = stock_data.dropna()

    # Sort data by date
    stock_data = stock_data.sort_index()

    return stock_data
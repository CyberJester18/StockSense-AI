import pandas as pd

from config import STOCKS, START_DATE, END_DATE
from services.stock_fetcher import get_stock_data
from analysis.indicators import calculate_indicators


def build_dataset():

    all_data = []

    for stock in STOCKS:

        print(f"Processing {stock}...")

        stock_data = get_stock_data(
            symbol=stock,
            start_date=START_DATE,
            end_date=END_DATE,
        )

        stock_data = calculate_indicators(stock_data)

        stock_data["Stock"] = stock

        all_data.append(stock_data)

    dataset = pd.concat(all_data)

    dataset.dropna(inplace=True)

    return dataset
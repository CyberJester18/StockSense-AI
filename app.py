from services.stock_fetcher import get_stock_data
from analysis.indicators import (
    calculate_indicators,
    calculate_rsi,
    calculate_macd
)
from models.trend_predictor import train_model

stock_data = get_stock_data(
    symbol="TCS.NS",
    start_date="2015-01-01",
    end_date="2025-01-01"
)

stock_data = calculate_indicators(stock_data)
stock_data = calculate_rsi(stock_data)
stock_data = calculate_macd(stock_data)
stock_data = stock_data.dropna()
model, accuracy = train_model(stock_data)
print(stock_data.isnull().sum())
print(stock_data.shape) 

print(f"Model Accuracy: {accuracy * 100:.2f}%")
print("\nTarget Distribution:")
print(stock_data["Target"].value_counts())

#print(stock_data[["Close", "Target"]].tail(10))
#stock_data = calculate_indicators(stock_data)
print(stock_data.info())

#print(stock_data.isnull().sum())
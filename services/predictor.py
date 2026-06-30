from services.stock_fetcher import get_stock_data
from analysis.indicators import calculate_indicators
from services.model_manager import load_model
import config
import pandas as pd

def predict_stock(symbol: str):

    model = load_model()

    stock_data = get_stock_data(
        symbol=symbol,
        start_date=config.START_DATE,
        end_date=config.END_DATE,
    )

    stock_data = calculate_indicators(stock_data)
    stock_data = stock_data.dropna()

    latest = stock_data.iloc[-1]

    X = pd.DataFrame(
    [latest[config.FEATURES]],
    columns=config.FEATURES,
)

    prediction = model.predict(X)[0]

    probabilities = model.predict_proba(X)[0]
    confidence = round(max(probabilities) * 100, 2)

    return prediction, confidence
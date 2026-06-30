from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

from services.predictor import predict_stock

app = FastAPI(
    title="StockSense-AI API",
    description="Backend API for stock trend prediction",
    version="1.0.0",
)


class PredictionRequest(BaseModel):
    symbol: str


@app.get("/")
def root():
    return {
        "message": "StockSense-AI API is running"
    }


@app.post("/predict")
def predict(request: PredictionRequest):
    try:
        prediction = predict_stock(request.symbol)

        return {
            "symbol": request.symbol,
            "prediction": "BUY" if prediction == 1 else "SELL"
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
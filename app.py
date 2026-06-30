from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from services.predictor import predict_stock

app = FastAPI(
    title="StockSense-AI API",
    description="Backend API for stock trend prediction",
    version="1.0.0",
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # We'll tighten this after deployment
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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
        symbol = request.symbol.strip().upper()

        if not symbol:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Stock symbol cannot be empty."
            )

        prediction = predict_stock(symbol)

        return {
            "symbol": symbol,
            "prediction": "BUY" if prediction == 1 else "SELL"
        }

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )
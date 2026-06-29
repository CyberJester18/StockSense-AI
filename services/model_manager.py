import os
import joblib

MODEL_DIR = "models/saved_models"
MODEL_PATH = os.path.join(MODEL_DIR, "stock_model.pkl")

os.makedirs(MODEL_DIR, exist_ok=True)


def save_model(model):
    joblib.dump(model, MODEL_PATH)
    print(f"Model saved -> {MODEL_PATH}")


def load_model():
    if not os.path.exists(MODEL_PATH):
        raise FileNotFoundError("No trained model found.")

    return joblib.load(MODEL_PATH)
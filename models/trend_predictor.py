from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    confusion_matrix,
)


def train_model(stock_data):

    features = [
        "Open",
        "High",
        "Low",
        "Close",
        "Volume",
        "MA20",
        "MA50",
        "EMA20",
        "EMA50",
        "RSI",
        "MACD",
        "MACD_SIGNAL",
        "BB_UPPER",
        "BB_LOWER",
        "ATR",
        "VOLUME_MA20",
        "Daily Return",
    ]

    X = stock_data[features]
    y = stock_data["Target"]

    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=0.2,
        shuffle=False,
    )

    model = RandomForestClassifier(
        n_estimators=300,
        random_state=42,
    )

    model.fit(X_train, y_train)

    predictions = model.predict(X_test)

    accuracy = accuracy_score(y_test, predictions)
    precision = precision_score(y_test, predictions)
    recall = recall_score(y_test, predictions)
    f1 = f1_score(y_test, predictions)
    cm = confusion_matrix(y_test, predictions)

    print("\nAccuracy :", accuracy)
    print("Precision:", precision)
    print("Recall   :", recall)
    print("F1 Score :", f1)
    print("\nConfusion Matrix")
    print(cm)

    return model, accuracy
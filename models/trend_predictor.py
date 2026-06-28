from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score


def train_model(stock_data):

    features = ["Open", "High", "Low", "Close", "Volume", "MA20", "MA50", "Daily Return","RSI","MACD",
    "Signal"]

    X = stock_data[features]

    y = stock_data["Target"]

    X_train, X_test, y_train, y_test = train_test_split(
        
        X,
        y,
        test_size=0.2,
        random_state=42,
        shuffle=False
    )
    scaler = StandardScaler()

    X_train = scaler.fit_transform(X_train)

    X_test = scaler.transform(X_test)

    #model = LogisticRegression( 
        #max_iter=3000,
        #random_state=42)
    model = RandomForestClassifier(
    n_estimators=200,
    random_state=42
)
    model.fit(X_train, y_train)
    
    print(X.isnull().sum())
    print(y.isnull().sum())
    predictions = model.predict(X_test)

    accuracy = accuracy_score(y_test, predictions)

    return model, accuracy
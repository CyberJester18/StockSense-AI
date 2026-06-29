"""Module for training the trend prediction model.

Uses a Random Forest Classifier and Randomized Search CV to tune hyperparameters
and evaluate model performance on test data.
"""

import logging
from typing import Tuple

import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (
    accuracy_score,
    confusion_matrix,
    f1_score,
    precision_score,
    recall_score,
)
from sklearn.model_selection import RandomizedSearchCV, train_test_split

import config

# Set up module-level logger
logger = logging.getLogger(__name__)


def train_model(stock_data: pd.DataFrame) -> Tuple[RandomForestClassifier, float]:
    """Splits data, tunes Random Forest hyperparameters, trains, and evaluates the model.

    Args:
        stock_data: Preprocessed stock DataFrame containing features and target.

    Returns:
        A tuple of:
            - The trained best estimator (RandomForestClassifier).
            - The accuracy of the model on the test dataset.
    """
    logger.info("Initializing train-test split for model training.")

    X = stock_data[config.FEATURES]
    y = stock_data[config.TARGET_COLUMN]

    # Perform sequential (non-shuffled) train-test split for time-series data
    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=config.TEST_SIZE,
        shuffle=config.SHUFFLE,
        random_state=config.RANDOM_STATE,
    )

    logger.info(
        "Train set shape: %s, Test set shape: %s", X_train.shape, X_test.shape
    )

    rf = RandomForestClassifier(random_state=config.RANDOM_STATE)

    # Initialize RandomizedSearchCV with parameters from config
    search = RandomizedSearchCV(
        estimator=rf,
        param_distributions=config.PARAM_GRID,
        n_iter=config.N_ITER,
        cv=config.CV,
        scoring=config.SCORING,
        n_jobs=config.N_JOBS,
        random_state=config.RANDOM_STATE,
    )

    logger.info(
        "Running RandomizedSearchCV hyperparameter optimization (n_iter=%d, cv=%d)...",
        config.N_ITER,
        config.CV,
    )
    search.fit(X_train, y_train)

    model = search.best_estimator_
    logger.info("Best Parameters found: %s", search.best_params_)

    # Evaluation
    predictions = model.predict(X_test)
    accuracy = accuracy_score(y_test, predictions)
    precision = precision_score(y_test, predictions, zero_division=0)
    recall = recall_score(y_test, predictions, zero_division=0)
    f1 = f1_score(y_test, predictions, zero_division=0)
    cm = confusion_matrix(y_test, predictions)

    # Log metrics
    logger.info("Model training and evaluation complete.")
    logger.info("Accuracy : %.6f", accuracy)
    logger.info("Precision: %.6f", precision)
    logger.info("Recall   : %.6f", recall)
    logger.info("F1 Score : %.6f", f1)
    logger.info("Confusion Matrix:\n%s", cm)

    # Keep print statement-like logs for CLI compatibility
    print("\nBest Parameters:")
    print(search.best_params_)
    print("\nAccuracy :", accuracy)
    print("Precision:", precision)
    print("Recall   :", recall)
    print("F1 Score :", f1)
    print("\nConfusion Matrix")
    print(cm)

    return model, accuracy
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.metrics import r2_score
import os
import traceback

def _process(REGION, CATEGORY):
    # === CONFIG ===
    CSV_FILE = "uploaded.csv"
    #REGION = 12             # e.g. Region III
    #CATEGORY = 2           # 1=Public, 2=Private, etc.
    FORECAST_YEARS = list(range(2010, 2030))  # up to 2030

    # === LOAD DATA ===
    df = pd.read_csv(CSV_FILE, sep="\t|,", engine="python")  # handle tabs or commas
    df = df[df["Region"] == REGION]
    df = df[df["Category"] == CATEGORY]

    # Extract numeric year (from "2010-2011" -> 2010)
    df["StartYear"] = df["Year"].astype(int)

    # Compute total enrollment across all columns except Year/Category/Region
    value_cols = [c for c in df.columns if "Male" in c or "Female" in c]
    df["TotalEnrollment"] = df[value_cols].sum(axis=1)

    #df["Growth"] = df["TotalEnrollment"].pct_change()
    #df = df.dropna()

    #X = df[["StartYear"]].values
    #y = df["Growth"].values

    #X = df[["StartYear"]].values
    #y = df["TotalEnrollment"].values

    df["Lag1"] = df["TotalEnrollment"].shift(1)
    df["Lag2"] = df["TotalEnrollment"].shift(2)
    df = df.dropna()

    X = df[["StartYear", "Lag1", "Lag2"]]
    y = df["TotalEnrollment"]

    def forecast_future(model, df, future_years):
        """Predict future years sequentially using lag features."""
        last_lag1 = df["TotalEnrollment"].iloc[-1]
        last_lag2 = df["TotalEnrollment"].iloc[-2]
        future_preds = []

        for year in future_years:
            X_future = np.array([[year, last_lag1, last_lag2]])
            y_pred = model.predict(X_future)[0]
            future_preds.append(y_pred)

            # update lags
            last_lag2 = last_lag1
            last_lag1 = y_pred

        return np.array(future_preds)

    # === TRAIN AND PREDICT ===
    def train_and_plot(model, model_name):
        model.fit(X, y)
        preds = model.predict(X)
        future_years = np.array(FORECAST_YEARS).reshape(-1, 1)
        future_preds = forecast_future(model, df, FORECAST_YEARS) # model.predict(future_years)
        
        # Debug info
        print(f"\n=== {model_name} ===")
        print(f"R² Score (fit): {r2_score(y, preds):.4f}")
        if hasattr(model, "feature_importances_"):
            print("Feature importance:", model.feature_importances_)
        elif hasattr(model, "coef_"):
            print("Coefficients:", model.coef_, "Intercept:", model.intercept_)
        
        # Plot
        plt.figure(figsize=(8, 4))
        plt.plot(df["StartYear"], y, "bo-", label="Actual")
        plt.plot(df["StartYear"], preds, "r--", label="Predicted (Train)")
        plt.plot(future_years, future_preds, "g--", label="Forecast (2021-2030)")
        plt.title(f"{model_name} — Region {REGION}, Category {CATEGORY}")
        plt.xlabel("Year")
        plt.ylabel("Total Enrollment")
        plt.legend()
        #plt.margins(y=0.5)
        ymin, ymax = min(y), max(y)
        plt.ylim(ymin - 1.5*(ymax - ymin), ymax + 1.5*(ymax - ymin))
        plt.grid(True)

        if not os.path.exists("./static"):
            os.makedirs("./static")
        plt.savefig(f"./static/{model_name}.jpg")

    # 1️⃣ Linear Regression
    train_and_plot(LinearRegression(), "Linear Regression")

    # 2️⃣ Random Forest (lightweight)
    train_and_plot(RandomForestRegressor(n_estimators=200, max_depth=8, random_state=42), "Random Forest Regressor")

    # 3️⃣ Gradient Boosting (slightly slower but accurate)
    train_and_plot(GradientBoostingRegressor(n_estimators=1000, max_depth=30, random_state=96), "Gradient Boosting Regressor")

def process(REGION, CATEGORY):
    try:
        _process(REGION, CATEGORY)
        return 0
    except Exception as e:
        print(traceback.format_exc())
        return -1
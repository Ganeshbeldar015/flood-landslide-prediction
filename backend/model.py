import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import pickle

data = pd.read_csv("dataset.csv")

X = data.drop(["flood", "landslide"], axis=1)
y_flood = data["flood"]
y_landslide = data["landslide"]

flood_model = RandomForestClassifier()
landslide_model = RandomForestClassifier()

flood_model.fit(X, y_flood)
landslide_model.fit(X, y_landslide)

with open("flood_model.pkl", "wb") as f:
    pickle.dump(flood_model, f)

with open("landslide_model.pkl", "wb") as f:
    pickle.dump(landslide_model, f)

print("Models trained successfully")

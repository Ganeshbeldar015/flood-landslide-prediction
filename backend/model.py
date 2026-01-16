import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import pickle

data = pd.read_csv("dataset.csv")
X = data.drop(["flood", "landslide"], axis=1)

flood_model = RandomForestClassifier()
landslide_model = RandomForestClassifier()

flood_model.fit(X, data["flood"])
landslide_model.fit(X, data["landslide"])

pickle.dump(flood_model, open("flood_model.pkl", "wb"))
pickle.dump(landslide_model, open("landslide_model.pkl", "wb"))

print("Models trained successfully")

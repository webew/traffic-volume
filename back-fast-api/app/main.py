from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# from sklearn.tree import DecisionTreeRegressor
# from sklearn.ensemble import RandomForestRegressor
import pandas as pd
# import numpy as np
import joblib
from pydantic import BaseModel
# from FormData import FormData

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model_path = "./app/decision_tree1.pkl" # plus rapide et beaucoup plus léger
# model_path = "./app/random_forest1.pkl"

class FormData(BaseModel):
    holiday: str
    temp: float
    rain_1h: float
    snow_1h: float
    clouds_all: int
    weather_main: str
    weather_description: str
    day: str
    month: int
    year: int
    hour: int


@app.get("/")
async def read_root():
    return {"message": "Bienvenue sur FastAPI avec Docker !"}

@app.post("/api")
async def api(data: FormData):
    data = data.model_dump()
    # print("====================================================")
    # print(type(data))
    # print(data)
    
    try:
        model = joblib.load(model_path)
        sampleSeries = pd.DataFrame([data])
        prediction = model.predict(sampleSeries)
        print(prediction)
        return {"prediction": prediction.tolist()[0]}
    except FileNotFoundError:
        return {"error": f"Model file not found at {model_path}"}


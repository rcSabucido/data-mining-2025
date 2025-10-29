from dotenv import load_dotenv
import asyncio
from flask import Flask, render_template, send_from_directory, jsonify, request
from flask_cors import CORS, cross_origin
import os
import predictor
import traceback

for env_file in ('.env', '.flaskenv'):
    env = os.path.join(os.getcwd(), env_file)
    if os.path.exists(env):
        load_dotenv(env)

app = Flask(__name__)
CORS(app)

@app.route(f"/{os.getenv("DIR")}/predict")
async def predict():
    region = int(request.args.get('region'))
    category = int(request.args.get('category'))
    return jsonify({"success": predictor.process(region, category) == 0})

@app.route(f"/{os.getenv("DIR")}/upload", methods=['POST'])
def upload_file():
    try:
        if 'file' in request.files:
            file = request.files['file']
            file.save("./uploaded.csv")
            return jsonify({"success": True})
    except Exception as e:
        print(traceback.format_exc())
    return jsonify({"success": False})

if __name__ == '__main__':
    app.run(debug=True)
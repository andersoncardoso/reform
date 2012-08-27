from flask import Flask, jsonify, send_file

app = Flask(__name__)
app.debug = True
app.static_folder = './'


def jsonify_with_status(code, json):
    resp = jsonify(json)
    resp.status_code = code
    return resp

@app.route('/')
def index():
    return send_file('index.html')

@app.route('/model', methods=['POST'])
def model():
    return jsonify_with_status(200, {'bla': 'ble'})


app.run()

from flask import Flask, request, jsonify
from flask_cors import CORS

from audioProcess import audioprocess

app = Flask(__name__)

cors = CORS(app, resources={r"*": {"origins": "*"}})

@app.route('/upload-audio', methods=['POST'])
def upload_audio():
    if 'audio' not in request.files:
        return jsonify({'message': 'No audio file part'})

    audio_file = request.files['audio']
    print(audio_file)
    if audio_file.filename == '':
        return jsonify({'message': 'No selected file'})

    # Process the audio file, e.g., save it, perform analysis, etc.
    # Ensure you have a folder for audio storage if needed.
    #audioprocess(audio_file)
    #return jsonify({'message': audioprocess(audio_file)})
    return jsonify({'message': audioprocess(audio_file)}), 200

if __name__ == '__main__':
    app.run()

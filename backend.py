from flask import Flask, request, jsonify

from audioProcess import audioprocess

app = Flask(__name__)

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
    return jsonify({'message': audioprocess(audio_file)})

if __name__ == '__main__':
    app.run()

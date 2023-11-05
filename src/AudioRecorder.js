import React, { Component } from 'react';
import { ReactMic } from 'react-mic';

class AudioRecorder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRecording: false,
      audioData: {
        blob: null,
        url: null,
      },
    };
  }

  onStart = () => {
    this.setState({ isRecording: true });
  }

  onStop = (recordedBlob) => {
    this.setState({
      isRecording: false,
      audioData: {
        blob: recordedBlob.blob,
        url: recordedBlob.blobURL,
      },
    });

    if (recordedBlob.blob) {
      this.sendAudioToBackend(recordedBlob.blob);
    }
  }

  sendAudioToBackend = async (audioBlob) => {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recorded-audio.flac');

    try {
      const response = await fetch('http://127.0.0.1:5000/upload-audio', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // Successfully sent the audio data to the backend
      } else {
        // Handle error if needed
      }
    } catch (error) {
      // Handle network or other errors
    }
  }

  render() {
    return (
      <div>
        <ReactMic
          record={this.state.isRecording}
          onStop={this.onStop}
          onStart={this.onStart}
          mimeType="audio/flac"
        />
        <button onClick={this.state.isRecording ? this.onStop : this.onStart}>
          {this.state.isRecording ? 'Stop Recording' : 'Start Recording'}
        </button>
      </div>
    );
  }
}

export default AudioRecorder;

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
  }

  downloadAudio = () => {
    const { audioData } = this.state;
    if (audioData.blob) {
      const link = document.createElement('a');
      link.href = audioData.url;
      link.download = 'recorded-audio.wav';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  render() {
    return (
      <div>
        <ReactMic
          record={this.state.isRecording}
          onStop={this.onStop}
          onStart={this.onStart}
          mimeType="audio/wav"
        />
        <button onClick={this.state.isRecording ? this.onStop : this.onStart}>
          {this.state.isRecording ? 'Stop Recording' : 'Start Recording'}
        </button>
        <button onClick={this.downloadAudio}>Download Recorded Audio</button>
      </div>
    );
  }
}

export default AudioRecorder;

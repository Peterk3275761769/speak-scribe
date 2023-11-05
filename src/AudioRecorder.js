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
      outputText : "Placeholder text"
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

      if (response.status === 200) {
        const data = await response.json();
        console.log('message', data);
      } else {
        console.error('Response status is not OK:', response.status);
        // Handle error if needed
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle network or other errors
    }
  }

  toggleRecording = () => {
    this.setState(prevState => ({ isRecording: !prevState.isRecording }));
  }

  render() {
    return (
      <>
        <div className='recorder'>
          <textarea readonly={true} className='output-area' rows={8} cols={50}>
            {this.state.outputText}
          </textarea>

          <ReactMic
            record={this.state.isRecording}
            onStop={this.onStop}
            onStart={this.onStart}
            mimeType="audio/flac"
          />
          
          <img
            className={`record-button ${this.state.isRecording ? 'recording' : ''}`}
            src={this.state.isRecording ? 'stop_button.png' : 'record_button.png'}
            alt={this.state.isRecording ? 'Stop Recording' : 'Start Recording'}
            onClick={this.toggleRecording}
          />
        </div>
      </>
      
    );
  }
}

export default AudioRecorder;

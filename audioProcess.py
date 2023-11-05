import os
import openai
from google.cloud import storage
from google.cloud import speech

openai.api_key = os.getenv("OPENAI_API_KEY")

def audioprocess(audio_file):

    # setup for cloud storage of the audio recording
    client = storage.Client(project='testproject-404117')


    bucket=client.get_bucket('test-bucket-321332173982');  
    blob=bucket.blob("audio.flac")
    blob.upload_from_file(audio_file)

    # setup for processing the speech
    def speech_to_text(
        config: speech.RecognitionConfig,
        audio: speech.RecognitionAudio,
    ) -> speech.RecognizeResponse:
        client = speech.SpeechClient()

        # Synchronous speech recognition request
        response = client.recognize(config=config, audio=audio)

    # return response
        return response.results[0].alternatives[0].transcript


    config = speech.RecognitionConfig(
        language_code="en",
        audio_channel_count=2
    )
    audio = speech.RecognitionAudio(
        uri="gs://test-bucket-321332173982/audio.flac",
    )
    response = speech_to_text(config, audio)
    print(response)


    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system",
            "content": """You are my assistant and I am rambling to you about all the tasks I need to do. 
            Create a list of bullet points of all the different tasks I told you. If a date (including things like "next monday") has been mentioned include it
            in parentheses at the end of the line, if a specific date is given give it in "(dd-mm)" format."""},
            {"role": "user", "content": response}
        ]
    )
    print(completion.choices[0].message.content)
    return completion.choices[0].message.content

    


#print(audioprocess("audiotest2.wav"))
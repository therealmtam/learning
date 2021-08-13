import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Browser from './Browser';

//-------------
import io from 'socket.io-client';

/*
- https://socket.io/docs/v2/handling-cors/
- https://stackoverflow.com/questions/44628363/socket-io-access-control-allow-origin-error
*/
const socket = io("http://localhost:3000", { transports : ['websocket'] });
//-------------

/*
https://github.com/xiqi/react-native-live-audio-stream
*/
import LiveAudioStream from 'react-native-live-audio-stream';
import { Buffer } from 'buffer';
const options = {
  sampleRate: 44100,  // default is 44100 but 32000 is adequate for accurate voice recognition
  channels: 1,        // 1 or 2, default 1
  bitsPerSample: 16,  // 8 or 16, default 16
  audioSource: 6,     // android only (see below)
  bufferSize: 4096    // default is 2048
};

///////////============================================
///////////============================================
///////////============================================
///////////============================================
///////////============================================
///////////============================================

export default function App() {


  useEffect(() => {

    // configure then start the socket

    socket.on('connect', () => {
      console.log('\n');
      console.log('client-side socket - connect');

      // tell the server to initialize the socket using an auth token
      const authToken = 'temporary holder';
      socket.emit('initialize', authToken);
    });

    socket.on('server_ready', () => {
        // start transcription
        socket.emit('start_transcription');

        // ----------------------
        LiveAudioStream.init(options);
        LiveAudioStream.on('data', data => {
            // base64-encoded audio data chunks
            const chunk = Buffer.from(data, 'base64');

            /*
            https://cloud.google.com/speech-to-text/docs/base64-encoding#embedding_base64_encoded_audio
            - Audio data is binary data. Within a gRPC request, you can simply write the binary data out directly; however, JSON is used when making a REST request. JSON is a text format that does not directly support binary data, so you will need to convert such binary data into text using Base64 encoding.

            - Since the buffer is already base64 encoded, we just need to forward this onto Google.
            - Note - we had to make the sample rate, channel, and buffer size of the live stream the same as Google's config in the server.
            */

            // send audio data to the server
            socket.emit('audio', chunk);
        });
        // start the stream
        LiveAudioStream.start();
        // LiveAudioStream.stop();
    });

    socket.on('transcription', (transcriptionObj) => {
        console.log('\n');
        console.log('client-side socket - transcription');

        // google's transcription sent to the FE
        const transcription = JSON.parse(transcriptionObj);

        console.log('\n\n');
        console.log('transcription => ', transcription);
        console.log('\n\n');
    });

    socket.connect();

    //-------------------

    /*
    what I'll have to do next is to build an orchestrator and connect state to the commands so once the command isFinal, I can use the code to get the orch config for the command and then use the orchestrator to inject it into the Browser window. I need the retry mechanisms I had in the chromeExtension that would retry if it couldn't select an element. Then at the completion of the orchestration, need a return status indicating success or failure and why.

    mvp - voice, orchestrate, bluetooth or cast to a screen

    */
  });


  return (
    <View style={styles.container}>
        <View style={styles.browser}>
          <Browser/>
        </View>
        <Text>Open up App.js to start working on your app! HELLO</Text>
    </View>
  );
}
/*
Functions:
- fetch profile from server for a given user
  - once with the profile, store it locally (in memory, db for later)

- then we need to take input from user via voice and show it on the screen
  - mechanism is to create the web socket if logged in (assume user is logged in), then


-----
- on need to access a mic and accept audio - then pipe the audio to the server.


// https://reactnativepaper.com/


*/

const styles = StyleSheet.create({
  browser: {
    flex: 1,
    flexDirection: 'row'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

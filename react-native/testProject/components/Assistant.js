import React, { useEffect, useState, useContext, useCallback } from 'react';
import Profile from './Profile';
import { SocketContext } from '../components/context';
import { executeCommand } from '../utils/extension';

//------------------------------------------------------
const removeConnectionToSendAudio = async (setReadyToTranscribe, setTranscription, socket) => {
    console.log('\n');
    console.log('client-side socket - removeConnectionToSendAudio');

    /*
    socket = io() = {
        connected: true|false,
        disconnected: true|false,
        ids: 0,
        nsp: '/',
        _callbacks: {
            $connect: [function]
            $disconnect: [function]
            $server_ready: [function]
            $transcription: [function]
            "$error|no auth token": [function]
        },
        ...
    }
    */
    if (socket.connected === true) {
        // disconnect the socket, keep it on the window for possible reconnection
        socket.disconnect(true);
    }

    // reset state values
    setReadyToTranscribe(false);
    setTranscription({
        transcription: null,
        isFinal: false,
    });
};

const startTranscription = (socket) => {
    console.log('\n');
    console.log('client-side socket - startTranscription');

    if (!socket) {
        console.log('\n');
        console.log('client-side socket - startTranscription - no socket');
        return;
    }
    //--------------------
    /*
    tell server to prepare to accept audio for transcription by connecting to google and having a stream from client audio connected to google
    */
    socket.emit('start_transcription');

    //--------------------
    const handleBrowserAudioStream = (browserAudioStream) => {
        /*
        browserAudioStream = {
            active: true
            id: "XUC8gDsye8szr6hYy2byKGeHpsxu3VBhs2It"
            onactive: null
            onaddtrack: null
            oninactive: null
            onremovetrack: null
        } <= this is a MediaStream interface

        https://developer.mozilla.org/en-US/docs/Web/API/MediaStream
        */

        browserAudioStream.oninactive = (event) => {
            console.log('Stream ended');
        };
        browserAudioStream.onremovetrack = (event) => {
            console.log('Stream ended');
        };

        const bufferSize = 4096;
        const processor = window.audioContext.createScriptProcessor(bufferSize, 1, 1);

        processor.onaudioprocess = (event) => {
            /*
            https://developer.mozilla.org/en-US/docs/Web/API/AudioProcessingEvent
            event = {
                bubbles: true
                cancelBubble: false
                cancelable: false
                composed: false
                currentTarget: ScriptProcessorNode {bufferSize: 4096, context: AudioContext, numberOfInputs: 1, numberOfOutputs: 1, onaudioprocess: ƒ, …}
                defaultPrevented: false
                eventPhase: 0
                inputBuffer: AudioBuffer {length: 4096, duration: 0.09287981859410431, sampleRate: 44100, numberOfChannels: 1}
                isTrusted: true
                outputBuffer: AudioBuffer {length: 4096, duration: 0.09287981859410431, sampleRate: 44100, numberOfChannels: 1}
                path: []
                playbackTime: 2.3219954648526078
                returnValue: true
                srcElement: ScriptProcessorNode {bufferSize: 4096, context: AudioContext, numberOfInputs: 1, numberOfOutputs: 1, onaudioprocess: ƒ, …}
                target: ScriptProcessorNode {bufferSize: 4096, context: AudioContext, numberOfInputs: 1, numberOfOutputs: 1, onaudioprocess: ƒ, …}
                timeStamp: 11311.699999988079
                type: "audioprocess",
                ...
            }
            */
            console.log('script.onaudioprocess =>');

            var input = event.inputBuffer.getChannelData(0) || new Float32Array(4096);

            for (var idx = input.length, newData = new Int16Array(idx); idx--;) {
                newData[idx] = 32767 * Math.min(1, input[idx]);
            }

            // send audio data to the server
            if (socket) {
                // send the browser audio to the socket
                socket.emit('audio', newData);
            }
        }

        if (!window.calledOnce) {
            const mic = window.audioContext.createMediaStreamSource(browserAudioStream);
            mic.connect(processor);
            processor.connect(window.audioContext.destination);

            // stash the processor on the window
            window.processor = processor;

            // resume audio if the browser already had the mic open.
            // https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/resume#example
            if (window.audioContext.state === 'suspended') {
                window.audioContext.resume();
            }

            window.calledOnce = true;
        }
    }
    //--------------------
    // get an audio stream from the browser
    // https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
    const mediaConstraints = {
        audio: true, // get web audio stream.
        video: false
    };

    navigator.mediaDevices.getUserMedia(mediaConstraints)
        .then(handleBrowserAudioStream)
        .catch((error) => {
            console.log('navigator.getUserMedia error: ', error);
        });
    //--------------------
};

const reEstablishConnectionToSendAudio = (socket) => {
    console.log('\n');
    console.log('client-side socket - reEstablishConnectionToSendAudio');

    // tell the server to reconnect the socket
    socket.connect();
};

//================================================
//================================================
//================================================

const Assistant = (props) => {
    // extract props to use
    const { setGlobalState, globalState, userContext } = props.globalStateHandler;

    // local state of the app
    const [ onProfilePage, setOnProfilePage ] = useState(false);
    const [ readyToTranscribe, setReadyToTranscribe ] = useState(false);
    const [ transcription, setTranscription ] = useState({ transcription: null, isFinal: false });

    // use context
    const socket = useContext(SocketContext);

    //-------------------------------
    const handleServerReady = useCallback(() => {
        console.log('\n');
        console.log('client-side socket - server_ready');

        // set the readyToTranscribe
        setReadyToTranscribe(true);
    }, []);
    //-------------------------------
    const handleTranscription = useCallback((transcriptionObj) => {
        console.log('\n');
        console.log('client-side socket - transcription');

        // google's transcription sent to the FE
        const transcription = JSON.parse(transcriptionObj);

        // set the transcription text
        setTranscription({
            transcription: transcription.text,
            isFinal: transcription.isFinal,
        });
    }, []);
    //-------------------------------
    // TODO - make a stop button that tells the browser we no longer are using the mic. This requires learning how the audio connection process is created.
    const handleDisconnect = useCallback(() => {
        console.log('\n');
        console.log('client-side socket - disconnect');

        // when the server is disconnected (server down or server manually disconnects socket), disconnect the socket on the client side and stop long polling
        console.log('\n');
        console.log('client-side socket - removeConnectionToSendAudio');

        if (socket.connected === true) {
            // disconnect the socket, keep it on the window for possible reconnection
            socket.disconnect(true);
        }

        // reset state values
        setReadyToTranscribe(false);
        setTranscription({
            transcription: null,
            isFinal: false,
        });
    }, []);
    //-------------------------------
    useEffect(() => {
        // as soon as the component is mounted, do the following tasks:

        socket.on('connect', () => {
            console.log('\n');
            console.log('client-side socket - connect');

            // tell the server to initialize the socket using an auth token
            const authToken = 'temporary holder';
            socket.emit('initialize', authToken);
        });

        // when the server socket is configured and ready to accept audio
        socket.on('server_ready', handleServerReady);

        socket.on('transcription', handleTranscription);

        // error handling events
        socket.on('error|no auth token', () => {
            console.log('\n');
            console.log('client-side socket - error|no auth token');
        });

        socket.on('disconnect', handleDisconnect);

        return () => {
            // before the component is destroyed
            // unbind all event handlers used in this component
            socket.off('server_ready', handleServerReady);
            socket.off('transcription', handleTranscription);
            socket.off('disconnect', handleDisconnect);
        };
    }, [socket, handleServerReady, handleTranscription, handleDisconnect]);

    //-------------------------------
    useEffect(() => {
        // https://daveceddia.com/useeffect-hook-examples/
        // this effect will fire every time there is a change to transcription. The vars used within the closure will be stale data after the closure. So when transcription updates, the closure can be recreated with the latest state of transcription.
        if (transcription.isFinal === true) {
            const currentUrl = userContext.activeTabUrl; // from state
            const userConfig = {}; // from user state

            console.log('\n');
            console.log('Transcription is final => ');
            console.log('transcription => ', transcription);
            console.log('current url of user => ', currentUrl);
            // console.log('current url of user => ', currentUrl);

            executeCommand(transcription, currentUrl, userConfig);
        }
    }, [ transcription ])

    //-------------------------------
    return (
        <div>
            <nav class="dt w-100 border-box pa3 ph5-ns">

                <h3>Assistant</h3>

                <div class="dtc v-mid w-75 tr">

                    <a class="link dim dark-gray f6 f5-ns dib mr3 mr4-ns" href="#" onClick={() => setOnProfilePage(!onProfilePage)} title="profile">

                    { onProfilePage ? 'Assistant' : 'Profile'}

                    </a>

                </div>

            </nav>
            {
                onProfilePage ?
                <Profile /> :
                <div>
                    {JSON.stringify(userContext)}
                    <h4>Transcription:</h4>
                    {
                        transcription.transcription &&
                        <div>
                            {transcription.transcription}
                        </div>
                    }
                    <br/>
                    {
                        readyToTranscribe ?
                        <div>

                            <button className="start" onClick={() => startTranscription(socket) }>Start</button>

                            <button className="remove" onClick={() => removeConnectionToSendAudio(setReadyToTranscribe, setTranscription, socket) }>Remove</button>

                        </div>
                        :
                        <div>
                            <button className="reconnect" onClick={() => reEstablishConnectionToSendAudio(socket) }>Reconnect</button>
                        </div>
                    }
                </div>
            }
        </div>
    );
};

export default Assistant;

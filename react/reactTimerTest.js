import React from "react"

export default function App() {
    /*
    when you hit start, you will start the timer.
    WHen you hit stop, you will stop the timer.
    Timer will support maximum of ~1 year (365 days) 000D:00H:00M:00S
    When you hit reset you will 0 the timer.
    Smallest unit to store time in is seconds. Need functions that can convert seconds into
    The largest javascript number can support this.
    Timer will be triggered by a setTimeout that triggers another setTimeout ever 1 second - so using JS's settimeout as the incrementing mechanism which is not precisely 1second per increment.
    We won't persist the time.

    onReset:
        - setTime(0)
        - toggleStopwatch(false)
        - clear the increment mechanism
     */

    /*
    time is in 10s of ms = 100 increments = 1 second

     */
    const [ time, setTime ] = React.useState(0);
    const [ startStopwatch, toggleStopwatch ] = React.useState(false);

    React.useEffect(() => {
        // while stopwatch is on run, keep on incrementing
        if (startStopwatch) {
            setTimeout(() => {
                setTime(prevState => prevState + 1);
            }, 1000);
        }
    }, [startStopwatch, time]);

    const addPadding = (num, desiredLength) => {
        const delta = desiredLength - num.toString().length;
        if (delta > 0) {
            return [...Array(delta).fill(0), num].join('');
        }
        return num.toString();
    }

    const convertTimeToDisplayString = (timeInMs) => {
        // how many hours is that
        // how many minutes is that
        // how many seconds is that
        // how many milliseconds is that

        const hours = Math.trunc(timeInMs/1/60/60);
        let remainder = timeInMs - hours*1*60*60;
        const mins = Math.trunc(remainder/1/60);
        remainder = remainder - mins*1*60;
        const secs = Math.trunc(remainder/1);
        remainder = remainder - secs*1;

        const display = `${addPadding(hours, 2)} H : ${addPadding(mins, 2)} M : ${addPadding(secs, 2)} S : ${remainder} MS`;
        return display;
    };

    const toggleWatch = (event) => {
        const { name } = event.target;
        // start the watch
        if (name === 'startButton' && !startStopwatch) {
            toggleStopwatch(prevState => !prevState)
        }
        // stop the watch
        if (name === 'stopButton' && startStopwatch) {
            toggleStopwatch(prevState => !prevState)
        }
    };

    const resetWatch = () => {
        toggleStopwatch(false);
        setTime(0);
    };

    return (
        <div>
            <div>
                <h1 style={{textAlign: 'center' }}>Time</h1>
                <h1 style={{textAlign: 'center' }}>{convertTimeToDisplayString(time)}</h1>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around'}} >
                <button name='startButton' onClick={toggleWatch}>Start</button>
                <button name='stopButton' onClick={toggleWatch}>Stop</button>
                <button name='resetButton' onClick={resetWatch}>Reset</button>
            </div>
        </div>
    )
}

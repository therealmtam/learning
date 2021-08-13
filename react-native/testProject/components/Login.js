import React, { useState } from 'react';

const loginAPI = async (payload) => {
    console.log('\n');
    console.log('login call start => ', payload);

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },

        // send the login info to the server
        body: JSON.stringify(payload)
    };

    console.log('\n');
    console.log(`login call => POST http://localhost:3000/login`);
    console.log(requestOptions);

    let response = {};
    try {
        response = await fetch(`http://localhost:3000/login`, requestOptions);
        response = await response.json();

        console.log('\n');
        console.log('login call response => ', response);
    } catch (error) {
        console.log('\n');
        console.log('login response error => ', error.message)
    }

    // if there is no user (identified by _id property)
    if (!response.data || !response.data._id) {
        return null;
    }

    return response.data;
    return {
        _id: '123123',
        verified: true
    };
};

const Login = (props) => {
    // extract props to use
    const { setGlobalState, globalState } = props.globalStateHandler;

    const [ rememberMeTrue, setRememberMe ] = useState(false);

    return (
        <div>
            <h2>Account</h2>

            <form onSubmit={async (event) => {
                console.log('\n');
                console.log('form onSubmit => logging in');

                // prevent the form from refreshing the page
                event.preventDefault();

                // extract the username and password
                const data = new FormData(event.target);
                const username = data.get('username');
                const password = data.get('password');
                const rememberMe = data.get('rememberMe') === 'on' ? true : false; // ='on' or null

                const user = await loginAPI({ username, password, rememberMe });

                if (user) {
                    // set isAuthenticated=true user= the user object
                    setGlobalState({ ...globalState, isAuthenticated: true, user });
                }
            }} >
                <label>
                    Email:
                    <input type="text" name="username" placeholder="email" />
                </label>
                <br/>
                <br/>
                <label>
                    Password:
                    <input type="text" name="password" placeholder="password" />
                </label>
                <br/>
                <br/>
                <label>
                    RememberMe:
                    <input
                        name="rememberMe"
                        type="checkbox"
                        checked={rememberMeTrue}
                        onChange={() => setRememberMe(!rememberMeTrue)}
                     />
                </label>
                <br/>
                <br/>
                <input type="submit" value="Submit" />
            </form>

        </div>
    );
};

export default Login;
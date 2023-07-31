import React from 'react';
import AuthContext from './AuthContext';

const AuthState = (props) => {

    const port = 'http://localhost:5000';

    const loginUser = async(name, password) =>{
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "name": name, "password": password })
        }
        try{
            const response = await fetch(`${port}/auth/login`, requestOptions);
            const data = await response.json();
            return data;
        }catch(err){
            console.log(`Error logging in user: ${err}`);
        }
    }

    const signupUser = async() =>{
        console.log('si')
    }

  return (
    <AuthContext.Provider value={{ loginUser, signupUser }}>
        {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState;

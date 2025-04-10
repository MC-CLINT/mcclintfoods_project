import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const navigate = useNavigate();

    const { session, signInWithGoogle } = useAuth();
        console.log(session);

    const handleGoogleSignIn = () => {
        signInWithGoogle()
           
       
        // Add your Google sign-in logic here
        console.log('Sign in with Google');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;


        navigate('/home'); 
    
        console.log('Username:', username, 'Password:', password);
        // Add your login logic here
    };

    return (
        <div className='login-div'>
            <p className='Welcome'>Welcome back!  <br /> Please login to your account.</p>
            <form onSubmit={handleSubmit}>
                <div className='username-div'>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        required
                    />
                </div>
                <div className='password-div'>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                    />
                </div>
                <button type="submit" className='login-button'>
                    Login
                </button>
                <button className='google-button' type="button"
                onClick={handleGoogleSignIn}
            >
                Sign in using Google
            </button>
            </form>
            
        </div>
    );
};

export default Login;
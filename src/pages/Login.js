import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [error, setError] = useState(null);
        const [loading, setLoading] = useState('');
    const navigate = useNavigate();

    const { session, signInWithGoogle, signInUser } = useAuth();
        console.log(session);

    const handleGoogleSignIn = () => {
        signInWithGoogle()
           
       
        // Add your Google sign-in logic here
        console.log('Sign in with Google');
    };

    const handleSignInSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    try {
        const result = await signInUser({ email, password });

        if (result.success){
            console.log(result);
            setLoading(false);
            navigate('/home'); 
        }
    }
    catch (error) {
        setLoading(false);
        window.alert('Error signing in, please try again');
    }
    }

    return (
        <div className='login-div'>
            <p className='Welcome'>Welcome back!  <br /> Please login to your account.</p>
            <form onSubmit={handleSignInSubmit }>
                <div className='username-div'>
                    <label htmlFor="email">Email:</label>
                    <input
                    onChange={(e) => setEmail(e.target.value)}
                        type="text"
                        id="email"
                        name="email"
                        required
                    />
                </div>
                <div className='password-div'>
                    <label htmlFor="password">Password:</label>
                    <input
                    onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        id="password"
                        name="password"
                        required
                    />
                </div>
                <button type="submit" className='login-button'>
                    Login
                </button>
            <button className='google-button' type="button" onClick={handleGoogleSignIn}>
                Sign in using Google
            </button>
            </form>
            
        </div>
    );
};

export default Login;
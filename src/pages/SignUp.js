import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../config/supabaseClients';
import { useAuth } from '../context/AuthContext';


const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState('');

    const { session, signUpNewUser} = useAuth();
    console.log(session);


    const navigate = useNavigate();

    const handleSignInClick = () => {
        navigate('/login'); // Redirect to login page
    };

    const handleSignUpSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    try {
        const result = await signUpNewUser({ email, password });

        if (result.success){
            setLoading(false);
            navigate('/home'); 
        }
    }
    catch (error) {
        setLoading(false);
        console.error("Error signing up:", error);
        setError(error.message);
    }
    }

    return (
        <div className='signup-div'>
            <p className='Welcome1'>Welcome!  <br /> Please create an account.</p>
            <form style={{background:'var(--primary)'}} onSubmit={handleSignUpSubmit}>
            
                <div className='email-div'> 
                    <label htmlFor="email">Email:</label>
                    <input 
                     onChange={(e) => setEmail(e.target.value) }
                    type="email" id="email" name="email" required />
                </div>
                <div className='Password-div'>
                    <label htmlFor="password">Password:</label>
                    <input 
                    onChange={(e) => setPassword(e.target.value) }
                     type="password" id="password" 
                     name="password" 
                     required  />
                </div>
                <button type="submit" className='signup-button'> Sign Up</button>
            </form>
            <p style={{ marginTop: '10px', textAlign: 'center' }}>
                Already have an account?{' '}
                <span
                    onClick={handleSignInClick}
                    style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}
                >
                    Sign In
                </span>
            </p>
        </div>
    );
};

export default SignUp;
import { createContext, useEffect, useState, useContext } from "react";
import supabase from "../config/supabaseClients";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [session, setSession] = useState(undefined);

// Signing Up a new user
    const signUpNewUser = async ({ email, password }) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        
        if (error) {
            console.error("Error signing up:", error);
            return {sucess: false, error};
        }
        return {success: true, data};
    };


    // Signing in a user
   const signInUser = async ({ email, password }) => {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) {
            window.alert('Error signing in, please try again'); 
            console.error("Error signing in:", error);
            return {success: false, error};
        }
        return {success: true, data};
    } catch (error) {
        window.alert('Error signing in, please try again');
        console.error("Error signing in:", error);
        return {success: false, error};
    }
};

// Signing In with Google
const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: 'http://localhost:3000/home',
        },
    });
    if (error) {
        console.error("Error signing in with Google:", error);
        return {success: false, error};
    }
    return {success: true, data};
}

        


    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

     } , []);

    return (
        <AuthContext.Provider value={{ session, signUpNewUser, signInUser, signInWithGoogle }}> 
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
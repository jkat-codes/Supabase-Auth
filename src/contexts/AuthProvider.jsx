import {useState, useEffect} from 'react'; 
import { supabase } from '../lib/supabase'; 
import { AuthContext } from './AuthContext';

export function AuthProvider({ children }) {
    // Create global states
    const [user, setUser] = useState(null); 
    const [profile, setProfile] = useState(null); 
    const [loading, setLoading] = useState(true); 

    // Function to fetch user profile
    async function fetchProfile(userId) {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single()

        if (error) {
            console.error("Error fetching profile: ", error); 
            return null; 
        }

        return data; 
    }      

    // Check if the user is already logged in
    useEffect(() => {
        async function initialize() {
            const {data : { session }} = await supabase.auth.getSession(); 

            if (session?.user) {
                setUser(session.user); 
                const profile = await fetchProfile(session.user.id); 
                setProfile(profile); 
            }

            setLoading(false); 
        }

        initialize(); 

        // Listen for auth changes (sign in, sign out, token refresh)
        const {data : {subscription}} = supabase.auth.onAuthStateChange(
            async (event, session) => {
                if (session?.user) {
                    setUser(session.user); 
                    const profile = await fetchProfile(session.user.id); 
                    setProfile(profile); 
                } else {
                    setUser(null); 
                    setProfile(null); 
                }
            }
        )

        // Clean subscription on unmount
        return () => {
            subscription.unsubscribe(); 
        }
    }, [])

    // Function to sign up with email and password
    async function signUp(email, password, displayName = null) {
        const {data, error} = await supabase.auth.signUp({
            email, 
            password, 
            options: {
                data: {
                    display_name: displayName
                }
            }
        })

        if (error) {
            return { error }; 
        }

        return { data }; 
    }

    // Function to sign in with email and password
    async function signIn(email, password) {
        const {data, error} = await supabase.auth.signInWithPassword({
            email, 
            password
        })

        if (error) {
            return { error }; 
        }

        return { data }; 
    }

    // Function to send OTP code to email 
    async function sendOtp(email) {
        const {data, error} = await supabase.auth.signInWithOtp({
            email, 
            options: {
                // Do not create a new user if the email does not exist in the database
                shouldCreateUser: false
            }
        })

        if (error) {
            return { error }; 
        }

        return { data }; 
    }

    // Function to verify OTP
    async function verifyOtp(email, token) {
        const {data, error} = await supabase.auth.verifyOtp({
            email, 
            token, 
            type: 'email'
        })

        if (error) {
            return { error }; 
        }

        return { data }; 
    }

    // Function to sign out
    async function signOut() {
        const { error } = await supabase.auth.signOut(); 
        
        if (error) {
            return { error }; 
        }

        // Reset user and profile
        setUser(null); 
        setProfile(null); 
    }

    // Functions/variables we want to expose
    const value = {
        user, 
        profile, 
        loading, 
        isAdmin: profile?.role === 'admin', 
        signUp, 
        signIn, 
        sendOtp, 
        verifyOtp, 
        signOut
    }; 

    // Return the context
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
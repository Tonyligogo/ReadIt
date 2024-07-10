import { getCurrentUser } from "@/appwrite/api"
import { createContext, useContext, useEffect, useState } from "react"

const INITIAL_USER ={
    id:'',
    username:'',
    email:'',
    imageUrl:'',
    bio:'',
}
const INITIAL_STATE={
    user:INITIAL_USER,
    isAuthenticated:false,
    isLoading:false,
    setUser:()=>{},
    setIsAuthenticated:()=>{},
    checkAuthUser:async()=>false,
}
const AuthContext = createContext(INITIAL_STATE)
// eslint-disable-next-line react/prop-types
export default function AuthProvider({children}) {

    const[user, setUser]=useState(INITIAL_USER);
    const[isLoading, setIsLoading]=useState(false);
    const[isAuthenticated, setIsAuthenticated]=useState(false);

    const checkAuthUser = async ()=>{
        setIsLoading(true);
        try {
            const currentUser = await getCurrentUser();
            if(currentUser){
                setUser({
                    id: currentUser.$id,
                    username: currentUser.username,
                    email: currentUser.email,
                    imageUrl: currentUser.imageUrl,
                    bio: currentUser.bio,
                });
                setIsAuthenticated(true);
                return true;
            }
        } catch (error) {
            console.error(error);
            return false;
        }finally{
            setIsLoading(false);
        }
    }

    useEffect(()=>{
        
        if( localStorage.getItem('cookieFallback') === null || localStorage.getItem('cookieFallback') === '[]' ){
            console.log('not logged in');
        }
            checkAuthUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


  return (
    <AuthContext.Provider value={{user, setUser, isLoading, setIsLoading, isAuthenticated, setIsAuthenticated, checkAuthUser }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useUserContext = ()=>useContext(AuthContext)
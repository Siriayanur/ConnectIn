import { createContext, useReducer } from 'react';
import AuthReducer from './AuthReducer';

const INIT_STATE = {
    user: {
        _id:'60b1df6e558a0d5366f03fd0',
        profilePicture:"",
        coverPicture:'',
        followers:[],
        following:[],
        isAdmin:false,
        username:"sahayak",
        email:"sahayak@gmail.com",
        password:"$2b$10$ufxG9iq7auuqQuD6J9Fd2.totPg/.VM6fEkAIanYOJ2a6J/hVYfIy",

    },
    isFetching: false,
    error : false
}

export const AuthContext = createContext(INIT_STATE);

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INIT_STATE);
    return (
        <AuthContext.Provider value={{user : state.user, isFetching:state.isFetching,error:state.error,dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}
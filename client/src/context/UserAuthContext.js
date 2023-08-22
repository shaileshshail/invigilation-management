import { createContext, useContext, useEffect,useState } from "react";

import axios from '../api/axiosAPI';

const userAuthContext = createContext();

export const UserAuthContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const logIn = async (email, password) => {
        const LOGIN_URL = 'auth/login';

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ email, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );
            //console.log("response data", response.data);
            //console.log("accesstoken", response.data.accessToken);

            //helper function
            getCurrentUser(response?.data.accessToken);

            return JSON.stringify(response?.data);
        } catch (err) {
            if (!err?.response)
                return "No server response";
            else if (err.response?.status === 400)
                return "Invalid Credentials"
        }
    }


    const logOut = async () => {
        const LOGOUT_URL = 'auth/logout';
        try {
            const response = await axios.get(LOGOUT_URL,

                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                }
            );
            setUser(null);
        } catch (err) {
            if (!err?.response)
                return "No server response";
            else if (err.response?.status === 400)
                return "Invalid Credentials"
        }
    }



    const getCurrentUser = async (accessToken) => {
        const CURRENTUSER_URL = 'auth/currentuser';
        try {
            const currentUser = await axios.get(CURRENTUSER_URL,

                {
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${accessToken}`
                    },
                    withCredentials: true,
                });
            //console.log("currentuser", currentUser);
            setUser({ "user": { "email": currentUser?.data.email, "firstname": currentUser?.data.firstname, "role": currentUser?.data.role }, "accessToken": accessToken });
            //console.log("sadsa")
        } catch (err) {
            //console.log(err)
            if (!err?.response)
                return "No server response";
            else if (err.response?.status === 400)
                return "Invalid Credentials"
        }
    }

    const check = async () => {
        const REFRESH_URL = 'auth/refresh';
        //console.log("check")
        try {
            const response = await axios.get(REFRESH_URL,
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true,
                });
            //console.log("response", response.data)

            //helper function
            getCurrentUser(response?.data.accessToken);

        } catch (err) {
            //console.log(err)
            if (!err?.response)
                return "No server response";
            else if (err.response?.status === 400)
                return "Invalid Credentials"
        }
    }
    useEffect(() => {
        setUser(null);
        check();
    }, []);

    return (
        <userAuthContext.Provider value={{
            user,logIn, logOut,
        }}>
            {children}
        </userAuthContext.Provider>
    );
};



//instead of creating useContext in every component , we import it from this UserAuthContext
export const useUserAuth = () => {
    return useContext(userAuthContext);
}
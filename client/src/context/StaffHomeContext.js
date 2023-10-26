import { createContext, useContext, useEffect,useState } from "react";

import axios from '../api/axiosAPI';
import { useUserAuth } from "./UserAuthContext";

const staffHomeContext = createContext();

export const StaffHomeContextProvider = ({ children }) => {
    const {user} = useUserAuth();

    const getAllCompEventById =async(staff_id)=>{
        const GETSTAFF_URL = '/staffhome/';
        try {
            const response = await axios.get(GETSTAFF_URL+staff_id,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${user?.accessToken}`
                    },
                    withCredentials: true,
                });

            console.log("staff response",response)
            return response
        } catch (err) {
            console.log(err)
        }
    }
    

    return (
        <staffHomeContext.Provider value={{
            getAllCompEventById,
        }}>
            {children}
        </staffHomeContext.Provider>
    );
};



//instead of creating useContext in every component , we import it from this UserAuthContext
export const useStaffHome = () => {
    return useContext(staffHomeContext);
}
import { createContext, useContext, useEffect,useState } from "react";

import axios from '../api/axiosAPI';
import { useUserAuth } from "./UserAuthContext";

const staffContext = createContext();

export const StaffContextProvider = ({ children }) => {
    const {user} = useUserAuth();

    const getAllStaff =async()=>{
        const GETSTAFF_URL = '/staffs';
        try {
            const response = await axios.get(GETSTAFF_URL,
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
    const addStaff = async(formdata)=>{
        const ADDSTAFF_URL = '/staffs';
        try {
            const response = await axios.post(ADDSTAFF_URL,formdata,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${user?.accessToken}`
                    },
                    withCredentials: true,
                });

            console.log("staff response",response)
        } catch (err) {
            console.log(err)
        }
    }
    const deleteStaff = async(staffId)=>{
        const DELETEROOM_URL = '/staffs/'+staffId;

        try {
            const response = await axios.delete(DELETEROOM_URL,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${user?.accessToken}`
                    },
                    withCredentials: true,
                });

            console.log("staff response",response)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <staffContext.Provider value={{
            addStaff,deleteStaff,getAllStaff
        }}>
            {children}
        </staffContext.Provider>
    );
};



//instead of creating useContext in every component , we import it from this UserAuthContext
export const useStaff = () => {
    return useContext(staffContext);
}
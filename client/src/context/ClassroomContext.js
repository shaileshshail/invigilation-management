import { createContext, useContext } from "react";

import axios from '../api/axiosAPI';
import { useUserAuth } from "./UserAuthContext";

const classroomContext = createContext();

export const ClassroomContextProvider = ({ children }) => {
    const {user} = useUserAuth();

    const getAll =async()=>{
        const GETROOM_URL = '/classrooms';
        try {
            const response = await axios.get(GETROOM_URL,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${user?.accessToken}`
                    },
                    withCredentials: true,
                });

            console.log("classroom response",response)
            return response
        } catch (err) {
            console.log(err)
        }
    }
    const addRoom = async(formdata)=>{
        const ADDROOM_URL = '/classrooms';
        try {
            const response = await axios.post(ADDROOM_URL,formdata,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${user?.accessToken}`
                    },
                    withCredentials: true,
                });

            console.log("classroom response",response)
        } catch (err) {
            console.log(err)
        }
    }
    const deleteRoom = async(roomId)=>{
        const DELETEROOM_URL = '/classrooms/'+roomId;

        try {
            const response = await axios.delete(DELETEROOM_URL,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${user?.accessToken}`
                    },
                    withCredentials: true,
                });

            console.log("classroom response",response)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <classroomContext.Provider value={{
            addRoom,deleteRoom,getAll
        }}>
            {children}
        </classroomContext.Provider>
    );
};



//instead of creating useContext in every component , we import it from this UserAuthContext
export const useClassroom = () => {
    return useContext(classroomContext);
}
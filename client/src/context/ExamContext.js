import { createContext, useContext } from "react";

import axios from '../api/axiosAPI';
import { useUserAuth } from "./UserAuthContext";

const examcontext = createContext();

export const ExamContextProvider = ({ children }) => {
    const {user} = useUserAuth();

    const getAll =async()=>{
        const GETEXAM_URL = '/events';
        try {
            const response = await axios.get(GETEXAM_URL,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${user?.accessToken}`
                    },
                    withCredentials: true,
                });

            console.log("Exam response",response)
            return response
        } catch (err) {
            console.log(err)
        }
    }
    const getById =async(eventId)=>{
        const GETEXAMBYID_URL = '/events/'+eventId;
        try {
            const response = await axios.get(GETEXAMBYID_URL,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${user?.accessToken}`
                    },
                    withCredentials: true,
                });

            console.log("Exam by id response",response)
            return response
        } catch (err) {
            console.log(err)
        }
    }
    const addExam= async(formdata)=>{
        const ADDEXAM_URL = '/events';
        try {
            const response = await axios.post(ADDEXAM_URL,formdata,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${user?.accessToken}`
                    },
                    withCredentials: true,
                });

            console.log("Exam response",response)
        } catch (err) {
            console.log(err)
        }
    }
    const updateExam = async(formdata,eventId)=>{
        const UPDATEEXAM_URL = '/events/'+eventId;
        try {
            const response = await axios.put(UPDATEEXAM_URL,formdata,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${user?.accessToken}`
                    },
                    withCredentials: true,
                });

            console.log("Exam update response",response)
        } catch (err) {
            console.log(err)
        }
    }
    const deleteExam = async(eventId)=>{
        const DELETEEXAM_URL = '/events/'+eventId;

        try {
            const response = await axios.delete(DELETEEXAM_URL,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${user?.accessToken}`
                    },
                    withCredentials: true,
                });

            console.log("Exam response",response)
        } catch (err) {
            console.log(err)
        }
    }

    //event details -- staff attendence

    const registerAttendence = async(eventId,staffId)=>{
        const ATTENDENCE_URL = `/eventdetails/${eventId}/${staffId}`;
        try {
            const response = await axios.put(ATTENDENCE_URL,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${user?.accessToken}`
                    },
                    withCredentials: true,
                });
            console.log("Exam update response",response.data)
            return response.data;
        } catch (err) {
            console.log(err)
        }
    }
    const getByDate =async()=>{
        const GETBYDATE_URl = `/events/registry/bydate`;
        try {
            const response = await axios.get(GETBYDATE_URl,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${user?.accessToken}`
                    },
                    withCredentials: true,
                });

            console.log("Exam by date response-for registry",response)
            return response
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <examcontext.Provider value={{
            addExam,deleteExam,getAll,updateExam,getByDate,getById,registerAttendence
        }}>
            {children}
        </examcontext.Provider>
    );
};




//instead of creating useContext in every component , we import it from this UserAuthContext
export const useExam = () => {
    return useContext(examcontext);
}
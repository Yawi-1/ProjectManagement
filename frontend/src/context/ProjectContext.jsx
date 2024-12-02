import { createContext, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import {toast} from 'react-toastify'

const ProjectContext = createContext();

// Creata a function to use this Context  in each componet.....
export const useProject = () => {
    return useContext(ProjectContext);
}

export const ProjectContextProvider = ({ children }) => {
    // A base url of server........
    const url = "http://localhost:3000";

    // Get All teachers..........
    const [teachers, setTeachers] = useState([]);
    const fetchTeachers = async () => {
        try {
            const { data } = await axios.get(`${url}/teachers`);
            setTeachers(data);
        } catch (error) {
            if (error.response || error.response.data) {
                toast(error.response.data.message || 'Error fetching teachers..');
            }
            else{
                toast('Something went wrong...');
            }
        }
    };
    useEffect(() => {
        fetchTeachers();
    }, [url]);

    // code to fetch All students......
    const [students, setStudents] = useState([]);
    const fetchStudents = async () => {
        try {
            const { data } = await axios.get(`${url}/students`);
            setStudents(data);
        } catch (error) {
            if (error.response || error.response.data) {
                toast(error.response.data.message || 'Error fetching students');
            }
            else{
                toast('Something went wrong...');
            }
        }
    }
    useEffect(() => {
        fetchStudents();
    }, [url]);

    // code to fetch  all admins.......
    const [admins, setAdmins] = useState([]);
    const fetchAdmins = async () => {
        try {
            const { data } = await axios.get(`${url}/admins`);
            setAdmins(data);
        }
        catch (error) {
            if (error.response || error.response.data) {
                toast(error.response.data.message || 'Error fetching admins...');
            }
            else {
                toast("Something went wrong.");
            }
        }
    }

    useEffect(() => {
        fetchAdmins();
    }, [url])


    // Code to manage loading state for loader.......
    const [isLoading,setIsLoading] = useState();



    return (
        <ProjectContext.Provider value={{
            url, fetchAdmins,
            teachers, setTeachers,
            students, setStudents, admins,
            setAdmins, fetchStudents, fetchTeachers,
            isLoading,setIsLoading
        }}>
            {children}
        </ProjectContext.Provider>
    )
}
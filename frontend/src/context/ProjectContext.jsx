import { createContext, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ProjectContext = createContext();

// Create a function to use this Context in each component
export const useProject = () => {
    return useContext(ProjectContext);
}

export const ProjectContextProvider = ({ children }) => {
    // A base URL of the server
    const url = "https://projectmanagementbackend1.onrender.com";

    // Get All teachers
    const [teachers, setTeachers] = useState([]);
    const fetchTeachers = async () => {
        try {
            const { data } = await axios.get(`${url}/teachers`);
            setTeachers(data);
        } catch (error) {
            toast("Failed to fetch teachers.");
        }
    };
    useEffect(() => {
        fetchTeachers();
    }, [url]);

    // Code to fetch all students
    const [students, setStudents] = useState([]);
    const fetchStudents = async () => {
        try {
            const { data } = await axios.get(`${url}/students`);
            setStudents(data);
        } catch (error) {
            toast("Something went wrong.");
        }
    };
    useEffect(() => {
        fetchStudents();
    }, [url]);

    // Code to fetch all admins
    const [admins, setAdmins] = useState([]);
    const fetchAdmins = async () => {
        try {
            const { data } = await axios.get(`${url}/admins`);
            setAdmins(data);
        } catch (error) {
            toast("Something went wrong.");
        }
    };
    useEffect(() => {
        fetchAdmins();
    }, [url]);

    // Code to manage loading state for loader
    const [isLoading, setIsLoading] = useState(false);

    return (
        <ProjectContext.Provider
            value={{
                url,
                fetchAdmins,
                teachers,
                setTeachers,
                students,
                setStudents,
                admins,
                setAdmins,
                fetchStudents,
                fetchTeachers,
                isLoading,
                setIsLoading
            }}
        >
            {children}
        </ProjectContext.Provider>
    );
};

import { createContext, useEffect, useState, useContext } from 'react';
import axios from 'axios';

const ProjectContext = createContext();

export const useProject = () => {
    return useContext(ProjectContext);
}

export const ProjectContextProvider = ({ children }) => {
    const url = "http://localhost:3000";

    // Get All teachers..........
    const [teachers, setTeachers] = useState([]);
    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const { data } = await axios.get(`${url}/teachers`);
                setTeachers(data);
            } catch (error) {
                console.log('Error fetching teachers:', error);
            }
        };
        fetchTeachers();
    }, [url]);

    // Get All students......
    const [students, setStudents] = useState([]);
    const fetchStudents = async () => {
        try {
            const { data } = await axios.get(`${url}/students`);
            setStudents(data);
        } catch (error) {
            console.log('Error fetching students:', error);
        }
    }
    useEffect(() => {
        fetchStudents();
    }, [url]);



    return (
        <ProjectContext.Provider value={{url, teachers, setTeachers,students, setStudents,fetchStudents }}>
            {children}
        </ProjectContext.Provider>
    )
}
'use client'
import { getAuth } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { Job } from "../../../models/Job";
import Search from "../../components/search";
import { AuthContext } from "../../context/authContext";
import { GetUser } from "../../firebase/clientApp";
import { GetAllJob, UpdateJob } from "../../firebase/jobFirestore";
import JobCard from "./jobCard";

export default function Job() {

    const [jobs, setJobs] = useState<Job[]>([])
    const [filteredJobs, setFilteredJobs] = useState<Job[]>([])
    const { authState, setAuthState } = useContext(AuthContext);
    
    const fetch = async () => {

        const auth = getAuth()
        const user = auth.currentUser
        if(user){
            let data = await GetAllJob(user.uid)
            if(data){
                data = data.map((e, i)=>{
                    if(e.dueDate.toDate() < new Date() && e.status === "Unfinished"){
                        e.status = 'Late'
                    }
                    return e
                })
                
                Promise.all(data.map((job) => UpdateJob({job})))
                .catch((error) => {
                });
                setJobs(data)
                setFilteredJobs(data)
            }
        }
    }

    const refetch = () => {
        fetch()
    }

    useEffect(() => {
        fetch()
    },[])

    const handleSearch = (searchTerm: string) => {
        const filtered = jobs.filter((u) =>
            u.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredJobs(filtered)
    };

    return (
        <>
            <div className="bg-white">
                <div className="relative border-b-2 border-black">
                    <div className="px-10 flex justify-end items-center gap-4 h-24 w-full text-2xl">
                        <Search onSearch={handleSearch} />
                    </div>
                </div>
                <div className="relative min-w-screen h-full flex justify-center items-center">
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2 m-10">
                        <div className="w-full px-4 flex justify-between items-center">
                            <div className=" w-full flex justify-start">
                                <div className="w-60 flex flex-col justify-center bg-red-200">
                                    <div className="font-semibold text-xl">
                                        Name
                                    </div>
                                </div>
                                <div className="w-36  px-2 flex justify-center items-center bg-green-200">
                                    <div className="text-black font-semibold">
                                        Category
                                    </div>
                                </div>
                                <div className="w-36  px-2 flex justify-center items-center bg-blue-200">
                                    <div className="text-black font-semibold">
                                        Patient
                                    </div>
                                </div>
                                <div className="w-36 px-2 flex justify-center items-center bg-red-200">
                                    <div className="text-black font-semibold">
                                        Assigned Date
                                    </div>
                                </div>
                                <div className="w-36 px-2 flex justify-center items-center bg-green-200">
                                    <div className="text-black font-semibold">
                                        Due Date
                                    </div>
                                </div>
                                <div className="w-36 px-2 flex justify-center items-center bg-blue-200">
                                    <div className="text-black font-semibold">
                                        Room
                                    </div>
                                </div>
                            </div>
                            <div className="w-24 flex justify-center">
                                <div className="flex justify-start text-black font-semibold">
                                    Edit
                                </div>
                            </div>
                        </div>
                        {filteredJobs.map((u, index) => (
                            <JobCard key={u.id} job={u} refetch={refetch} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
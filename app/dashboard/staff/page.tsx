/* eslint-disable react/jsx-key */
'use client'
import { useEffect, useState } from "react";
import { User } from "../../../models/User";
import Search from "../../components/search";
import { GetAllStaff } from "../../firebase/clientApp";
import { GetData } from "../../firebase/firestore";
import StaffCard from "./staffCard";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function StaffList() {

    const [user, setUser] = useState<User[]>([])
    const [filteredUser, setFilteredUser] = useState<User[]>([])
    const fetchStaff = async () => {
        const data = await GetAllStaff();
        if (data) {
            const staffData = data.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            })) as User[]
            setUser(staffData)
            setFilteredUser(staffData)
        }
    }

    const refetch = () => {
        fetchStaff()
    }

    useEffect(() => {
        fetchStaff()
    }, [])

    const handleSearch = (searchTerm: string) => {
        const filtered = user.filter((u) =>
            u.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUser(filtered)
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
                        <div className="w-full flex justify-between items-center">
                            <div className=" w-full flex justify-start">
                                <div className="p-2 w-48 flex flex-col justify-center">
                                    <div className="font-semibold text-xl">
                                        Name
                                    </div>
                                </div>
                                <div className="w-36 flex justify-center">
                                    <div className="rounded-md text-black font-semibold my-5 px-3">Role</div>
                                </div>
                                <div className="w-36 px-2 flex justify-center items-center">
                                    <div className="text-black font-semibold">
                                        Shift
                                    </div>
                                </div>
                            </div>
                            <div className="w-24 flex justify-start">
                                <div className="p-2 flex justify-center text-black font-semibold">
                                    Edit
                                </div>
                            </div>
                            <div className="w-24 flex justify-start">
                                <div className="p-2 flex justify-center text-black font-semibold">
                                    Delete
                                </div>
                            </div>
                        </div>
                        {filteredUser.map((u, index) => (
                            <StaffCard key={u.id} user={u} refetch={refetch} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
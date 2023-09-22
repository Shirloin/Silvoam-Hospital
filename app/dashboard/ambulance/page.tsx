'use client'
import { useEffect, useState } from "react";
import { Ambulance } from "../../../models/Ambulance";
import { GetData } from "../../firebase/firestore";
import AddAmbulance from "./addAmbulance";
import AmbulanceCard from "./ambulanceCard";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AmbulanceList(){

    const [ambulance, setAmbulance] = useState<Ambulance[]>([])

    const fetchAmbulance = async()=>{
        const data = await GetData("ambulances");
        if (data) {
            const ambulanceData = data.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            })) as Ambulance[]
            setAmbulance(ambulanceData)
        }
    }

    const refetch = ()=>{
        fetchAmbulance()
    }

    useEffect(()=>{
        fetchAmbulance()
    }, [])

    return (
        <>
            <div className="bg-white">
                <div className="relative border-b-2 border-black">
                    <div className="px-10 flex justify-between items-center gap-4 h-24 w-full text-2xl">
                        <AddAmbulance refetch={refetch}/>
                    </div>
                </div>
                <div className="relative min-w-screen h-full flex justify-center items-center">
                    <div className="min-w-screen sm:min-w-screen h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-10 mx-10 my-10">
                        {
                            ambulance.map((a, index)=>(
                                <AmbulanceCard key={index} ambulance={a} refetch={refetch}/>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    );
}
'use client'
import { useEffect, useState } from "react";
import { Bill } from "../../../models/Bill";
import { GetData } from "../../firebase/firestore";
import BillCard from "./billCard";

export default function BillList() {

    const [bill, setBill] = useState<Bill[]>([])

    const fetchBill = async () => {
        const data = await GetData("bills");
        if (data) {
            const d = data.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            })) as Bill[]
            setBill(d)
        }
    }


    const refetch = () => {
        fetchBill()
    }

    useEffect(() => {
        fetchBill()
    }, [])

    return (
        <>
            <div className="bg-white">
                <div className="relative border-b-2 border-black">
                    <div className="px-10 flex justify-between items-center gap-4 h-24 w-full text-2xl">
                        {/* <AddAppointment onAddClick={onAddClick} /> */}
                    </div>
                </div>
                <div className="relative min-w-screen h-full flex justify-center items-center">
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2  m-10">
                        {
                            bill.map((a, index) => (
                                <BillCard key={a.id} bill={a} refetch={refetch} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    );
}
'use client'
import { useEffect, useState } from "react";
import { Medicine } from "../../../models/Medicine";
import Search from "../../components/search";
import { GetData } from "../../firebase/firestore";
import AddMedicine from "./addMedicine";
import MedicineCard from "./medicineCard";

export default function MedicineList() {

    const [medicines, setMedicines] = useState<Medicine[]>([]);
    const [filteredMedicines, setFilteredMedicines] = useState<Medicine[]>([]);

    const fetchMedicine = async () => {
        const data = await GetData('medicines');
        if (data) {
            const medicineData = data.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            })) as Medicine[]
            setMedicines(medicineData);
            setFilteredMedicines(medicineData)
        }
        else{
            setMedicines({} as Medicine[])
            setFilteredMedicines({} as Medicine[])
        }
    };
    const handlePatient = () => {
        fetchMedicine();
    }
    useEffect(() => {

        fetchMedicine();
    }, []);

    const handleSearch = (searchTerm: string) => {
        const filtered = medicines.filter((m) =>
            m.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredMedicines(filtered);
    };

    const refetch = ()=>{
        fetchMedicine()
    }


    return (
        <>
            <div className="bg-white">
                <div className="relative border-b-2 border-black">
                    <div className="px-10 flex justify-between items-center gap-4 h-24 w-full text-2xl">
                        <AddMedicine refetch={refetch}/>
                        <Search onSearch={handleSearch} />
                    </div>
                </div>
                <div className="relative min-w-screen h-full flex justify-center items-center">
                    <div className="min-w-screen h-full grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mx-10 my-10">
                        {filteredMedicines.length>0 ?(
                            filteredMedicines.map((m, index) => (
                                <MedicineCard key={m.id} medicine={m} refetch={refetch}/>
                            ))
                        ): (
                            <h1>There is no Medicine</h1>
                        )
                            
                    }
                    </div>
                </div>
            </div>
        </>
    );
}
import { useState } from "react";
import { AmbulanceProps } from "../../../models/Ambulance";
import { UpdateAmbulance } from "../../firebase/firestore";
import { handleFormClick } from "../../utilities/GlobalFunction";

export default function BanAmbulance({ ambulance, refetch }: AmbulanceProps & { refetch: () => void }) {

    const [modal, setModal] = useState(false);
    const [desc, setDesc] = useState("")

    const handleClick = () => {
        setModal(!modal)
    }

    const handleOnChange = (e:any)=>{
        setDesc(e.target.value)
    }

    const handleBanAmbulance = async () => {
        ambulance.status = "Unusable"
        ambulance.description = desc
        await UpdateAmbulance({ ambulance })
        refetch()
    }
    return (
        <>
            <button onClick={handleClick} className="bg-red-500 rounded-md px-3 py-1 text-white">Ban</button>
            {modal === true ? (
                <div className='fixed inset-0 z-20 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center' onClick={handleClick}>
                    <div className='w-[500px] flex flex-col'>
                        <div className='bg-white rounded-xl flex flex-col'>
                        <div className="p-7 gap-6 flex flex-col" onClick={handleFormClick}>
                            <textarea onChange={handleOnChange} value={desc} className="w-full h-40 p-2 border-2 border-gray-300 rounded-md resize-none" placeholder="Enter your reason"></textarea>
                            <button onClick={handleBanAmbulance} className="w-full bg-red-500 rounded-md px-4 py-2 font-bold text-white">Ban</button>
                        </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
}
import { AmbulanceProps } from "../../../models/Ambulance";
import { UpdateAmbulance } from "../../firebase/firestore";
import BanAmbulance from "./banAmbulance";
import UseAmbulance from "./useAmbulance";

export default function AmbulanceCard({ ambulance, refetch }: AmbulanceProps & { refetch: () => void }) {

    let color
    if (ambulance.status === "Available") {
        color = "bg-green-200"
    }
    else if (ambulance.status === "Used") {
        color = "bg-blue-200"
    }
    else if (ambulance.status === "Unusable") {
        color = "bg-red-200"
    }

    const handleBanAmbulance = async () => {
        ambulance.status = "Unusable"
        await UpdateAmbulance({ ambulance })
        refetch()
    }

    return (
        <div className={`w-60 rounded-xl h-36 border-black border-2 flex justify-center items-center p-4 ${color}`}>
            <div className="w-full h-full flex flex-col justify-start items-centers">
                <div className="w-full flex flex-col items-center ">
                    <div className="w-full flex justify-center font-bold text-black text-xl" >
                        {ambulance.number}
                    </div>
                    <div className="w-full flex justify-center font-bold text-gray-800 text-md" >
                        {ambulance.year}
                    </div>
                    <div className="w-full flex justify-center font-bold text-gray-800 text-md" >
                        {ambulance.type}
                    </div>
                </div>
                <div className="w-full h-full flex justify-evenly items-center">
                    {
                        ambulance.status === "Unusable" || ambulance.status === "Used" ?
                            (
                                ambulance.description
                            ) :
                            ( 
                                <>
                                    <UseAmbulance ambulance={ambulance} refetch={refetch} />
                                    <BanAmbulance ambulance={ambulance} refetch={refetch} />
                                </>
                            )
                    }
                </div>
            </div>
        </div>
    );
}
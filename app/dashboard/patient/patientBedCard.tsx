import { Timestamp } from "firebase/firestore";
import { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { BillConstructor, BillProps } from "../../../models/Bill";
import { Patient, PatientProps } from "../../../models/Patient";
import { Bed, BedProps, Room } from "../../../models/Room";
import { BedContext } from "../../context/bedContext";
import { RoomContext } from "../../context/roomContext";
import { CreateBill } from "../../firebase/billFirestore";
import { GetOneData, GetRoom, UpdateBed } from "../../firebase/firestore";

export default function PatientBedCard({patient, onHandle }: PatientProps & { onHandle: () => void }){

    const { bedState, setBedState } = useContext(BedContext);
    const {roomState, setRoomState} = useContext(RoomContext)

    const handleClick = async(e:any)=>{
        e.preventDefault()
        try{
            if(bedState.status!=='red'){
                bedState.patient = patient;
                bedState.status = 'yellow';
                bedState.useDate = Timestamp.now();

                const patientRoom = await GetRoom(bedState.number)

                const bill = BillConstructor();
                bill.date = Timestamp.now()
                bill.patient = patient;
                bill.items = {
                    room: patientRoom
                }
                await CreateBill({bill})
                await UpdateBed(roomState.id, {bed: bedState})
                toast.success("Add Patient Success", { position: toast.POSITION.TOP_RIGHT, autoClose:1000 })
                onHandle()
            }
            else{
                toast.warning('Bed is Unuseable', { position: toast.POSITION.TOP_RIGHT, autoClose:1000 })
            }
        }catch(error){
        }
    }

    return (
        <div className="w-full px-2 font-bold text-xl rounded-xl shadow border-2 border-black flex justify-between items-center ">
            {patient.name}
            <button onClick={handleClick} className="bg-blue-500 hover:bg-blue-600 rounded px-4 py-2 my-2 text-sm font-semibold text-white">Add</button>
        </div>
    );
}
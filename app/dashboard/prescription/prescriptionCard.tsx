import { PrescriptionProps } from "../../../models/Prescription";
import DeletePrescription from "./deletePrescription";
import EditPrescription from "./editPresciption";
import PrescriptionStatus from "./prescriptionStatus";

export default function PrescriptionCard({ prescription, refetch }: PrescriptionProps & { refetch: () => void }) {


    return (
        <>
            <div className="w-full flex justify-between items-center font-semibold text-md border-2 border-black rounded">
                <div className=" w-full flex justify-start">
                    <div className="p-2 w-1/5 flex flex-col justify-center">
                        {prescription.patient.name}
                    </div>
                    <div className="w-1/6 flex justify-center items-center">
                        {
                            prescription.status === "Completed" ? "Complete" : (
                                <PrescriptionStatus prescription={prescription} refetch={refetch} />
                            )
                        }
                    </div>
                    <div className="w-1/6 flex flex-col justify-center items-center ">
                        <div className="text-black font-semibold">
                            <ul className="list-none">

                                {
                                    prescription.medicines.map((e, index) => (
                                        <li key={e.id}>{e.name}</li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="w-1/6 flex justify-center items-center ">
                        <div className="text-black font-semibold">
                            {prescription.room.number ? (
                                prescription.room.number
                            ) : "-"}
                        </div>
                    </div>
                    <div className="w-1/6 flex justify-center items-center ">
                        <div className="text-black font-semibold">
                            {prescription.note}
                        </div>
                    </div>
                </div>
                <div className="w-1/6 flex justify-center">
                    <div className="p-2">
                        <EditPrescription prescription={prescription} refetch={refetch} />
                    </div>
                </div>
                <div className="w-1/6 flex justify-center">
                    <div className="p-2">
                        <DeletePrescription prescription={prescription} refetch={refetch} />
                    </div>
                </div>
            </div>
        </>
    );
}
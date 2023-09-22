import { faCapsules, faClose, faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MedicineProps } from "../../../models/Medicine";
import EditMedicine from "./editMedicine";
import DeleteMedicine from "./deleteMedicine";

export default function MedicineCard({ medicine, refetch }: MedicineProps & { refetch: () => void }) {
    return (
        <>
            <div className="rounded-xl w-96 h-32 sm:w-60 md:w-56 xl:w-72 border-2 p-1 border-black shadow">
                <div className="p-2 w-full h-full flex justify-between items-center">
                    <div className="flex justify-center items-center h-full ">
                        <FontAwesomeIcon icon={faCapsules}
                            style={{
                                color: 'black',
                                fontSize: '24px',
                            }}
                        />
                    </div>
                    <div className="flex flex-col justify-start text-black">
                        <label ><span>Name: </span>{medicine.name}</label>
                        <label ><span>Price: </span>{medicine.price}</label>
                        <label ><span>Stock: </span>{medicine.stock}</label>
                    </div>
                    <div className="h-full flex flex-col justify-start items-center gap-2">
                        <DeleteMedicine medicine={medicine} refetch={refetch} />
                        <EditMedicine medicine={medicine} refetch={refetch} />
                    </div>
                </div>
            </div>
        </>
    );
}
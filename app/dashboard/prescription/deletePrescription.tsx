import { faClose, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PrescriptionProps } from "../../../models/Prescription";
import { RemovePrescription } from "../../firebase/prescriptionFirestore";

export default function DeletePrescription({ prescription, refetch }: PrescriptionProps & { refetch: () => void }){
    
    const handleDelete = async(e:any) => {
        e.preventDefault()
        await RemovePrescription({ prescription })
        refetch()
        console.log("Delete Success")
    }

    return (
        <>
            <button onClick={handleDelete}>
                <FontAwesomeIcon icon={faTrash}
                    style={{
                        color: 'black',
                        fontSize: '24px',
                    }}
                />
            </button>
        </>
    );
}
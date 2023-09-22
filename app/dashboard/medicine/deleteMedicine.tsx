import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MedicineProps } from "../../../models/Medicine";
import { deleteMedicine } from "../../firebase/medicineFirestore";

export default function DeleteMedicine({ medicine, refetch }: MedicineProps & { refetch: () => void }) {
    
    const handleDelete = async(e: any) => {
        e.preventDefault()
        await deleteMedicine({ medicine })
        refetch()
    }
    
    return (
        <>
            <button onClick={handleDelete}>
                <FontAwesomeIcon icon={faClose}
                    style={{
                        color: 'black',
                        fontSize: '24px',
                    }}
                />
            </button>
        </>
    );
}
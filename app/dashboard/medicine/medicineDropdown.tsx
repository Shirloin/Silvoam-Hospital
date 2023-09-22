import { useContext, useEffect, useState } from 'react';
import { Medicine, MedicineProps } from '../../../models/Medicine';
import { MedicineContext } from '../../context/medicineContext';
import { GetData } from '../../firebase/firestore';

export default function MedicineDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const { medicineState, setMedicineState } = useContext(MedicineContext)
    const [medicines, setMedicines] = useState<Medicine[]>([])

    const fetchMedicine = async () => {
        const data = await GetData("medicines");
        if (data) {
            const medicinesData = data.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            })) as Medicine[]
            setMedicines(medicinesData)
        }
    }

    const toggleDropdown = (): void => {
        setIsOpen(!isOpen);
    };

    const handleCheckboxChange = (med: Medicine): void => {
        if (!medicineState) {
          setMedicineState([med]);
        } else if (medicineState.includes(med)) {
          setMedicineState((prevMedicineState: Medicine[]) =>
            prevMedicineState.filter((item: Medicine) => item !== med)
          );
        } else {
          setMedicineState((prevMedicineState: Medicine[]) => [...prevMedicineState, med]);
        }
      };

    useEffect(() => {
        fetchMedicine()
    }, [])

    const selectedItemsSize = medicineState ? medicineState.length : 0;
    return (
        <>
            <button
                type="button"
                onClick={toggleDropdown}
                className="w-full py-2 my-2 px-4 bg-gray-200 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                {selectedItemsSize === 0
                    ? 'Select Medicines'
                    : `${medicineState.length} Medicine(s) selected`}
            </button>
            {isOpen && (
                <div className="absolute z-10 w-full bg-white rounded-md shadow-lg">
                    <ul>
                        {
                            medicines.map((item: Medicine) => (
                                <li key={item.id} className="px-4 py-2">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            className="form-checkbox h-4 w-4 text-blue-500"
                                            checked={medicineState && medicineState.some((med: Medicine) => med.id === item.id)}
                                            onChange={() => handleCheckboxChange(item)}
                                        />
                                        <span className="ml-2 text-gray-700">{item.name}</span>
                                    </label>
                                </li>
                            ))}
                    </ul>
                </div>
            )}
        </>
    );
};
import { addDoc, collection, deleteDoc, doc, getFirestore, setDoc } from "firebase/firestore"
import { MedicineProps } from "../../models/Medicine"
import { initFirebase } from "./clientApp"

const app = initFirebase()
const firestore = getFirestore(app)

export const CreateMedicine = async({medicine}: MedicineProps)=>{
    try{
        const medicineCollectionRef =  collection(firestore, 'medicines')
        const newDocRef = await addDoc(medicineCollectionRef, medicine)
        await setDoc(newDocRef, {id: newDocRef.id}, {merge:true})
        console.log("Medicine Added Successfully")
    }catch(error){
        console.error('Error saving Medicine: ', error);
    }
}

export const UpdateMedicine = async({medicine}: MedicineProps)=>{
    try {
        const medicineDocRef = doc(firestore, 'medicines', medicine.id)
        await setDoc(medicineDocRef, medicine, {merge:true})
    } catch (error) {
        
    }
}

export const deleteMedicine = async({medicine}: MedicineProps)=>{
    try {
        const medicineDocRef = doc(firestore, "medicines", medicine.id)
        await deleteDoc(medicineDocRef)
    } catch (error) {
        
    }
}
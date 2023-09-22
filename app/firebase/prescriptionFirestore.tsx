import { addDoc, collection, deleteDoc, doc, getFirestore, setDoc } from "firebase/firestore"
import { MedicineProps } from "../../models/Medicine"
import { PrescriptionProps } from "../../models/Prescription"
import { initFirebase } from "./clientApp"

const app = initFirebase()
const firestore = getFirestore(app)

export const CreatePrescription = async({prescription}: PrescriptionProps)=>{
    try{
        const prescriptionCollectionRef =  collection(firestore, 'prescriptions')
        const newDocRef = await addDoc(prescriptionCollectionRef, prescription)
        await setDoc(newDocRef, {id: newDocRef.id}, {merge:true})
        console.log("Prescription Added Successfully")
    }catch(error){
        console.error('Error saving Prescription: ', error);
    }
}

export const UpdatePrescription = async({prescription}: PrescriptionProps)=>{
    try {
        const medicineDocRef = doc(firestore, 'prescriptions', prescription.id)
        await setDoc(medicineDocRef, prescription, {merge:true})
    } catch (error) {
        
    }
}

export const RemovePrescription = async({prescription}: PrescriptionProps)=>{
    try {
        const prescriptionDocRef = doc(firestore, "prescriptions", prescription.id)
        await deleteDoc(prescriptionDocRef)
    } catch (error) {
        
    }
}
import { addDoc, collection, deleteDoc, doc, getFirestore, setDoc } from "firebase/firestore"
import { BillProps } from "../../models/Bill"
import { initFirebase } from "./clientApp"

const app = initFirebase()
const firestore = getFirestore(app)

export const CreateBill = async({bill}: BillProps)=>{
    try{
        const billCollectionRef =  collection(firestore, 'bills')
        const newDocRef = await addDoc(billCollectionRef, bill)
        await setDoc(newDocRef, {id: newDocRef.id}, {merge:true})
        console.log("Bill Added Successfully")
    }catch(error){
        console.error('Error saving Medicine: ', error);
    }
}

export const UpdateBill = async({bill}: BillProps)=>{
    try {
        const billDocRef = doc(firestore, 'bills', bill.id)
        await setDoc(billDocRef, bill, {merge:true})
    } catch (error) {
        
    }
}

export const RemoveBill = async({bill}: BillProps)=>{
    try {
        const billDocRef = doc(firestore, "bills", bill.id)
        await deleteDoc(billDocRef)
    } catch (error) {
        
    }
}
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore"
import { Job, JobProps } from "../../models/Job"
import { UserProps } from "../../models/User"
import { initFirebase } from "./clientApp"

const app = initFirebase()
const firestore = getFirestore(app)

export const GetAllJob = async(userid: string)=>{
    try {
        const jobsCollectionRef = collection(firestore, 'jobs');
        const q = query(jobsCollectionRef, where("userid", "==", userid));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        })) as Job[]
        return data;
    } catch (error) {
        console.error('Error fetching jobs: ', error);
    }
}

export const CreateJob = async({job}: JobProps)=>{
    try{
        const collectionRef =  collection(firestore, 'jobs')
        const newDocRef = await addDoc(collectionRef, job)
        await setDoc(newDocRef, {id: newDocRef.id}, {merge:true})
        console.log("Job Added Successfully")
    }catch(error){
        console.error('Error saving Job: ', error);
    }
}

export const UpdateJob = async({job}: JobProps)=>{
    try {
        const docRef = doc(firestore, 'jobs', job.id)
        await setDoc(docRef, job, {merge:true})
    } catch (error) {
        
    }
}

export const RemoveJob = async({job}: JobProps)=>{
    try {
        const docRef = doc(firestore, 'jobs', job.id)
        await deleteDoc(docRef)
    } catch (error) {
        
    }
}
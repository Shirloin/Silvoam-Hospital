import { useContext } from "react";
import { User } from "../../../models/User";
import { AuthContext } from "../../context/authContext";
import { SignOut } from "../../firebase/clientApp";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";

export default function SignOutComponent() {
  const { authState, setAuthState } = useContext(AuthContext);

  const handleSignOut = async (e: any) => {
    // e.preventDefault()
    try {
      await SignOut()
      await setAuthState(null)
      toast.success("User logout successfully", { position: toast.POSITION.TOP_RIGHT, autoClose: 1000 })
      console.log('User logout successfully');
    } catch (error) {
      console.error('Error during user logout:', error);
    }
  }

  return (
    <>
      {/* <ToastContainer/> */}
      <Link href="/">
        <button onClick={handleSignOut} className="text-sm cursor-pointer">Sign Out</button>
      </Link>
    </>
  );
}
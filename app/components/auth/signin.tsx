'use client';

import { useContext, useEffect, useRef, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../context/authContext';
import { SignIn } from '../../firebase/clientApp';

export default function SignInComponent() {

  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const {authState, setAuthState} = useContext(AuthContext);

  const [modal, setModal] = useState(false);
  const handleClick = () => {
    setModal(!modal);
  }

  const handleFormClick = (e: any) => {
    e.stopPropagation();
  }

  const handleLogin = async (e: any) => {
    e.preventDefault()
    try {
      const user = await SignIn(email, pass)
      if(typeof user === 'string'){
        toast.error(user, { position: toast.POSITION.TOP_RIGHT, autoClose: 1000 })
      }
      else {
        await setAuthState(user)
        toast.success("Login Success", { position: toast.POSITION.TOP_RIGHT, autoClose: 1000 })
        setModal(!modal)
      }
    } catch (error) {
      console.error('Error during user login:', error);
    }
  }

  return (
    <>
      {/* <ToastContainer /> */}
      <button onClick={handleClick} className="text-sm">Sign In</button>
      {modal === true ? (
        <div className='fixed inset-0 z-20 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center' onClick={handleClick}>
          <div className='w-[500px] flex flex-col'>
            <div className='bg-white p-2 rounded-xl flex flex-col'>
              <form className='px-10 py-4' onClick={handleFormClick}>
                <label className='text-md font-bold'>Email</label>
                <input type="text"
                  className='border-black border-2 rounded w-full my-2 p-2 text-md'
                  placeholder='Email'
                  value={email}
                  onChange={(e: any) => { setEmail(e.target.value) }} />
                <label className='text-md font-bold'>Password</label>
                <input type="password"
                  className='border-black border-2 rounded w-full my-2 p-2 text-md'
                  placeholder='Password'
                  value={pass}
                  onChange={(e: any) => { setPass(e.target.value) }} />
                <button onClick={handleLogin} className='bg-blue-500 hover:bg-blue-600 rounded p-2 w-full my-2 text-md font-bold text-white '>Login</button>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
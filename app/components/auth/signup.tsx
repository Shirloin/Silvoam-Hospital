'use client';

import { useEffect, useRef, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { SignOut, SignUp } from '../../firebase/clientApp';
import { User, UserConstructor } from '../../../models/User';
import { toast, ToastContainer } from 'react-toastify';

export default function SignUpComponent() {

  const [modal, setModal] = useState(false);
  const [user, setUser] = useState<User>(UserConstructor)
  const [isStaff, setIsStaff] = useState(false);

  const roleList = [
    "Doctor", "Nurse", "Pharmacist",
    "Cleaning Service", "Kitchen Staff", "Chef", "Driver"
  ]


  const handleClick = () => {
    setModal(!modal);
  }

  const handleFormClick = (e: any) => {
    e.stopPropagation();
  }

  const handleRegister = async (e: any) => {
    e.preventDefault()
    try {
      await SignUp({ user })
      await SignOut()
      setModal(!modal)
      toast.success("User registered successfully", { position: toast.POSITION.TOP_RIGHT, autoClose: 1000 })
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        toast.error("Email already in use", { position: toast.POSITION.TOP_RIGHT, autoClose: 1000 })
      }
      console.error('Error during user registration:', error);
    }
  }

  const handleOnChange = (e: any) => {
    const { name, value } = e.target
    let val = value
    setUser({ ...user, [name]: val })
  }

  return (
    <>
      <ToastContainer />
      <button onClick={handleClick} className="text-sm border-black border-2 p-1 rounded-xl">Sign Up</button>
      {modal === true ? (
        <div className='fixed inset-0 z-20 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center' onClick={handleClick}>
          <div className='w-[500px] flex flex-col'>
            <div className='bg-white p-2 rounded-xl flex flex-col'>
              <form className='px-10 py-4' onClick={handleFormClick}>
                <label className='text-md font-bold'>Name</label>
                <input type="text"
                  name='name'
                  className='border-black border-2 rounded w-full my-2 p-2 text-md'
                  placeholder='Name'
                  value={user.name}
                  onChange={handleOnChange} />
                <label className='text-md font-bold'>Email</label>
                <input type="text"
                  name='email'
                  className='border-black border-2 rounded w-full my-2 p-2 text-md'
                  placeholder='Email'
                  value={user.email}
                  onChange={handleOnChange} />
                <label className='text-md font-bold'>Password</label>
                <input type="password"
                  name='password'
                  className='border-black border-2 rounded w-full my-2 p-2 text-md'
                  placeholder='Password'
                  value={user.password}
                  onChange={handleOnChange} />
                <label className='text-md font-bold'>Role</label>
                <div className="w-full grid grid-cols-2 gap-2 text-md">
                  {
                    roleList.map((a, index) => (
                      <>
                        <label className="space-x-4 flex items-center">
                          <input
                            className="h-4 w-4"
                            type="radio"
                            name="role"
                            value={a}
                            key={index}
                            checked={user.role === a}
                            onChange={handleOnChange} />
                          <span>{a}</span>
                        </label>
                      </>

                    ))
                  }
                </div>
                <button onClick={handleRegister} className='bg-blue-500 hover:bg-blue-600 rounded p-2 w-full my-2 text-md font-bold text-white '>Register</button>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
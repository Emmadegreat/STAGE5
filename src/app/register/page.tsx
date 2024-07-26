'use client'

import React, { FC, FormEvent, useState } from 'react'
import { addDoc, collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { auth, db } from '../../../firebase'
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import Link from 'next/link'
import { createUserWithEmailAndPassword } from "firebase/auth";
import {toast} from 'react-toastify'

const Register:FC=()=>{

  const [email, setEmail] = useState<string>("");
  const [password1, setPassword1] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(false);
  const [password1Focused, setPassword1Focused] = useState<boolean>(false);
  const [password2Focused, setPassword2Focused] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);


  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();


    try {

      if (!email ||!password1) {
        setIsError(true);
        return;
      }

      await createUserWithEmailAndPassword(auth, email, password1);
      const user = auth.currentUser;
      console.log(user);

      if (user) {
        await setDoc(doc(db, 'users', user.uid), {
          email: user.email,
          firstname: name,
          lastname: name,
        });

        toast.success("Successfully registered");
        setTimeout(() => {
          window.location.href = "/login";
        }, 1000);

      }


    } catch (error) {
      console.log('error: ', error);

      toast.error('Check your details and ensure the form is correctly filled');
    }

  }


  return (
    <div className='bg-[#fafafa] flex items-center flex-col m-auto'>
      <div className='absolute top-[50px] flex flex-col w-full max-w-[448px] px-4'>
        <div className='flex flex-center items-center m-auto pb-4'>
          <svg className='w-[30px] h-[30px]'
            width="25" height="25" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M2.5235 31.225C4.96683 33.6666 8.8935 33.6666 16.7502 33.6666C24.6068 33.6666 28.5352 33.6666 30.9752 31.225C33.4168 28.7866 33.4168 24.8566 33.4168 17C33.4168 9.14331 33.4168 5.21498 30.9752 2.77331C28.5368 0.333313 24.6068 0.333313 16.7502 0.333313C8.8935 0.333313 4.96516 0.333313 2.5235 2.77331C0.0834961 5.21665 0.0834961 9.14331 0.0834961 17C0.0834961 24.8566 0.0834961 28.785 2.5235 31.225ZM12.5835 11.5833C11.5122 11.5833 10.4649 11.901 9.57416 12.4962C8.68339 13.0914 7.98912 13.9373 7.57915 14.9271C7.16917 15.9169 7.06191 17.006 7.27091 18.0567C7.47991 19.1074 7.9958 20.0726 8.75333 20.8301C9.51087 21.5877 10.476 22.1036 11.5268 22.3126C12.5775 22.5216 13.6666 22.4143 14.6564 22.0043C15.6461 21.5944 16.4921 20.9001 17.0873 20.0093C17.6825 19.1186 18.0002 18.0713 18.0002 17C18.0002 16.6685 18.1319 16.3505 18.3663 16.1161C18.6007 15.8817 18.9186 15.75 19.2502 15.75C19.5817 15.75 19.8996 15.8817 20.134 16.1161C20.3685 16.3505 20.5002 16.6685 20.5002 17C20.5002 18.5657 20.0359 20.0964 19.166 21.3982C18.2961 22.7001 17.0597 23.7148 15.6131 24.314C14.1665 24.9132 12.5747 25.07 11.039 24.7645C9.50335 24.4591 8.09273 23.7051 6.98557 22.5979C5.8784 21.4907 5.12441 20.0801 4.81895 18.5444C4.51348 17.0088 4.67026 15.417 5.26945 13.9704C5.86864 12.5238 6.88334 11.2874 8.18523 10.4175C9.48712 9.54762 11.0177 9.08331 12.5835 9.08331C12.915 9.08331 13.233 9.21501 13.4674 9.44943C13.7018 9.68385 13.8335 10.0018 13.8335 10.3333C13.8335 10.6648 13.7018 10.9828 13.4674 11.2172C13.233 11.4516 12.915 11.5833 12.5835 11.5833ZM26.3335 17C26.3335 18.4366 25.7628 19.8143 24.747 20.8301C23.7312 21.846 22.3534 22.4166 20.9168 22.4166C20.5853 22.4166 20.2674 22.5483 20.0329 22.7828C19.7985 23.0172 19.6668 23.3351 19.6668 23.6666C19.6668 23.9982 19.7985 24.3161 20.0329 24.5505C20.2674 24.785 20.5853 24.9166 20.9168 24.9166C22.4826 24.9166 24.0132 24.4523 25.3151 23.5824C26.617 22.7126 27.6317 21.4761 28.2309 20.0296C28.8301 18.583 28.9868 16.9912 28.6814 15.4555C28.3759 13.9198 27.6219 12.5092 26.5148 11.4021C25.4076 10.2949 23.997 9.5409 22.4613 9.23543C20.9256 8.92996 19.3338 9.08674 17.8873 9.68593C16.4407 10.2851 15.2043 11.2998 14.3344 12.6017C13.4645 13.9036 13.0002 15.4342 13.0002 17C13.0002 17.3315 13.1319 17.6494 13.3663 17.8839C13.6007 18.1183 13.9186 18.25 14.2502 18.25C14.5817 18.25 14.8996 18.1183 15.134 17.8839C15.3685 17.6494 15.5002 17.3315 15.5002 17C15.5002 15.5634 16.0708 14.1856 17.0867 13.1698C18.1025 12.154 19.4802 11.5833 20.9168 11.5833C22.3534 11.5833 23.7312 12.154 24.747 13.1698C25.7628 14.1856 26.3335 15.5634 26.3335 17Z" fill="#633CFF"/>
          </svg>
          <h1 className='font-[700] ml-2 text-[2.2rem] text-[#333333]'>devlinks</h1>
        </div>
        <section className='w-full shadow-lg text-[1.4rem] flex flex-col bg-white rounded-lg px-8 py-4 mb-8'>

          <h1 className='font-[700] text-start text-[1.5rem]'>Create account</h1>
          <p className='text-[#737373] text-[14px] my-2'>Let’s get you started sharing your links!</p>

          <div className='w-full flex flex-col'>
            <form onSubmit={handleRegister} className='mt-6 w-full'>

              <div className='flex flex-col mb-2'>
                <label className={`text-[14px] ${isError ? 'text-red-600' : ''}`}>Email address</label>
                <div  className='relative'>

                  <svg
                    className="absolute top-[14px] left-[1.2rem]"
                      width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 3H2C1.86739 3 1.74021 3.05268 1.64645 3.14645C1.55268 3.24021 1.5 3.36739 1.5 3.5V12C1.5 12.2652 1.60536 12.5196 1.79289 12.7071C1.98043 12.8946 2.23478 13 2.5 13H13.5C13.7652 13 14.0196 12.8946 14.2071 12.7071C14.3946 12.5196 14.5 12.2652 14.5 12V3.5C14.5 3.36739 14.4473 3.24021 14.3536 3.14645C14.2598 3.05268 14.1326 3 14 3ZM13.5 12H2.5V4.63688L7.66187 9.36875C7.75412 9.45343 7.87478 9.50041 8 9.50041C8.12522 9.50041 8.24588 9.45343 8.33813 9.36875L13.5 4.63688V12Z" fill="#737373"/>
                  </svg>

                  {isError && (
                    <span className='absolute right-[1.2rem] top-[14px] text-[#FF3939] text-[0.8rem]'>Can&#39;t be empty</span>
                  )}

                  <input type="email"
                    placeholder='e.g. alex@email.com'
                    value={email}
                    onFocus={() => setEmailError(true)}
                    onBlur={() => setEmailError(false)}
                    onChange={(e)=>setEmail(e.target.value)}
                    className={`w-full h-[44px] placeholder-[#737373] placeholder-[14px] text-[0.8rem] pl-[3rem]
                      py-1 mb-4 rounded-lg border-[1px] outline-none pr-4
                      ${emailError ? 'shadow-custom border-[#633CFF] ring-opacity-20' : 'bg-transparent border-[#D9D9D9]'}
                      ${isError ? 'border-red-600' : ''}
                    `}
                  />
                </div>
              </div>

              <div className='flex flex-col'>

                <span className={`text-[14px] ${isError ? 'text-red-600' : ''}`}>Create Password</span>

                <div className='relative'>

                  <svg
                    className="absolute top-[14px] left-[1.2rem]"
                    width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 5H9V3.5C9 2.70435 8.68393 1.94129 8.12132 1.37868C7.55871 0.81607 6.79565 0.5 6 0.5C5.20435 0.5 4.44129 0.81607 3.87868 1.37868C3.31607 1.94129 3 2.70435 3 3.5V5H1C0.734784 5 0.48043 5.10536 0.292893 5.29289C0.105357 5.48043 0 5.73478 0 6V13C0 13.2652 0.105357 13.5196 0.292893 13.7071C0.48043 13.8946 0.734784 14 1 14H11C11.2652 14 11.5196 13.8946 11.7071 13.7071C11.8946 13.5196 12 13.2652 12 13V6C12 5.73478 11.8946 5.48043 11.7071 5.29289C11.5196 5.10536 11.2652 5 11 5ZM6.5 9.91438V11.5C6.5 11.6326 6.44732 11.7598 6.35355 11.8536C6.25979 11.9473 6.13261 12 6 12C5.86739 12 5.74021 11.9473 5.64645 11.8536C5.55268 11.7598 5.5 11.6326 5.5 11.5V9.91438C5.16639 9.79643 4.88522 9.56434 4.70618 9.25914C4.52715 8.95393 4.46177 8.59526 4.5216 8.24651C4.58144 7.89776 4.76264 7.58139 5.03317 7.35332C5.3037 7.12525 5.64616 7.00016 6 7.00016C6.35384 7.00016 6.6963 7.12525 6.96683 7.35332C7.23736 7.58139 7.41856 7.89776 7.4784 8.24651C7.53823 8.59526 7.47285 8.95393 7.29382 9.25914C7.11478 9.56434 6.83361 9.79643 6.5 9.91438ZM8 5H4V3.5C4 2.96957 4.21071 2.46086 4.58579 2.08579C4.96086 1.71071 5.46957 1.5 6 1.5C6.53043 1.5 7.03914 1.71071 7.41421 2.08579C7.78929 2.46086 8 2.96957 8 3.5V5Z" fill="#737373"/>
                  </svg>

                  {isError && (
                    <span className='absolute right-[1.2rem] top-[14px] text-[#FF3939] text-[0.8rem]'>Please check again</span>
                  )}

                  <input type="password"
                    placeholder='At least 8 characters'
                    value={password1}
                    onFocus={() => setPassword1Focused(true)}
                    onBlur={() => setPassword1Focused(false)}
                    onChange={(e)=>setPassword1(e.target.value)}
                    className={`w-full h-[44px] placeholder-[#737373] placeholder-[14px] text-[0.8rem] pl-[3rem]
                      py-1 mb-4 rounded-lg border-[1px] outline-none pr-4
                      ${password1Focused ? 'shadow-custom border-[#633CFF] ring-opacity-20' : 'bg-transparent border-[#D9D9D9]'}
                      ${isError ? 'border-red-600' : ''}
                    `}
                  />
                </div>
              </div>

              <div className='flex flex-col'>
                <span className='text-[14px] text-[#737373]'>Confirm Password</span>

                <div className='relative'>
                  <svg
                    className="absolute top-[14px] left-[1.2rem]"
                    width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 5H9V3.5C9 2.70435 8.68393 1.94129 8.12132 1.37868C7.55871 0.81607 6.79565 0.5 6 0.5C5.20435 0.5 4.44129 0.81607 3.87868 1.37868C3.31607 1.94129 3 2.70435 3 3.5V5H1C0.734784 5 0.48043 5.10536 0.292893 5.29289C0.105357 5.48043 0 5.73478 0 6V13C0 13.2652 0.105357 13.5196 0.292893 13.7071C0.48043 13.8946 0.734784 14 1 14H11C11.2652 14 11.5196 13.8946 11.7071 13.7071C11.8946 13.5196 12 13.2652 12 13V6C12 5.73478 11.8946 5.48043 11.7071 5.29289C11.5196 5.10536 11.2652 5 11 5ZM6.5 9.91438V11.5C6.5 11.6326 6.44732 11.7598 6.35355 11.8536C6.25979 11.9473 6.13261 12 6 12C5.86739 12 5.74021 11.9473 5.64645 11.8536C5.55268 11.7598 5.5 11.6326 5.5 11.5V9.91438C5.16639 9.79643 4.88522 9.56434 4.70618 9.25914C4.52715 8.95393 4.46177 8.59526 4.5216 8.24651C4.58144 7.89776 4.76264 7.58139 5.03317 7.35332C5.3037 7.12525 5.64616 7.00016 6 7.00016C6.35384 7.00016 6.6963 7.12525 6.96683 7.35332C7.23736 7.58139 7.41856 7.89776 7.4784 8.24651C7.53823 8.59526 7.47285 8.95393 7.29382 9.25914C7.11478 9.56434 6.83361 9.79643 6.5 9.91438ZM8 5H4V3.5C4 2.96957 4.21071 2.46086 4.58579 2.08579C4.96086 1.71071 5.46957 1.5 6 1.5C6.53043 1.5 7.03914 1.71071 7.41421 2.08579C7.78929 2.46086 8 2.96957 8 3.5V5Z" fill="#737373"/>
                  </svg>

                  {password2Focused && (<span className='absolute right-[1.2rem] top-[14px] text-[#FF3939] text-[0.8rem]'></span>)}

                  <input type="password"
                    placeholder='At least 8 characters'
                    value={password2}
                    onFocus={() => setPassword2Focused(true)}
                    onBlur={() => setPassword2Focused(false)}
                    onChange={(e)=>setPassword2(e.target.value)}
                    className={`w-full h-[44px] placeholder-[#737373] placeholder-[14px] text-[0.8rem] pl-[3rem]
                      py-1 mb-4 rounded-lg border-[1px] outline-none pr-4
                      ${password2Focused ? 'shadow-custom border-[#633CFF] ring-opacity-20' : 'bg-transparent border-[#D9D9D9]'}
                    `}
                  />
                </div>
              </div>


              <p className='text-[#737373] text-[14px] my-2'>Password must contain at least 8 characters</p>
              <button
                type="submit"
                className='p-2 mt-4 mb-3 w-full h-[44px] bg-[#633CFF] text-white text-[16px] font-[600] rounded-lg'
              >
                Create new account
              </button>

              <div className='text-[16px] font-[400] text-center my-4 text-[#737373]'>
                <p className="flex sm:flex-row flex-col">
                  <span>Already have an account?</span>
                  <Link href="/login" className='text-[#633CFF] sm:mt-0 mt-2 px-2'>Login</Link>
                </p>
              </div>
            </form>
          </div>

        </section>
      </div>
    </div>
  )
}


export default Register
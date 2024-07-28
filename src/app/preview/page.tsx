
"use client";

import { auth, db } from '../../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import Button from '../../components/buttton'
import Image from 'next/image';
import { IoLogoGithub } from 'react-icons/io'
import { IoLogoLinkedin } from "react-icons/io";
import { TiSocialYoutube } from 'react-icons/ti'
import { toast } from 'react-toastify';

const ProfilePage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setFirstName(userData.firstname);
          setLastName(userData.lastname);
          setEmail(userData.email);
          setProfileImage(userData.profileImage);
        } else {
          toast.error("No user data found");
        }
      }
    };

    fetchUserData();
  }, []);

  return (
    <section className='bg-[#fafafa]'>
      <div className='sm:bg-[#633CFF] bg-[#fafafa] p-8 w-full h-[300px] topbar relative'>
        <div className='sm:bg-white bg-[#fafafa] flex justify-between items-center p-4 rounded-lg'>
          <Button
            href="/profile"
            className='border-[#633CFF] text-[#633CFF] font-[500] rounded-lg text-[14px] border-[1px] px-4 py-2'
            text="Back to Editor"
          />

          <Button
            href="#"
            className='outline-none text-white bg-[#633CFF] font-[500] rounded-lg text-[14px] border-[1px] px-4 py-2'
            text="Share Link"
          />
        </div>

      </div>

      <div className="absolute top-[150px] sm:top-[200px] inset-x-0 m-auto  h-[400px] w-[300px] flex flex-col items-center gap-4 p-6 bg-[#fafafa] sm:bg-white rounded-lg sm:shadow-lg">

        {profileImage && (
          <div className="relative w-24 h-24 flex flex-col">
            <Image
              src={profileImage}
              alt="Profile Picture"
              layout="fill"
              className="rounded-full object-cover"
            />
          </div>
        )}
        <div className="text-gray-700 text-center">
          <h3 className='font-[700] text-[18px] text-[#333333]'>{firstName} {lastName}</h3>
          <p className='text-[14px] py-2'>{email}</p>
        </div>
        <div className="flex flex-col gap-3">
          <div className="bg-[#1A1A1A] px-2 rounded-lg h-[44px] w-[237px] text-white flex justify-between items-center">
            <span className='text-[12px] text-white flex items-center'>
              <IoLogoGithub />GitHub</span>
            <span>&#129106;</span>
          </div>
          <div className="bg-[#EE3939] rounded-lg h-[44px] w-[237px] px-2 flex justify-between items-center">
            <span className='text-[12px] text-white flex items-center'>
              <TiSocialYoutube />YouTube</span>
            <span className='text-white'>&#129106;</span>
          </div>
          <div className="bg-[#2D68FF] rounded-lg h-[44px] w-[237px] px-2 flex justify-between items-center">
            <span className='text-[12px] text-white flex items-center'>
            <IoLogoLinkedin />YouTube</span>
            <span className='text-white'>&#129106;</span>
          </div>
          <div className="bg-[#EEEEEE] rounded-lg h-[44px] w-[237px] hidden"></div>
          <div className="bg-[#EEEEEE] rounded-lg h-[44px] w-[237px] hidden"></div>
          </div>
      </div>
      <div className='h-[300px]'>

      </div>
    </section>
  );
};

export default ProfilePage;

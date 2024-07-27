"use client"

import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { auth, db } from '../../../firebase';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

import Image from "next/image";
import Link from 'next/link';
import { toast } from 'react-toastify';

const ProfileDetails = () => {
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [user, setUser] = useState<any>(null);

  const storage = getStorage();

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          console.log('user data: ', userData.data());

          setUser(userData);
          setFirstName(userData.firstname);
          setLastName(userData.lastname);
          setEmail(userData.email);
          if (userData.profileImage) {
            setProfileImageUrl(userData.profileImage);
          }
        }
      }
    };
    fetchUserData();
  }, []);

  const handleProfileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const currentUser = auth.currentUser;
    if (currentUser) {
      const userRef = doc(db, 'users', currentUser.uid);

      try {
        const updates: any = {};
        if (firstName) updates.firstname = firstName;
        if (lastName) updates.lastname = lastName;

        if (profileImage) {
          // Upload the image to Firebase Storage and get the download URL
          const storageRef = ref(storage, `profileImages/${currentUser.uid}`);
          await uploadBytes(storageRef, profileImage);
          const downloadURL = await getDownloadURL(storageRef);
          updates.profileImage = downloadURL;
          setProfileImageUrl(downloadURL); // Update state with the new URL
        }

        await updateDoc(userRef, updates);

        toast.success("Profile updated successfully");
      } catch (error) {
        toast.error("Failed to update profile");
        console.error(error);
      }
    }
  };

  const renderProfileImage = (imageUrl: string | null) => {
    if (imageUrl) {
      return (
        <Image
          src={imageUrl}
          alt="Profile"
          width={50}
          height={50}
          className="w-full h-full object-cover rounded-full"
        />
      );
    }
    return (
      <div className="w-full flex flex-col items-center justify-center">
        <Image src="images/pimage.svg" alt="Upload Icon" width={40} height={40} />
        <p className="text-[14px]"></p>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-9 p-[24px]">
      <nav className="flex justify-between items-center px-[18px] sm:px-[20px] bg-[#FFFFFF]
      rounded-xl text-[16px] font-[600] leading-[24px] h-[78px] sticky top-0 z-10">
        <Image
          src="/assests/icons/logo.svg"
          alt="brandLogo"
          className='sm:block hidden'
          width={185.5}
          height={40}
        />
        <Image
          src="/assests/icons/mobile-logo.svg"
          alt="brandLogo"
          className='sm:hidden block'
          width={40}
          height={40}
        />
        <div className="flex items-center">
          <Link href="/sharelinks" className="rounded-lg h-[38px] sm:h-[46px] w-[80px] sm:w-[122px] flex gap-2 items-center justify-center text-[#737373]">
            <Image
              src="/assests/icons/linkicon.svg"
              alt="link-icon"
              width={20}
              height={20}
            />
            <span className='sm:block hidden'> Link</span>
          </Link>
          <button className="flex gap-2 items-center justify-center rounded-lg h-[36px] sm:h-[46px]
          w-[50px] custom-medium:w-[150px] sm:w-[187px] bg-[#EFEBFF] text-[#633CFF] hover:text-[#633CFF]">
            <Image
              src="/assests/images/user.svg"
              alt="user-circle"
              className='w-auto h-auto'
              width={20}
              height={20}
            />{" "}
            <span className='sm:block hidden'> Profile Details</span>
          </button>
        </div>
        <button className="items-center text-[#633CFF] hover:bg-[#EFEBFF] rounded-lg custom-medium:w-[80px] h-[36px] sm:h-[46px] w-[50px] sm:w-[114px] border border-[#633CFF]">
          <Image
            src="/assests/icons/mobile-preview.svg"
            alt="user-circle"
            className='sm:hidden block m-auto'
            width={20}
            height={20}
          />{" "}
          <span className='sm:block hidden'> Preview</span>
        </button>
      </nav>

      <div className="flex items-center gap-10 w-[100%]">
        <div className="hidden md:flex justify-center items-center md:w-[45%] bg-[#FFFFFF] h-[834px] rounded-xl">
          <div className="flex justify-center h-[631px]">
            <Image
              src="/assests/icons/frame1.svg"
              alt="frame1"
              width={307}
              height={631}
            />
            <Image
              src="/assests/icons/frame2.svg"
              alt="frame2"
              className="absolute mt-2"
              width={285}
              height={611}
            />
            <div className="absolute mt-14 flex flex-col gap-12 items-center justify-center w-[20%] p-[5px]">
              <div className="bg-[#EEEEEE] h-[96px] w-[96px] rounded-[50%]">
                {renderProfileImage(profileImageUrl)}
              </div>
              <div className="flex flex-col gap-4 items-center">
                <div className="w-[160px] h-[16px] bg-[#EEEEEE] rounded-[104px] text-center flex justify-center items-center">
                  {firstName && lastName ? `${firstName} ${lastName}` : ''}
                </div>
                <div className="w-[78px] h-[8px] bg-[#EEEEEE] rounded-[104px] flex justify-center items-center">
                  {email ? email : ''}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="bg-[#1A1A1A] rounded-lg h-[44px] w-[237px]"></div>
                <div className="bg-[#EE3939] rounded-lg h-[44px] w-[237px]"></div>
                <div className="bg-[#2D68FF] rounded-lg h-[44px] w-[237px]"></div>
                <div className="bg-[#EEEEEE] rounded-lg h-[44px] w-[237px]"></div>
                <div className="bg-[#EEEEEE] rounded-lg h-[44px] w-[237px]"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-8 md:order-2 order-1 w-[100%] md:w-[55%] flex flex-col justify-between bg-[#FFFFFF] h-[834px] rounded-xl">
          <div className="h-[739px] flex flex-col gap-8">
            <div className="flex flex-col px-[40px] py-3 gap-5">
              <h1 className="text-[#333333] leading-[48px] text-[32px] font-[700]">
                Profile Details
              </h1>
              <p className="text-[#737373] text-[16px] leading-[24px] font-[400]">
                Add your details to create a personal touch to your profile.
              </p>
            </div>

            <form onSubmit={handleUpdate} className="flex flex-col gap-10">
              <section className='flex justify-between items-center sm:flex-row flex-col rounded-lg bg-[#fafafa] p-4'>
                {/* {renderProfileImage(profileImageUrl)} */}
                <p className='basis-[30%]'>Profile Picture</p>
                <label
                htmlFor="profileImage"
                className="sm:basis-[28%] cursor-pointer flex flex-col items-center justify-center w-[65%] h-[193px] bg-[#EFEBFF] rounded-xl relative overflow-hidden"
              >

                <div
                  className={`absolute inset-0 flex flex-col items-center justify-center bg-opacity-50 bg-[#EFEBFF] text-white ${
                    profileImageUrl ? '' : 'hidden'
                  }`}
                >
                  <Image
                    src="/assests/images/phimage.svg"
                    alt="Upload Icon"
                    width={40}
                    height={40}
                  />
                  <p className="text-[14px]">Change Image</p>
                </div>
                {!profileImageUrl && (
                  <div className="w-full flex flex-col items-center justify-center">
                    <Image
                      src="images/pimage.svg"
                      alt="Upload Icon"
                      width={80}
                      height={40}
                    />
                    <p className="text-[14px] text-[#6a44ff]">+ Upload Image</p>
                  </div>
                )}
              </label>

              <input
                type="file"
                id="profileImage"
                className="hidden"
                onChange={handleProfileImage}
                />
                <p className='basis-[30%] text-[14px] ml-4 text-[#737373] sm:mt-4'>Image must be below 1024x1024px. Use PNG or JPG format.</p>
              </section>

              <div className="flex flex-col gap-3 w-full rounded-lg p-4 bg-[#fafafa]">
                <div className="flex gap-1 items-center justify-between">
                  <label htmlFor="firstname" className="text-[#737373]">
                    First Name*
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-[60%] px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="e.g., John"
                  />
                </div>

                <div className="flex gap-1 items-center justify-between">
                  <label htmlFor="lastname" className="text-[#737373]">
                    Last Name*
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-[60%] px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="e.g., Doe"
                  />
                </div>

                <div className="flex gap-1 items-center justify-between">
                  <label htmlFor="email" className="text-[#737373]">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-[60%] px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="e.g. email@example.com"
                  />
                </div>
              </div>
              <hr className='bg-[#fafafa] w-full mt-4'/>

              <div className=''>
                <button
                  type="submit"
                  className="float-right px-6 py-2 bg-[#633CFF] text-white rounded-md hover:bg-[#633CFF]/80"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;

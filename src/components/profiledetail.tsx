"use client"

import { ChangeEvent, FormEvent, useState } from 'react';

import Image from "next/image";

const ProfileDetails = () => {
  const [profileImage, setProfileImage] = useState<string | ArrayBuffer | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submittedData, setSubmittedData] = useState({
    profileImage: null as string | ArrayBuffer | null,
    firstName: '',
    lastName: '',
    email: ''
  });

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmittedData({ profileImage, firstName, lastName, email });
    console.log({ firstName, lastName, email, profileImage });

    setProfileImage(null);
    setFirstName('');
    setLastName('');
    setEmail('');

    // Display success message
    setMessage('Your changes have been successfully saved!');
  };

  const renderProfileImage = (image: string | ArrayBuffer | null) => {
    if (typeof image === 'string') {
      return <img src={image} alt="Profile" className="w-full h-full object-cover rounded-full" />;
    } else if (image instanceof ArrayBuffer) {
      // Convert ArrayBuffer to base64 string
      const uint8Array = new Uint8Array(image);
      const base64String = btoa(String.fromCharCode(...Array.from(uint8Array)));
      return <img src={`data:image/png;base64,${base64String}`} alt="Profile" className="w-full h-full object-cover rounded-full" />;
    }
    return '';
  };

  return (
    <div className="flex flex-col gap-9 p-[24px]">
      <nav className="flex justify-between items-center px-[20px] bg-[#FFFFFF] rounded-xl text-[16px] font-[600] leading-[24px] h-[78px] sticky top-0 z-10">
        <Image
          src="/assests/icons/logo.svg"
          alt="brandLogo"
          width={185.5}
          height={40}
        />
        <div className="flex items-center">
          <button className="rounded-lg h-[46px] w-[122px] flex gap-2 items-center justify-center text-[#737373]">
            <Image
              src="images/linkicon.svg"
              alt="link-icon"
              width={20}
              height={20}
            />
            Links
          </button>
          <button className="flex gap-2 items-center justify-center rounded-lg h-[46px] bg-[#EFEBFF] text-[#633CFF] w-[187px] hover:text-[#633CFF]">
            <Image
              src="/images/user.svg"
              alt="user-circle"
              width={20}
              height={20}
            />{" "}
            Profile Details
          </button>
        </div>
        <button className="items-center text-[#633CFF] hover:bg-[#EFEBFF] rounded-lg h-[46px] w-[114px] border border-[#633CFF]">
          Preview
        </button>
      </nav>

      <div className="flex items-center gap-10 w-[100%]">
        <div className="flex justify-center items-center w-[40%] bg-[#FFFFFF] h-[834px] rounded-xl">
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
                {renderProfileImage(submittedData.profileImage)}
              </div>
              <div className="flex flex-col gap-4 items-center">
                <div className="w-[160px] h-[16px] bg-[#EEEEEE] rounded-[104px] text-center flex justify-center items-center">
                  {submittedData.firstName && submittedData.lastName ? `${submittedData.firstName} ${submittedData.lastName}` : ''}
                </div>
                <div className="w-[78px] h-[8px] bg-[#EEEEEE] rounded-[104px] flex justify-center items-center">
                  {submittedData.email ? submittedData.email : ''}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="bg-[#EEEEEE] rounded-lg h-[44px] w-[237px]"></div>
                <div className="bg-[#EEEEEE] rounded-lg h-[44px] w-[237px]"></div>
                <div className="bg-[#EEEEEE] rounded-lg h-[44px] w-[237px]"></div>
                <div className="bg-[#EEEEEE] rounded-lg h-[44px] w-[237px]"></div>
                <div className="bg-[#EEEEEE] rounded-lg h-[44px] w-[237px]"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[60%] flex flex-col justify-between bg-[#FFFFFF] h-[834px] rounded-xl">
          <div className="h-[739px] flex flex-col gap-8">
            <div className="flex flex-col px-[40px] py-3 gap-5">
              <h1 className="text-[#333333] leading-[48px] text-[32px] font-[700]">
                Profile Details
              </h1>
              <p className="text-[#737373] text-[16px] leading-[24px] font-[400]">
                Add your details to create a personal touch to your profile.
              </p>
            </div>
            <div className="">
              <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                <div className='flex flex-col p-[40px] gap-10'>
                  <div className="flex items-center p-5  bg-[#FAFAFA] rounded-xl w-full h-auto">
                    <p className="text-[#737373] text-[16px] font-normal w-[40%]">Profile picture</p>
                    <div className="flex items-center gap-2 w-[60%] relative">
                      <label htmlFor="profileImage" className="cursor-pointer flex flex-col items-center justify-center w-[65%] h-[193px] bg-[#EFEBFF] rounded-xl relative overflow-hidden">
                        {profileImage && (
                          <img src={typeof profileImage === 'string' ? profileImage : ''} alt="Profile" className="absolute inset-0 w-full h-full object-cover rounded-xl" />
                        )}
                        <div className={`absolute inset-0 flex flex-col items-center justify-center bg-opacity-50 bg-[#EFEBFF] text-white ${profileImage ? '' : 'hidden'}`}>
                          <img src="images/phimage.svg" alt="Upload Icon" width={40} height={40} />
                          <p className="text-[14px]">Change Image</p>
                        </div>
                        {!profileImage && (
                          <div className="flex flex-col items-center justify-center">
                            <img src="images/pimage.svg" alt="Upload Icon" width={40} height={40} />
                            <p className="text-[14px]">+ Upload Image</p>
                          </div>
                        )}
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="profileImage"
                      />
                      <p className="font-normal text-[12px] leading-[18px]">
                        Image must be below 1024x1024px. Use PNG or JPG format.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-5 bg-[#FAFAFA] p-5 rounded-xl">
                    <div className="flex justify-between">
                      <label className="block text-gray-700">First name</label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-[60%] px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="e.g., John"
                      />
                    </div>
                    <div className="flex justify-between">
                      <label className="block text-gray-700">Last name</label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-[60%] px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="e.g., Doe"
                      />
                    </div>
                    <div className="flex justify-between">
                      <label className="block text-gray-700">Email</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-[60%] px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="e.g., email@example.com"
                      />
                    </div>
                  </div>
                </div>

                <div className="h-[95px] flex justify-end items-center font-[600] text-[16px] leading-[24px] text-[#FFFFFF] px-[40px] border-t-[2px] border-t-[#ececec] relative overflow-hidden">
                   {message && <span className="text-[#FAFAFA] bg-[#333333] h-[46px] px-[24px] rounded-xl flex items-center gap-1 text-[16px] relative right-44"><img src="images/floppy.svg" alt="" /> {message}</span>}
                  <button type="submit" className="bg-[#633CFF] rounded-lg h-[46px] w-[91px]">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileDetails;

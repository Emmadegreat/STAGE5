// components/ProfilePage.tsx
"use client";

import { auth, db } from '../../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import Image from 'next/image';
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
    <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800">Profile Details</h1>
      {profileImage && (
        <div className="relative w-24 h-24">
          <Image
            src={profileImage}
            alt="Profile Picture"
            layout="fill"
            className="rounded-full object-cover"
          />
        </div>
      )}
      <div className="text-gray-700">
        <p><strong>First Name:</strong> {firstName}</p>
        <p><strong>Last Name:</strong> {lastName}</p>
        <p><strong>Email:</strong> {email}</p>
      </div>
    </div>
  );
};

export default ProfilePage;

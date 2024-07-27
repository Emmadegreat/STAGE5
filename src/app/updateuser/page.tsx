'use client'

import { auth, db } from '../../../firebase';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const UpdateUser = () => {
    const [user, setUser] = useState<any>(null);
    const [email, setEmail] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [profileImage, setProfileImage] = useState<File | null>(null);

    const storage = getStorage();

    useEffect(() => {
        const fetchUserData = async () => {
            const currentUser = auth.currentUser;
            if (currentUser) {
                const userRef = doc(db, 'users', currentUser.uid);
                const userDoc = await getDoc(userRef);
                if (userDoc.exists()) {
                    setUser(userDoc.data());
                    setFirstname(userDoc.data().firstname);
                    setLastname(userDoc.data().lastname);
                    setEmail(userDoc.data().email);
                } else {
                    toast.error("User data not found");
                }
            } else {
                toast.error("User not authenticated");
            }
        };
        fetchUserData();
    }, []);

    const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
                if (firstname) updates.firstname = firstname;
                if (lastname) updates.lastname = lastname;
                if (email) updates.email = email; // Update email as well

                await updateDoc(userRef, updates);

                if (profileImage) {
                    // Upload the image to Firebase Storage and get the download URL
                    const storageRef = ref(storage, `profileImages/${currentUser.uid}`);
                    await uploadBytes(storageRef, profileImage);
                    const downloadURL = await getDownloadURL(storageRef);
                    await updateDoc(userRef, { profileImage: downloadURL });
                }

                toast.success("Profile updated successfully");
            } catch (error) {
                toast.error("Failed to update profile");
                console.error(error);
            }
        }
    };

    // if (!user) {
    //     return <p>Loading...</p>;
    // }

    return (
        <form onSubmit={handleUpdate}>
            <div>
                <label>First Name:</label>
                <input
                    type="text"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Last Name:</label>
                <input
                    type="text"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)} // Corrected: setLastname instead of setEmail
                    required
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // Corrected: setEmail instead of setLastname
                    required
                />
            </div>
            <div>
                <label>Profile Image:</label>
                <input type="file" accept="image/*" onChange={handleProfileImageChange} />
            </div>
            <button type="submit">Update Profile</button>
        </form>
    );
};

export default UpdateUser;
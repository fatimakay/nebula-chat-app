import { faEnvelope, faPrescriptionBottle, faUser } from '@fortawesome/fontawesome-free-solid';
import  '@fortawesome/react-fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddImage from '../images/addimage.png';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth, db, storage } from "../firebase"; 
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Register = () => {
    const [error, setError] = useState(false); 
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        const displayName = e.target[0].value; 
        const email = e.target[1].value; 
        const password = e.target[2].value; 
        const avatar = e.target[3].files[0];

        try {
            //Create user
            const res = await createUserWithEmailAndPassword(auth, email, password);
      
            //Create a unique image name
            const date = new Date().getTime();
            const storageRef = ref(storage, `${displayName + date}`);
      
            await uploadBytesResumable(storageRef, avatar).then(() => {
              getDownloadURL(storageRef).then(async (downloadURL) => {
                try {
                  //Update profile
                  await updateProfile(res.user, {
                    displayName,
                    photoURL: downloadURL,
                  });
                  //create user on firestore
                  await setDoc(doc(db, "users", res.user.uid), {
                    uid: res.user.uid,
                    displayName,
                    email,
                    photoURL: downloadURL,
                  });
      
                  //create empty user chats on firestore
                  await setDoc(doc(db, "userChats", res.user.uid), {});
                  navigate("/");
                } catch (error) {
                  console.log(error);
                  setError(true);
                }
              });
            });
          } catch (error) {
            setError(true);
          }

    };
    return ( 
    <div id="form-container" className=" bg-magnolia h-screen flex items-center justify-center">
        <div id="form" className="xl:w-1/3 outer-shadow-small bg-mognolia py-5 px-14 rounded-xl flex flex-col gap-3 items-center">
            <span id="brand-name" className="text-grey font-extrabold text-2xl">Nebula</span>
            <span id="lead" className="text-grey text-lg">Create Account</span>
            <form className="w-full flex flex-col gap-5" onSubmit={handleSubmit}>
                <input type="text" placeholder="Display name" 
                className=" rounded-full placeholder-grey bg-magnolia p-3.5 border-0 inner-shadow focus:outline-purple" />
                <input type="email" placeholder="Email address" 
                className="rounded-full placeholder-grey bg-magnolia p-3.5 border-0 inner-shadow focus:outline-purple"/>
                <input type="password" placeholder="Password" 
                className="rounded-full placeholder-grey bg-magnolia p-3.5 border-0 inner-shadow focus:outline-purple"/>
                <label className='flex items-center gap-4 text-purple text-sm cursor-pointer' htmlFor="profilepic">
                    <img src={AddImage} className="w-8"/>
                    <span>Add your avatar</span>
                </label>
                <input className='hidden' id="profilepic" type="file" />
                <button className="outer-shadow-small bg-purple text-white p-3.5 font-bold rounded-full focus:inner-shadow">Sign Up</button>
                {error && <span>Something went wrong, please try again.</span>}
            </form>
            <p className="text-grey text-sm mt-2.5">Already have an account? 
            <Link to="/login" className="text-black hover:text-purple"> Login</Link></p>
        </div>
    </div>
    );
}
 
export default Register;
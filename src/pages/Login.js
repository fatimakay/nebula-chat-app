import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
    const [error, setError] = useState(false); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value; 
        const password = e.target[1].value; 

        try{
            await signInWithEmailAndPassword(auth, email, password)
            navigate("/");

        } catch (err) {
            setError(true);
        }
    };

    return ( 
        <div id="form-container" className=" bg-magnolia h-screen flex items-center justify-center">
        <div id="form" className="xl:w-1/3 outer-shadow-small bg-mognolia py-5 px-14 rounded-xl flex flex-col gap-3 items-center">
            <span id="brand-name" className="text-grey text-2xl font-extrabold">Nebula</span>
            <span id="lead" className="text-grey text-lg">Sign In</span>
            <form className="w-full flex flex-col gap-5"
            onSubmit={handleSubmit}>
                <input type="email" placeholder="Email address" 
                className="rounded-full placeholder-grey bg-magnolia p-3.5 border-0 inner-shadow focus:outline-purple"/>
                <input type="password" placeholder="Password" 
                className="rounded-full placeholder-grey bg-magnolia p-3.5 border-0 inner-shadow focus:outline-purple"/>
                <input className='hidden' id="profilepic" type="file" />
                <button className="outer-shadow-small bg-purple text-white p-3.5 font-bold rounded-full focus:inner-shadow">Login</button>
                {error && <span>Something went wrong, please try again.</span>}            
            </form>
            <p className="text-grey text-sm mt-2.5">New member?
             <Link to="/register" className="text-black hover:text-purple"> Sign up here</Link></p>
        </div>
    </div>
     );
}
 
export default Login;
import { faPowerOff } from "@fortawesome/fontawesome-free-solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "firebase/auth";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase";
const Navbar = () => {
    const {currentUser} = useContext(AuthContext); 
    return ( 
        <div id="navbar" className=" flex items-center justify-between bottom-shadow h-14 p-2.5 sm:max-lg:justify-start">
            <span id="logo" className="font-extrabold text-purple text-lg sm:max-lg:hidden ">Nebula</span>
            <div id="user" className=" flex gap-2 sm:max-lg:w-full sm:max-lg:justify-between ">
                <img src={currentUser.photoURL} alt="" className="outer-shadow-small bg-purple h-6 w-6 rounded-full object-cover"/>
                <span>{currentUser.displayName}</span>
                <button onClick={() => signOut(auth)}
                className=" outer-shadow-small text-grey text-xs rounded-full p-1 active:inner-shadow "><FontAwesomeIcon icon={faPowerOff} /></button>
            </div>
        </div>
     );
}
 
export default Navbar;
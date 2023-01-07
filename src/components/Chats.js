import { doc, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";

const Chats = () => {

    const [chats, setChats] = useState([]); 

    const {currentUser} = useContext(AuthContext); 
    const {dispatch} = useContext(ChatContext); 

    useEffect(() => {
    const getChats = () =>  {  //get realtime chats 
        const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
        });

        return () => {
            unsub(); 
        };
    };
    //call above function if a user uid exists
    currentUser.uid && getChats();
    
    }, [currentUser.uid])

    console.log(Object.entries(chats)); 

    const handleSelect = (u) => {
        dispatch({type:"CHANGE_USER", payload:u})
    }
    return ( 
        <div id="chats" className=" flex flex-col  ">
            {Object.entries(chats)?.sort((a,b)=>b[1].date-a[1].date).map((chat) => (
                <div id="user-list"  key={chat[0]} onClick={()=>handleSelect(chat[1].userInfo)}
                className="sm:max-md:justify-center p-2.5 flex items-center gap-3 cursor-pointer convex hover:concave">
                <img src={chat[1].userInfo.photoURL} 
                alt="" className="w-12 h-12 rounded-full object-cover"/>
            <div id="user-info"  className="hidden w-fit md:block">
                <span className="text-lg font-bold">{chat[1].userInfo.displayName}</span>
                <p className="text-sm text-grey">{chat[1].lastMessage?.text}</p>
            </div>
            </div>
            ))}
             
        </div>
     );
}
 
export default Chats;
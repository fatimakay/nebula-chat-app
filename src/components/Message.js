import userEvent from "@testing-library/user-event";
import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({message}) => {

    const {currentUser} = useContext(AuthContext); 
    const {data} = useContext(ChatContext); 
    
    const ref  = useRef();

    //to scroll to the latest message
    useEffect(()=>{
        ref.current?.scrollIntoView({behavior:"smooth"})
    }, [message])
    console.log(message);
    return ( 
        <div id="msg" ref={ref} className={`${message.senderId === currentUser.uid && "owner"} flex gap-2 `}>
            <div id="message-info" className="flex flex-col text-grey mb-2">
                <img src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} 
                alt="" className="object-cover w-10 h-10 rounded-full" />
            </div>
            <div id="message-content" className="flex flex-col gap-3 mb-4">
                <p 
                className="w-max outer-shadow-small py-2.5 px-5 rounded-tl-none rounded-tr-xl rounded-b-xl">
                    {message.text}</p>
               {message.img && <img src={message.img} alt="" className="w-1/2" />}
            </div>
        </div>
     );
}
 
export default Message;
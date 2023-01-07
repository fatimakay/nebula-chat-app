import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import Messages from "./Messages";
import MsgInput from "./MsgInput"

const Chatbox = () => {
    const {data} = useContext(ChatContext); 
    return (  
        <div id="chatbox" className="w-2/3">
            <div id="topbar" className="h-14 bottom-shadow flex items-center p-2.5 text-grey">
                <span>{data.user?.displayName}</span>
            </div>  
            <Messages/>
            <MsgInput/>
        </div>
    );
}
 
export default Chatbox;
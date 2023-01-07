import { doc, onSnapshot } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { ChatContext } from '../context/ChatContext';
import { db } from '../firebase';
import Message from './Message'
const Messages = () => {
    const [messages, setMessages] = useState([])
    const {data} = useContext(ChatContext); 

    useEffect(()=>{
        const unsub = onSnapshot(doc(db,"chats", data.chatId), (doc)=>{
            doc.exists() && setMessages(doc.data().messages)
        })

        return () =>{
            unsub();
        }
    }, [data.chatId])
    return ( 
        <div id="messages" className='p-2.5 h-[calc(100%-112px)] overflow-scroll'>
            {messages.map(m=>(
                <Message message={m} key={m.id}/>
            ))}
        </div>
     );
}
 
export default Messages;
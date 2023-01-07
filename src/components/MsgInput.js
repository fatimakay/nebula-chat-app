import { faPaperPlane } from '@fortawesome/fontawesome-free-solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { db, storage } from '../firebase';
import AddImg from '../images/addimage.png'
import { v4 as uuid } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';

const MsgInput = () => {
    const [text, setText] = useState("");
    const [img, setImg] = useState(null); 

    const {currentUser} = useContext(AuthContext); 
    const {data} = useContext(ChatContext); 

    const handleSend = async () => {
        if (img) {
          const storageRef = ref(storage, uuid());
    
          const uploadTask = uploadBytesResumable(storageRef, img);
    
          uploadTask.on(
            (error) => {
              //TODO:Handle Error
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                await updateDoc(doc(db, "chats", data.chatId), {
                  messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                    img: downloadURL,
                  }),
                });
              });
            }
          );
        } else {
          await updateDoc(doc(db, "chats", data.chatId), {
            messages: arrayUnion({
              id: uuid(),
              text,
              senderId: currentUser.uid,
              date: Timestamp.now(),
            }),
          });
        }
    
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [data.chatId + ".lastMessage"]: {
            text,
          },
          [data.chatId + ".date"]: serverTimestamp(),
        });
    
        await updateDoc(doc(db, "userChats", data.user.uid), {
          [data.chatId + ".lastMessage"]: {
            text,
          },
          [data.chatId + ".date"]: serverTimestamp(),
        });
    
        setText("");
        setImg(null);
      };
    return ( 
        <div id="msginput" className="h-14 bg-magnolia p-2.5 flex items-center justify-between concave">
            <input onChange={(e) => setText(e.target.value)} value={text}
            type="text" placeholder="Type something..." className='w-full outline-0 text-lg bg-magnolia'/>
            <input type="file" onChange={(e) => setImg(e.target.files[0])}
             id="file" className="hidden " />
                <label htmlFor="file" className='p-2.5 rounded-full convex active:inner-shadow'>
                    <img src={AddImg} alt="" className='w-7 cursor-pointer ' />
                </label>
            <div id="send" className='flex items-center gap-3'>
                <button onClick={handleSend}
                className='py-2.5 px-3.5 text-purple convex rounded-full active:inner-shadow'><FontAwesomeIcon icon={faPaperPlane}/></button>
            </div>
        </div>
     );
}
 
export default MsgInput;
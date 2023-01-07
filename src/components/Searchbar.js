import { useContext, useState } from "react";
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore"; 
import {db} from "../firebase"
import { AuthContext } from "../context/AuthContext";


const Searchbar = () => {
    const[username, setUsername] = useState(""); //for input field
    const[userFound, setUserFound] = useState(null); //the actual user searched
    const [error, setError] = useState(false); 
    
    const {currentUser} = useContext(AuthContext); 
    const handleSearch = async () =>{
        //create query against database firestore collection 
        const q = query(
            collection(db, "users"), 
            where("displayName", "==", username)
            );
        
        try{
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
            setUserFound(doc.data()); 
        });
    } catch(error){
        setError(true);
    }
    }

    const handleKeyDown = (e) =>{
        e.code === "Enter" && handleSearch()
    }

    //function when user selects a person after searching
    const handleSelect = async () => {
        //join the 2 users IDs to create new one
        const userPairID = currentUser.uid > userFound.uid
         ? currentUser.uid + userFound.uid
         : userFound.uid + currentUser.uid;  

         try{
             //check whether the pair's chat exists in firestore. if not, create. 
             const res =  await getDoc(doc(db, "chats", userPairID))
            if(!res.exists()){
                //create new chat pair
                await setDoc(doc(db, "chats", userPairID), {messages: []});

                //create user chats
                // userChats: {
                //     janesId: {
                //         userPairID:{
                //             userInfo{
                //                 displayname, img, id
                //             }, 
                //             lastMessage:"", 
                //             date: 
                //         }
                //     }
                // }
                await updateDoc(doc(db, "userChats", currentUser.uid), {
                    [userPairID+".userInfo"]: {
                        uid: userFound.uid, 
                        displayName: userFound.displayName, 
                        photoURL: userFound.photoURL
                    }, 
                    [userPairID+".date"]:serverTimestamp() //get current time
                });
                await updateDoc(doc(db, "userChats", userFound.uid), {
                    [userPairID+".userInfo"]: {
                        uid: currentUser.uid, 
                        displayName: currentUser.displayName, 
                        photoURL: currentUser.photoURL
                    }, 
                    [userPairID+".date"]:serverTimestamp() //get current time
                });
            }
             //create user chats
         }catch(error) {}
        
         //remove the user from search and empty the field
         setUserFound(null);
         setUsername(""); 
    }
    return ( 
        <div id="searchbar" >
            <div id="searchfield" className="p-2.5">
                <input type="text" className="bg-transparent outline-0  " 
                placeholder="Find a user"
                onChange={e=>setUsername(e.target.value)}
                value={username}
                onKeyDown={handleKeyDown}/>
            </div>
            {error && <span>User not found!</span>}
      {userFound && (
        <div id="userChat" onClick={handleSelect}
        className="sm:max-md:justify-center p-2.5 flex items-center gap-3 cursor-pointer convex hover:concave">
          <img src={userFound.photoURL} alt=""
          className="w-12 h-12 rounded-full object-cover" />
          <div id="userChatInfo" className="hidden w-fit md:block">
            <span className="text-lg font-bold">{userFound.displayName}</span>
          </div>
        </div>
      )}
            
        </div>
     );
}
 
export default Searchbar;
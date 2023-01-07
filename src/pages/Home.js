import Sidebar from '../components/Sidebar'
import Chats from '../components/Chats'
import Chatbox from '../components/Chatbox';
const Home = () => {
    return ( 
        <div id="home" className='bg-magnolia h-screen flex items-center justify-center' >
            <div id="container" className='sm:max-lg:w-11/12  outer-shadow-small  rounded-xl overflow-hidden  w-4/6 h-4/5 flex'>
                <Sidebar/>
                <Chatbox/>
            </div>
        </div>
     );
}
 
export default Home;
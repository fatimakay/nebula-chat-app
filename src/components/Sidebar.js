import Navbar from './Navbar'
import Searchbar from './Searchbar'
import Chats from './Chats'
const Sidebar = () => {
    return (
        <div id="sidebar" className=" w-1/3 border-r-2 ">
            <Navbar/>
            <Searchbar/>
            <Chats/>
        </div>
     );
}
 
export default Sidebar;
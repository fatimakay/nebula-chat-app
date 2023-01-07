import { useContext } from 'react';
import { Navigate, Route, Router, Routes } from 'react-router-dom';
import './App.css';
import { AuthContext } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
function App() {

  const {currentUser} = useContext(AuthContext);
  console.log(currentUser);
  
  const ProtectedRoute = ({children}) => {
    if(!currentUser){
      return <Navigate to="/login" />
    }
    return children;
  }
  return (
    <div className="App font-nunito ">
      <Routes>
        <Route path="/">
          <Route index element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

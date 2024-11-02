
import './App.css';
import { Route } from 'react-router-dom';
import Navbar from './component/navbar'; 
import Footer from './component/footer';
import { Routes } from 'react-router-dom';
import LandingPage from './page/landing'
import LoginPage from './page/login';
import ProtectedRoute from './component/ProtectedRoute';
import { useLocation } from 'react-router-dom';


function App() {
  let location = useLocation();

  const isLoginPage = location.pathname === '/login';

  return (
    <>
        {!isLoginPage && <Navbar />}
        <Routes> 
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<ProtectedRoute element={LandingPage} />} /> 
        </Routes>
        {!isLoginPage && <Footer />}
    </>
  );
}

export default App;

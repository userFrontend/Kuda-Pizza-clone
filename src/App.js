import { useEffect, useState } from 'react';
import { useInfoContext } from './context/infoContext';
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Auth from './pages/Auth/Auth';
import Home from './pages/Home/Home';
import Prod from './pages/Prod/Prod';
import Account from './pages/Accout/Account';
import History from './pages/History/History';
import Basket from './components/Basket/Basket';
import LoaderSite from './components/Loader/LoaderSite';
import ToastContainer from './components/Message/ToastContainer';
import AddProd from './admin/AddProd/AddProd';
import Users from './admin/Users/Users';
import DeleteProd from './admin/DeleteProd/DeleteProd';
import Order from './pages/Order/Order';

function App() {
  const {currentUser, basket, categorys} = useInfoContext()
  const path = useLocation().pathname
  const [auth, setAuth] = useState(false)

  useEffect(() => {
    const rePath = () => {
      if(path === '/'){
        return setAuth(false)
      } else if(path !== '/' && !currentUser){
        return setAuth(true)
      } else {
        return setAuth(false)
      }
    }
    rePath()
  }, [path])

  return (
    <>
      {categorys?.length > 0 ?
        <div className="App">
        {!auth && <Header/>}
        <Routes>
          <Route path='/' index element={<Home />}/>
          <Route path='/account' element={!currentUser ? <Auth reset={setAuth}/> : <Account />}/>
          <Route path='/history' element={!currentUser ? <Auth reset={setAuth}/> : <History />}/>
          <Route path='/prod/:id' element={!currentUser ? <Auth reset={setAuth}/> : <Prod/>}/>
          <Route path='/order' element={!currentUser ? <Auth reset={setAuth}/> : <Order/>}/>
          <Route path='/add' element={!currentUser && currentUser?.role === 'admin' ? <Auth reset={setAuth}/> : <AddProd/>}/>
          <Route path='/delete' element={!currentUser && currentUser?.role === 'admin' ? <Auth reset={setAuth}/> : <DeleteProd/>}/>
          <Route path='/users' element={!currentUser && currentUser?.role === 'admin' ? <Auth reset={setAuth}/> : <Users/>}/>
        </Routes>
        {!auth && <Footer/>}
        {basket && <Basket/>}
        <ToastContainer/>
      </div>
      : <LoaderSite/>}
    </>
  );
}

export default App;

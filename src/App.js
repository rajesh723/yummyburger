import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Header from "./components/layout/Header"
import Home from './components/home/Home'
import Footer from './components/layout/Footer'
import Contact from './components/contact/Contact'
import Cart from './components/cart/Cart'
import Shipping from './components/cart/shipping'
import ConfirmOrder from './components/cart/confirmOrder'
import PaymentSuccess from './components/cart/PaymentSuccess.jsx'
import Login from './components/login/login.jsx'
import Profile from './components/profile/Profile'
import Myorders from './components/myOrders/Myorders'
import OrderDetails from './components/myOrders/orderDetails.jsx'
import Dashboard from "./components/admin/Dashboard"
import Users from "./components/admin/users"
import Orders from "./components/admin/orders"
import About from './components/about/About'
import NotFound from "./components/layout/notFound"
import { useEffect } from "react"
import { useDispatch , useSelector } from "react-redux"
import { loadUser } from "./redux/actions/user"
import toast , {Toaster} from 'react-hot-toast';
import {ProtectedRoute} from "protected-route-react"


import './styles/app.scss'
import './styles/Header.scss'
import './styles/Home.scss'
import './styles/Founder.scss'
import './styles/menu.scss'
import './styles/footer.scss'
import './styles/contact.scss'
import './styles/cart.scss'
import './styles/Shipping.scss'
import './styles/confirmOrder.scss'
import './styles/PaymentSuccess.scss'
import './styles/login.scss'
import './styles/profile.scss'
import './styles/table.scss'
import './styles/orderDetails.scss'
import './styles/dashboard.scss'
import './styles/about.scss'




function App() {

 const dispatch = useDispatch()
 const {error, message ,isAuthenticated ,user} = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
  dispatch(loadUser());
  }, [dispatch])
  
 useEffect(() =>{
  
  if(error){
    toast.error(error);
    dispatch({
       type: "clearError",
    });
  }
  
  if(message){
    toast.success(message);
    dispatch({
       type: "clearMessage",
    });
  }

 },[dispatch,error,message]); 


  return <Router>
        
     <Header isAuthenticated={isAuthenticated} />
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/paymentsuccess" element={<PaymentSuccess />} />


        <Route 
        path="/login" 
        element={
        <ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/me">
          <Login />
        </ProtectedRoute>
        } />

        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
             <Route path="/me" element={<Profile />} />
             <Route path="/shipping" element={<Shipping />} />
             <Route path="/confirmOrder" element={<ConfirmOrder />} />
             <Route path="/myOrders" element={<Myorders />} />
             <Route path="/order/:id" element={<OrderDetails />} />
        </Route>

        
        
       <Route 
          element={
           <ProtectedRoute 
            isAuthenticated={isAuthenticated} 
             adminRoute={true}
              isAdmin={user && user.role==="admin"} 
               redirectAdmin="/me"/>}
        >
             <Route path="/admin/dashboard" element={<Dashboard />} />
             <Route path="/admin/users" element={<Users />} />
             <Route path="/admin/orders" element={<Orders />} />
       </Route>

        <Route path="*" element={<NotFound />} />

      </Routes>
    <Footer />
    <Toaster />
  </Router>
}

export default App;

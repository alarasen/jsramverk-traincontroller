import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "./contexts/usercontext";
import Home from "./pages/Homepage";
import Login from "./pages/Loginpage";
import PrivateRoute from "./pages/PrivateRoutepage";
import Signup from "./pages/Signuppage";
 
function App() {
 return (
   <BrowserRouter>
     {/* We are wrapping our whole app with UserProvider so that */}
     {/* our user is accessible through out the app from any page*/}
     <UserProvider>
       <Routes>
         <Route exact path="/login" element={<Login />} />
         <Route exact path="/signup" element={<Signup />} />
         {/* We are protecting our Home Page from unauthenticated */}
         {/* users by wrapping it with PrivateRoute here. */}
         <Route element={<PrivateRoute />}>
           <Route exact path="/" element={<Home />} />
           <Route exact path="/home" element={<Home />} />
         </Route>
       </Routes>
     </UserProvider>
   </BrowserRouter>
 );
}
 
export default App;

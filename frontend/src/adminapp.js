import { HashRouter, Routes, Route } from "react-router-dom";
import MyDashboard from "./admin/dashboard";
import MyOrder from "./admin/order";
import MyProduct from "./admin/product";
import UserDetails from "./admin/userDetails";

const AdminApp = () => {
    return(
      <HashRouter>
        <Routes>
            <Route exact path="/" element={<MyDashboard/>} />
            <Route exact path="/order" element={<MyOrder/>} />
            <Route exact path="/product" element={<MyProduct/>} />
            <Route exact path="/userdetails/:id" element={<UserDetails/>} />
        </Routes>
      </HashRouter>
    )
}
export default AdminApp;
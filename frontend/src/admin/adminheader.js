import React from "react";
import { Link } from "react-router-dom"; 

const AdminHeader = () => {

  const user = JSON.parse(localStorage.getItem("user"))

return(
    <div className="conatiner mt-3 sticky-top">
        <div className="row">
            <div className="col-lg-4 text-center">
                <i className="fa fa-shopping-bag fa-lg text-danger"> </i> 
                <h3>Keep@Buying</h3>
            </div>
            <div className="col-lg-8 text-end">
                <div className="btn-group">
                    <Link to="/" className="btn btn-primary" ><i className="fa fa-home"> </i> Dashboard </Link>
                    <Link to="/product" className="btn btn-primary"><i className="fa fa-suitcase"> </i> Manage Products </Link>
                    <Link to="/order" className="btn btn-primary"><i className="fa fa-headset"> </i> Manage Orders </Link>
                    <button className="btn btn-danger" onClick={Logout}> Welcome : {user.name}   <i className="fa fa-power-off  "> </i> Logout </button>
                 </div>
            </div>
        </div>
    </div>
     );
}

export default AdminHeader;

const Logout = () =>{
    localStorage.clear();
    window.location.href="http://localhost:3000/#/login";
    //window.location.href="http://127.0.0.1:5500/#/login";
    window.location.reload();
}
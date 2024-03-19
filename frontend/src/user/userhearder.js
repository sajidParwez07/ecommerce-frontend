import React from "react";
import { Link, useNavigate } from "react-router-dom";

const UserHeader = () => {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));
    // console.log('user******', user)

    const mycart = () =>{
        if(user !== null){
            navigate('/cart');
        } else{
            navigate('/login');
        }
    };

    const Logout = () =>{
        localStorage.clear();
        navigate('/login');
        navigate(window.location.reload(), { replace: true })
        
    }

    return (
        <nav className="navbar navbar-expand-sm sticky-top navbar-dark bg-dark p-3">
            <div className="container-fluid">
                <a className="navbar-brand">
                    <i className="fa fa-shopping-bag"></i> Keep@Buying
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse ms-5">
                    <ul className="navbar-nav me-auto ms-5">
                        <li className="nav-item ps-4">
                            <Link to="/" className="nav-link active"><i className="fa fa-home"></i> Home</Link>
                        </li>
                        <li className="nav-item ps-4">
                            <button className="nav-link active" onClick={mycart}><i className="fa fa-shopping-cart"></i> My Cart</button>
                        </li>
                        {
                            !user?.name && <li className="nav-item ps-4">
                            <Link to="/login" className="nav-link active"><i className="fa fa-lock"></i> Login</Link>
                        </li>
                        }

                        {
                            !user?.name && <li className="nav-item ps-4">
                            <Link to="/register" className="nav-link active"><i className="fa fa-user-plus"></i> Register</Link>
                        </li>
                        }

                        {
                            user?.name && <li className="nav-item ps-4">
                            <Link className="nav-link active" onClick={Logout}>
                                <i className="fa fa-power-off  "> </i>
                                Logout
                            </Link>
                        </li>
                        }
                        
                        
                    </ul>
                    {user?.name && <div className="d-flex text-white">
                       Welcom: {user.name}
                    </div>}
                   
                </div>
            </div>
        </nav>
    )
}
export default UserHeader;
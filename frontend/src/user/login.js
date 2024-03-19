import React, { useState } from "react";
import UserHeader from "./userhearder";
import { useNavigate } from "react-router-dom";


const MyLogin = () => {

    let [uemail, pickEmail] = useState("");
    let [upass, pickPassword] = useState("");
    let [msg, updateMsg] = useState("Enter Login Details");
    const navigate = useNavigate();

    const goLogin = () =>{
       if(uemail=="" || upass==""){
        updateMsg("Empty Email or Password");
       }else{
        updateMsg("Please wait processing ... ");
        var url = " http://localhost:1234/account?email="+uemail+"&pass="+upass;
          fetch(url)
          .then(response=>response.json())
          .then(userArray=>{
            // console.log('userArray', userArray)
            if(userArray.length > 0){
                updateMsg("Success : Please wait Redirecting ....");
                const loggedinUser = userArray.find(user => user.email === uemail && user.password === upass);
                // console.log('loggedinUser', loggedinUser);
                if(loggedinUser) {
                    const user = {...loggedinUser};
                    delete user.password;
                    localStorage.setItem("user", JSON.stringify(user)); // localStorage to create storage
                    navigate('/');
                } else {
                    updateMsg("Fail : Invalid Email or Password !");
                }
                navigate(window.location.reload(), { replace: true })
            }else{
                updateMsg("Fail : Invalid Email or Password !");
            }
          })
       }

    }

    return (
        <>
            <UserHeader />
            <div className='container mt-4'>
                <div className='row'>
                    <div className='col-lg-4'></div>
                    <div className='col-lg-4'>
                        <div className='p-4 border shadow mt-5'>
                            <h3 className='text-center'>Login </h3>
                            <p className="text-center text-danger"> {msg}</p>
                            <div className="mb-4 input-group">
                                <input type="text" className="form-control"
                                    placeholder="Enter Your Email Id" onChange={obj => pickEmail(obj.target.value)} />
                            </div>
                            <div className="mb-4 input-group">
                                <input type="password" className="form-control"
                                    placeholder="Enter Your Password" onChange={obj => pickPassword(obj.target.value)} />
                            </div>
                            <div className="text-center">
                                <button className="btn btn-danger" onClick={goLogin}>Login</button>
                            </div>

                        </div>
                    </div>
                    <div className='col-lg-3'></div>
                </div>
            </div>

        </>
    )
}

export default MyLogin;

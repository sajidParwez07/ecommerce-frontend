import React, { useState } from 'react';
import UserHeader from './userhearder';

const Register = () => {
    let [name, setName] = useState('');
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [confirmpassword, setConfirmPassword] = useState('');

    const saveUser = () =>{
        let url = 'http://localhost:1234/account';
        let data = {
            name:name,
            email:email,
            password:password,
            isAdmin: false
        };
        let postOption = {
            headers:{'Content-Type':'application/json'},
            method: 'POST',
            body: JSON.stringify(data)
        }
        fetch(url, postOption)
        .then(Response=>Response.json())
        .then(serRes=>{
            alert('saved');
            setName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        })
    }; 

    return (
        <>
            <UserHeader />
            <div className='container mt-4'>
                <div className='row'>
                    <div className='col-lg-4'></div>
                    <div className='col-lg-4'>
                        <div className='p-4 w-100 border shadow mt-5'>
                            <h3 className='text-center'>Register</h3>
                            <p className="text-center text-danger"></p>
                            <div className="mb-4 input-group">
                                <input type="text" className="form-control"
                                    placeholder="Enter Your Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="mb-4 input-group">
                                <input type="email" className="form-control"
                                    placeholder="Enter Your Email Id"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="mb-4 input-group">
                                <input type="password" className="form-control"
                                    placeholder="Enter Your Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className="mb-4 input-group">
                                <input type="password" className="form-control"
                                    placeholder="Confirm Password"
                                    value={confirmpassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)} />
                            </div>
                            <div className="text-center">
                                <button className="btn btn-primary" onClick={saveUser}>Register</button>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-3'></div>
                </div>
            </div>
        </>
    )
}

export default Register;
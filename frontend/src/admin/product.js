import React, {useState,useEffect} from "react";
import AdminHeader from "./adminheader";

const MyProduct = () => {

    let[product,updateProduct] = useState([]);
    const getProduct = () =>{
        fetch("http://localhost:1234/product")
        .then(response=>response.json())
        .then(productArray=>{
            updateProduct(productArray);
        })
    }
    useEffect(()=>{
       
        getProduct();
    },[1]);

let[pname,pickName] = useState("");
let[pprice,pickPrice] = useState("");
let[pphoto,pickPhoto] = useState("");
let[pdetails,pickDetails] = useState("");
let[msg, updateMessage]=useState("");
const save = () => {
    var newproduct={
      "name": pname,
      "price": pprice,
      "photo": pphoto,
      "details": pdetails
    };
    var url = "http://localhost:1234/product";
    var postData = {
        headers:{'Content-Type': 'application/json'},
        method:"POST",
        body:JSON.stringify(newproduct)
    }
    fetch(url, postData)
    .then(response=>response.json())
    .then(serverResponse=>{
        getProduct();
        pickName(""); pickDetails(""); pickPhoto(""); pickPrice("");
    })
   }

   const deleteProd = (id) =>{
    var url="http://localhost:1234/product/"+id;
    var postData={
        headers:{"Content-Type":"application/json"},
        method:"DELETE"
    }
    fetch(url, postData)
    .then(response=>response.json())
    .then(serverRes=>{
    updateMessage("Product " +id + " Deleted Succesfully !");
    getProduct(); 
    })
}

    return(
        <>
            <AdminHeader/>
            <div className="conatiner mt-4">
                <div className="row">
                    <div className="col-lg-3">
                        <div className="p-3 shadow rounded">
                            <h4 className="text-center"> Add New Product</h4>
                            <div className="mb-3">
                                <label> Product Name </label>
                                <input type="text" className="form-control" onChange={obj=>pickName(obj.target.value)} value={pname}/>
                            </div>
                            <div className="mb-3">
                                <label> Price </label>
                                <input type="number" className="form-control" onChange={obj=>pickPrice(obj.target.value)} value={pprice}/>
                            </div>
                            <div className="mb-3">
                                <label> Product Photo </label>
                                <input type="text" className="form-control" onChange={obj=>pickPhoto(obj.target.value)} value={pphoto}/>
                            </div>
                            <div className="mb-3">
                                <label> Product Details </label>
                                <textarea className="form-control" onChange={obj=>pickDetails(obj.target.value)} value={pdetails}></textarea>
                            </div>
                            <div className="text-center">
                            <button className="btn btn-outline-primary" onClick={save}> Save Product</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-9">
                    <h4 className="text-center">{product.length} - Product List </h4>
                    <p className="text-center text-danger">{msg}</p>
                    <table className="table table-bordered mt-3 border shadow text-center">
                        <thead>
                            <tr className="bg-light text-primary text-center">
                            <th> Product ID</th>
                            <th> Name </th>
                            <th> Price </th>
                            <th> Details </th>
                            <th> Photo </th>
                            <th> Action </th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                                    product.map((prod,index)=>{
                                        return(
                                            <tr key={index}>
                                                <td> {prod.id} </td>
                                                <td> {prod.name} </td>
                                                <td> {prod.price} </td>
                                                <td>{prod.details} </td>
                                                <td><img src={prod.photo} height="50" /> </td>
                                                <td> <button className="btn btn-danger btn-sm" onClick={deleteProd.bind(this, prod.id)}>  
                                                <i className="fa fa-trash "></i> Delete </button></td>
                                                
                                            </tr>
                                        )
                                    })
                                }
                        </tbody>

                    </table>
                    </div>
                </div>
            </div>
        </>
    )

}
export default MyProduct;
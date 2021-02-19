import React from 'react';
import './Profile/style.css';
import {useForm} from 'react-hook-form';
import axios from 'axios';

const LoanForm = (props) => {

    const {register, handleSubmit} = useForm();

    const onSubmit = async (data) => {
        try{
            // const res = await axios.get();
           
        }catch(err){
            
        }
    }

    // const {first_name, last_name, mobile, email, gender, dob, address} = props.profile;
     
    return (
        <div>
            <form className="animate__animated animate__fadeIn  mt-3" onSubmit={handleSubmit(onSubmit)}>
                <div className="container w-50 mx-auto">
                    <div className="text-left card shadow">
                        <div className="card-header h3 font-weight-normal font-italic text-center bg-info text-light">New loan</div>
                        <div className ="card-body mt-2">
                            <div className="row">
                                <div className="col">
                                    <div className=" form-group">
                                        <label htmlFor="firstname">Firstname :- </label>
                                        <input type="text" 
                                            className="form-control shadow-sm"  
                                            name="first_name" 
                                            ref={register}                                          
                                            required
                                            placeholder="Enter Firstname"
                                        />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className=" form-group">
                                        <label htmlFor="lastname">Lastname :- </label>
                                        <input type="text" 
                                            className="form-control shadow-sm "  
                                            name="last_name" 
                                            ref={register}                                           
                                            placeholder="Enter Lastname"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-1">
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="mobile">Mobile :- </label>
                                        <input type="text"  
                                            className="form-control shadow-sm"  
                                            name="mobile" 
                                            ref = {register}                                            
                                            placeholder="Enter Mobile"
                                        />
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="email">Email :- </label>
                                        <input type="email"  
                                            className="form-control shadow-sm" 
                                            name="email" 
                                            ref={register}                                         
                                            placeholder="Enter Email"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="address">Address :- </label>
                                <input type="text"  
                                    className="form-control shadow-sm"  
                                    name="address" 
                                    ref = {register}
                                    placeholder="Enter Address"
                                />
                            </div>
                            <div className="row mt-1">
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="gender">Gender :- </label><br/>
                                        <select name="gender"  ref={register} className="form-control">
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group">
                                        <label htmlFor="dob">Date of Birth :- </label>
                                        <input type="date"  
                                            className="form-control shadow-sm" 
                                            name="dob"
                                            ref={register}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mx-auto ">
                            <button className=" btn btn-outline-primary shadow-sm mb-3" >Apply</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>   
    )
}

export default LoanForm;



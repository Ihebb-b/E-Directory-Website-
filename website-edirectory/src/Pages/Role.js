import Footer2 from '../Components/Footer2'
import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginMutation, useRegisterMutation, useUpdateUserMutation } from '../slices/userApiSlice';
import { setCredentials } from '../slices/authSlice';


function Role() {
    const backgroundImage = "url('homepages/restaurant/images/main-1.jpg')";

    const [role, setRole] = useState(null); // To store the selected role
    const [showDetailsForm, setShowDetailsForm] = useState(false); // To toggle the detailed form
    const [localisation, setLocalisation] = useState('');
    const [averageBill, setAverageBill] = useState('');
    const [description, setDescription] = useState('');
    const [diet, setDiet] = useState('');
    const [updateUser] = useUpdateUserMutation();
    const dispatch = useDispatch();
    const [alert, setAlert] = useState({ show: false, type: '', message: '' });
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [showSpinner, setShowSpinner] = useState(false);
    
    
    
    const handleRoleClick = (selectedRole) => {
        setRole(selectedRole);
        setShowDetailsForm(true);

    };


    const handleBackClick = () => {
        setShowDetailsForm(false);
        setRole(null);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImage(file); // Save the file in the component's state
      };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          // Create FormData object
          const formData = new FormData();
          formData.append("role", role);
          formData.append("localisation", localisation);
          formData.append("averageBill", averageBill);
          formData.append("description", description);
          formData.append("diet", diet);
      
          if (image) {
            formData.append("image", image); // Append the image file
          }
      
          console.log("FormData Content:");
          for (let pair of formData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`); // Log FormData key-value pairs for debugging
          }
      
          // Use updateUser mutation with FormData
          const updatedUser = await updateUser(formData).unwrap();
      
          // Update Redux store
          dispatch(setCredentials(updatedUser));
      
          // Success alert
          setAlert({
            show: true,
            type: "success",
            message: "Profile updated successfully!",
          });
      
          // Navigate after delay
          setShowSpinner(true);
          setTimeout(() => navigate("/"), 2000);
          setTimeout(() => setShowSpinner(false), 2000);
        } catch (err) {
          console.error("Failed to update profile:", err);
          setAlert({
            show: true,
            type: "danger",
            message: err?.data?.message || "Profile update failed.",
          });
        }

    };

    return (

        <>
            <header id="header" className="dark" data-fullwidth="true">
                <div className="header-inner">
                    <div className="container">
                        <div id="logo">
                            {/* <NavLink to="/">
                                <span className="logo-default">E-Directory</span>
                                <span className="logo-dark">E-Directory</span>
                            </NavLink> */}

                            <a href='/'>
                                <img
                                    src="images/moremeddietlogo.png"
                                    alt="E-Directory Logo"
                                    style={{
                                        width: "100px",
                                        height: "70px",
                                        marginLeft: "2px",
                                        display: "inline-block"
                                    }}
                                />
                            </a>
                        </div>
                    </div>
                </div>
                {alert.show && (
                    <div className="col-lg-6">
                        <div role="alert" className={`alert alert-${alert.type} alert-dismissible`}>
                            <button type="button" className="btn-close" onClick={() => setAlert({ ...alert, show: false })} aria-label="Close"></button>
                            <strong><i className={`fa ${alert.type === 'success' ? 'fa-check-circle' : 'fa-warning'}`}></i> {alert.type === 'success' ? 'Success!' : 'Error!'}</strong> {alert.message}
                        </div>
                    </div>
                )}
            </header>
            <div className="body-inner">

                <section
                    className="pt-5 pb-5"
                    style={{ backgroundImage: backgroundImage, backgroundSize: 'cover', backgroundPosition: 'center' }}
                >


                    <div className="container-fluid d-flex flex-column">
                        <div className="row align-items-center min-vh-100">
                            <div className="col-md-6 col-lg-4 col-xl-3 mx-auto">
                                <div className="card">
                                    <div className="card-body py-5 px-sm-5">
                                        {!showDetailsForm ? (
                                            <div>
                                                <div className="mb-3 text-center">
                                                    <h6 className="h3 mb-1 ">Help us!</h6>
                                                    <p className="text-muted mb-0">Are you a Restaurant Owner or a Customer?</p>
                                                </div>
                                                <span className="clearfix"></span>
                                                <form className="form-validate">
                                                    <label htmlFor="role" style={{ fontSize: "15px", marginBottom: "10px" }}>
                                                        Choose Your Role
                                                    </label>
                                                    <div className="input-groupe">
                                                        <ul
                                                            className="list-icon list-icon-check list-icon-colored"
                                                            style={{ fontSize: "15px" }}
                                                        >
                                                            <li
                                                                className="text"
                                                                onClick={() => handleRoleClick("restaurant")}
                                                                style={{ cursor: "pointer" }}
                                                            >
                                                                Restaurant
                                                            </li>
                                                            <li
                                                                className="text"
                                                                onClick={() => handleRoleClick("customer")}
                                                                style={{ cursor: "pointer" }}
                                                            >
                                                                Customer
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </form>
                                            </div>
                                        ) : (
                                            <div>
                                                <div className="mb-3 text-center">
                                                    <h6 className="h3 mb-1 ">Welcome!</h6>
                                                    <p className="text-muted mb-0">Feel free to fill complementary informations</p>
                                                </div>
                                                <span className="clearfix"></span>
                                                {role === "restaurant" ? (
                                                    <form
                                                        className={`form-validate details-form ${showDetailsForm ? "animate" : ""
                                                            }`}
                                                        onSubmit={handleSubmit}
                                                    >
                                                        <label htmlFor="local">Restaurant Details</label>


                                                        <div className="form-group">
                                                            <label htmlFor="description" >Description</label>
                                                            <div className="input-group">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    name="description"
                                                                    placeholder="Enter description"
                                                                    value={description}
                                                                    onChange={(e) => setDescription(e.target.value)}
                                                                    required
                                                                />
                                                                <span className="input-group-text"><i className="icon-align-justify"></i></span>
                                                            </div>
                                                        </div>

                                                        <div className="form-group">
                                                            <label htmlFor="image">Image</label>
                                                            <input
                                                                type="file"
                                                                className="form-control"
                                                                id="image"
                                                                accept="image/*"
                                                                onChange={handleFileChange}
                                                                required
                                                            />
                                                        </div>

                                                        <div className="form-group">
                                                            <label htmlFor="localisation">Localisation</label>
                                                            <div className="input-group">
                                                                <select
                                                                    className="form-control"
                                                                    name="localisation"
                                                                    value={localisation}
                                                                    onChange={(e) => setLocalisation(e.target.value)}
                                                                    required
                                                                >
                                                                    <option value="" disabled>
                                                                        Select localisation
                                                                    </option>
                                                                    {["Algeria", "Tunisia", "France", "Italy", "Spain", "Albania", "Herzegovina", "Croatia", "Cyprus", "Greece", "Lebanon", "Syria", "Morocco", "Egypt", "Libya"].map(
                                                                        (location) => (
                                                                            <option key={location} value={location}>
                                                                                {location}
                                                                            </option>
                                                                        )
                                                                    )}
                                                                </select>
                                                                <span className="input-group-text">
                                                                    <i className="icon-map-pin"></i>
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="diet">Diet Type</label>
                                                            <div className="input-group">
                                                                <select
                                                                    className="form-control"
                                                                    name="diet"
                                                                    value={diet}
                                                                    onChange={(e) => setDiet(e.target.value)} // Bind to state
                                                                    required
                                                                >
                                                                    <option value="" disabled>
                                                                        Select diet type
                                                                    </option>
                                                                    {["Vegetarian", "Vegan", "Dairyfree", "Flexterian", "Norestriction"].map((dietOption) => (
                                                                        <option key={dietOption} value={dietOption}>
                                                                            {dietOption}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                                <span className="input-group-text">
                                                                    <i className="icon-tag"></i>
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="averageBill" >Average Bill</label>
                                                            <div className="input-group">
                                                                <input
                                                                    type="number"
                                                                    className="form-control"
                                                                    name="averageBill"
                                                                    placeholder="Enter average bill"
                                                                    value={averageBill}
                                                                    onChange={(e) => setAverageBill(e.target.value)}
                                                                    required
                                                                />
                                                                <span className="input-group-text"><i className="icon-dollar-sign"></i></span>
                                                            </div>
                                                        </div>
                                                        <div className="mt-4">
                                                            <button
                                                                type="submit"
                                                                className="btn btn-primary btn-block btn-primary"
                                                            >
                                                                Submit
                                                            </button>
                                                        </div>
                                                        <div className="mt-4 text-center">
                                                            <a className="text-muted"
                                                                onClick={handleBackClick}
                                                                style={{ cursor: "pointer" }}>
                                                                <i className="icon-arrow-left"></i> Back
                                                            </a>
                                                        </div>
                                                    </form>
                                                ) : (
                                                    <form
                                                        className={`form-validate details-form ${showDetailsForm ? "animate" : ""
                                                            }`}
                                                        onSubmit={handleSubmit}
                                                    >
                                                        <label htmlFor="local">Costumer Details</label>
                                                        <div className="form-group">
                                                            <label htmlFor="diet">Diet Type</label>
                                                            <div className="input-group">
                                                                <select
                                                                    className="form-control"
                                                                    name="diet"
                                                                    value={diet}
                                                                    onChange={(e) => setDiet(e.target.value)} // Bind to state
                                                                    required
                                                                >
                                                                    <option value="" disabled>
                                                                        Select diet type
                                                                    </option>
                                                                    {["Vegetarian", "Vegan", "Pescatarian", "Omnivore", "Carnivore"].map((dietOption) => (
                                                                        <option key={dietOption} value={dietOption}>
                                                                            {dietOption}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                                <span className="input-group-text">
                                                                    <i className="icon-tag"></i>
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="localisation">Localisation</label>
                                                            <div className="input-group">
                                                                <select
                                                                    className="form-control"
                                                                    name="localisation"
                                                                    value={localisation}
                                                                    onChange={(e) => setLocalisation(e.target.value)}
                                                                    required
                                                                >
                                                                    <option value="" disabled>
                                                                        Select localisation
                                                                    </option>
                                                                    {["Algeria", "Tunisia", "France", "Italy", "Spain", "Albania", "Herzegovina", "Croatia", "Cyprus", "Greece", "Lebanon", "Syria", "Morocco", "Egypt", "Libya"].map(
                                                                        (location) => (
                                                                            <option key={location} value={location}>
                                                                                {location}
                                                                            </option>
                                                                        )
                                                                    )}
                                                                </select>
                                                                <span className="input-group-text">
                                                                    <i className="icon-map-pin"></i>
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="mt-4">
                                                            <button
                                                                type="submit"
                                                                className="btn btn-primary btn-block btn-primary"
                                                            >
                                                                Submit
                                                            </button>
                                                        </div>
                                                        <div className="mt-4 text-center">
                                                            <a className="text-muted"
                                                                onClick={handleBackClick}
                                                                style={{ cursor: "pointer" }}>
                                                                <i className="icon-arrow-left"></i> Back
                                                            </a>
                                                        </div>
                                                    </form>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>


        </>

    )
}

export default Role
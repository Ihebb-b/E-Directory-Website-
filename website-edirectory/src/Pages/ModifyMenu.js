import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useModifyMenuMutation, useGetMenuByIdQuery, useGetMenuListQuery } from '../slices/restaurantSlice';

function ModifyMenu() {
    const { id } = useParams(); // Get menu ID from route params
    const navigate = useNavigate();

    const [modifyMenu, { isLoading }] = useModifyMenuMutation();
    const { data: menuData, isLoading: isFetching } = useGetMenuByIdQuery(id);

    const [showSpinner, setShowSpinner] = useState(false);
    const [alert, setAlert] = useState({ show: false, type: '', message: '' });

    const [menuImage, setMenuImage] = useState(null);
    const [menuName, setMenuName] = useState('');
    const [description, setDescription] = useState('');
    const [plates, setPlates] = useState([{ name: '', price: '' }]);
    const [existingImage, setExistingImage] = useState(null);
    const { refetch: refetchMenus} = useGetMenuListQuery();



    // Preload menu data when fetched
    useEffect(() => {
        if (menuData) {
            setMenuName(menuData.name || '');
            setDescription(menuData.description || '');
            setPlates(menuData.plates || [{ name: '', price: '' }]);
            setExistingImage(menuData.image || null);
        }
    }, [menuData]);

    // Handle adding a new plate field
    const handleAddField = () => {
        setPlates([...plates, { name: '', price: '' }]);
    };

    // Handle removing a plate field
    const handleRemoveField = (index) => {
        if (plates.length > 1) {
            setPlates(plates.filter((_, i) => i !== index));
        }
    };

    // Handle changing field values for plates
    const handleFieldChange = (index, field, value) => {
        setPlates(
            plates.map((plate, i) =>
                i === index ? { ...plate, [field]: field === 'price' ? parseFloat(value) || '' : value } : plate
            )
        );
    };

    // Handle image file change
    const handleFileChange = (e) => {
        setMenuImage(e.target.files[0]);
    };

    // Form submission handler
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate inputs
        if (!menuName || !description || !plates || plates.some((plate) => !plate.name || !plate.price)) {
            setAlert({ show: true, type: 'danger', message: 'Please fill out all fields.' });
            return;
        }

        // Prepare form data
        const formData = new FormData();
        formData.append('name', menuName);
        formData.append('description', description);
        formData.append('plates', JSON.stringify(plates)); // Convert plates array to JSON string
        if (menuImage) {
            formData.append('image', menuImage);
        } else {
            formData.append('existingImage', existingImage); // Send existing image path if no new image
        }

        const token = localStorage.getItem('token');

        try {
            // Submit form data
            await modifyMenu({ token, id, formData }).unwrap();
            setAlert({ show: true, type: 'success', message: 'Menu modified successfully!' });
            setShowSpinner(true);

            // Navigate to profile page after success
           
           await refetchMenus();
            setTimeout(() => {
                navigate('/profileR');
            }, 2000);

            setTimeout(() => setShowSpinner(false), 2000);
        } catch (error) {
            console.error('Error modifying menu:', error);
            setAlert({ show: true, type: 'danger', message: error?.data?.message || 'Failed to modify menu.' });
        }
    };

    const handleReturn = () => {
        navigate('/profileR');
    };

    if (isFetching) {
        return <p>Loading...</p>;
    }

    return (
        <div className="body-inner">
            {alert.show && (
                <div className="col-lg-6">
                    <div role="alert" className={`alert alert-${alert.type} alert-dismissible`}>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={() => setAlert({ ...alert, show: false })}
                            aria-label="Close"
                        ></button>
                        <strong>
                            <i className={`fa ${alert.type === 'success' ? 'fa-check-circle' : 'fa-warning'}`}></i>{' '}
                            {alert.type === 'success' ? 'Success!' : 'Error!'}
                        </strong>{' '}
                        {alert.message}
                    </div>
                </div>
            )}
            <div className="container-fluid">
                <div className="row min-vh-100">

                    <div className="col-md-8 col-lg-4 d-flex align-items-center">
                        <button type="button" onClick={handleReturn} className="btn btn-secondary mb-3">
                            <i className="fas fa-arrow-left me-2"></i> Back
                        </button>
                        <div className="w-100 px-3 px-sm-5 py-xl-5 px-xl-7">
                            <h3>Modify Menu</h3>
                            <p>Modify the menu by updating the information below.</p>
                            <form className="mt-5" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        placeholder="Enter the name of the menu"
                                        value={menuName}
                                        onChange={(e) => setMenuName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="description"
                                        placeholder="Enter the description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="image">Image</label>
                                    {/* {existingImage && (
                                        <div>
                                            <img
                                                src={`${process.env.REACT_APP_API_URL}${existingImage}`}
                                                alt="Existing Menu"
                                                style={{ maxWidth: '200px', marginBottom: '10px' }}
                                            />
                                        </div>
                                    )} */}

                                    {existingImage && (
                                        <p className="text-muted">
                                            Current image will be used unless you upload a new one.
                                        </p>
                                    )}
                                    <input
                                        type="file"
                                        className="form-control"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                </div>
                                <label htmlFor="plates">Plates</label>
                                {plates.map((plate, index) => (
                                    <React.Fragment key={index}>
                                        <div className="form-group d-flex align-items-center mb-3">
                                            <div className="col-8 me-4">
                                                <input
                                                    type="text"
                                                    className="form-control me-3"
                                                    placeholder={`Plate ${index + 1} Name`}
                                                    value={plate.name || ''}
                                                    onChange={(e) => handleFieldChange(index, 'name', e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="col-2 row">
                                                <input
                                                    type="number"
                                                    className="form-control me-3"
                                                    placeholder="Price $"
                                                    value={plate.price || ''}
                                                    onChange={(e) => handleFieldChange(index, 'price', e.target.value)}
                                                    required
                                                />

                                            </div>
                                            {plates.length > 1 && (
                                                <i
                                                    className="icon-trash text-danger col-2"
                                                    style={{ cursor: 'pointer' }}
                                                    title="Remove Plate"
                                                    onClick={() => handleRemoveField(index)}
                                                ></i>
                                            )}
                                        </div>
                                    </React.Fragment>
                                ))}
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <i
                                        className="icon-plus-circle text-primary"
                                        style={{
                                            cursor: 'pointer',
                                            fontSize: '2rem',
                                            marginBottom: '10px',
                                        }}
                                        onClick={handleAddField}
                                    ></i>
                                    <div className="mt-4">
                                        <button type="submit" className="btn btn-primary me-2" disabled={isLoading}>
                                            {isLoading ? 'Submitting...' : 'Modify'}
                                        </button>
                                        <button type="button" className="btn btn-secondary" onClick={handleReturn}>
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div
                        className="col-md-4 col-lg-8 d-none d-md-block"
                        style={{
                            backgroundImage: "url('/homepages/restaurant/images/menu2.jpg')",
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                        }}
                    ></div>

                </div>
            </div>
        </div>
    );
}

export default ModifyMenu;

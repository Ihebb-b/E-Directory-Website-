import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetRecipeByIdQuery, useGetRecipeListQuery, useModifyRecipeMutation } from '../slices/recipeSlice';

function ModifyRecipe() {
    const { id } = useParams(); // Get recipe ID from route params
    const navigate = useNavigate();

    const [modifyRecipe, { isLoading }] = useModifyRecipeMutation();
    const { data: recipeData, isLoading: isFetching } = useGetRecipeByIdQuery(id);

    const [recipeName, setRecipeName] = useState('');
    const [recipeImage, setRecipeImage] = useState(null);
    const [existingImage, setExistingImage] = useState('');
    const [recipeIngredients, setRecipeIngredients] = useState([]);
    const [recipeInstructions, setRecipeInstructions] = useState([]);
    const [alert, setAlert] = useState({ show: false, type: '', message: '' });
    const { refetch: refetchRecipes } = useGetRecipeListQuery();


    useEffect(() => {
        if (recipeData) {
            setRecipeName(recipeData.name);
            setExistingImage(recipeData.image);
            setRecipeIngredients(recipeData.ingredients || []);
            setRecipeInstructions(recipeData.instructions || []);
        }
    }, [recipeData]);

    const handleFileChange = (e) => {
        setRecipeImage(e.target.files[0]);
    };

    const handleIngredientChange = (index, value) => {
        const updatedIngredients = [...recipeIngredients];
        updatedIngredients[index] = value;
        setRecipeIngredients(updatedIngredients);
    };

    const handleInstructionChange = (index, value) => {
        const updatedInstructions = [...recipeInstructions];
        updatedInstructions[index] = value;
        setRecipeInstructions(updatedInstructions);
    };

    const handleAddIngredient = () => {
        setRecipeIngredients([...recipeIngredients, '']);
    };

    const handleAddInstruction = () => {
        setRecipeInstructions([...recipeInstructions, '']);
    };

    const handleRemoveIngredient = (index) => {
        const updatedIngredients = recipeIngredients.filter((_, i) => i !== index);
        setRecipeIngredients(updatedIngredients);
    };

    const handleRemoveInstruction = (index) => {
        const updatedInstructions = recipeInstructions.filter((_, i) => i !== index);
        setRecipeInstructions(updatedInstructions);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!recipeName || recipeIngredients.some((ing) => !ing) || recipeInstructions.some((inst) => !inst)) {
            setAlert({ show: true, type: 'danger', message: 'Please fill out all fields.' });
            return;
        }

        const formData = new FormData();
        formData.append('name', recipeName);
        if (recipeImage) formData.append('image', recipeImage);
        formData.append('ingredients', JSON.stringify(recipeIngredients));
        formData.append('instructions', JSON.stringify(recipeInstructions));

        const token = localStorage.getItem('token');

        try {
            await modifyRecipe({ id, token, formData }).unwrap();
            setAlert({ show: true, type: 'success', message: 'Recipe modified successfully!' });
           
           
            await refetchRecipes();

            setTimeout(() => navigate('/profileR'), 2000);
        } catch (error) {
            console.error('Error modifying recipe:', error);
            setAlert({
                show: true,
                type: 'danger',
                message: error?.data?.message || 'Failed to modify recipe.',
            });
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
                <div className="alert-container">
                    <div className={`alert alert-${alert.type} alert-dismissible`} role="alert">
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
                            <h3>Modify Recipe</h3>
                            <p>Update the recipe information below.</p>
                            <form className="form-validate mt-5" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        placeholder="Enter the name of the recipe"
                                        value={recipeName}
                                        onChange={(e) => setRecipeName(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="image">Image</label>
                                    {existingImage && (
                                        <p className="text-muted">
                                            Current image will be used unless you upload a new one.
                                        </p>
                                    )}
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="image"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                </div>

                                <h5>Ingredients</h5>
                                {recipeIngredients.map((ingredient, index) => (
                                    <div key={index} className="form-group d-flex align-items-center">
                                        <input
                                            type="text"
                                            className="form-control me-2"
                                            placeholder={`Ingredient ${index + 1}`}
                                            value={ingredient}
                                            onChange={(e) => handleIngredientChange(index, e.target.value)}
                                            required
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-danger"
                                            onClick={() => handleRemoveIngredient(index)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                                <button type="button" className="btn btn-primary mt-3" onClick={handleAddIngredient}>
                                    Add Ingredient
                                </button>

                                <h5>Instructions</h5>
                                {recipeInstructions.map((instruction, index) => (
                                    <div key={index} className="form-group d-flex align-items-center">
                                        <input
                                            type="text"
                                            className="form-control me-2"
                                            placeholder={`Instruction ${index + 1}`}
                                            value={instruction}
                                            onChange={(e) => handleInstructionChange(index, e.target.value)}
                                            required
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-danger"
                                            onClick={() => handleRemoveInstruction(index)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                                <button type="button" className="btn btn-primary mt-3" onClick={handleAddInstruction}>
                                    Add Instruction
                                </button>

                                <div className="mt-4">
                                    <button type="submit" className="btn btn-primary me-2" disabled={isLoading}>
                                        {isLoading ? 'Submitting...' : 'Submit'}
                                    </button>
                                    <button type="button" className="btn btn-secondary" onClick={handleReturn}>
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div
                        className="col-md-4 col-lg-8 d-none d-md-block bg-cover"
                        style={{
                            backgroundImage: "url('/homepages/restaurant/images/recipe.jpg')",
                            backgroundPosition: 'center center',
                            backgroundSize: 'cover',
                        }}
                    ></div>
                </div>
            </div>
        </div>
    );
}

export default ModifyRecipe;

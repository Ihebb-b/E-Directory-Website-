import React, { useState } from 'react';
import { useAddRecipeMutation } from '../slices/recipeSlice';

function RecipeForm() {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [ingredients, setIngredients] = useState(['']);
  const [instructions, setInstructions] = useState(['']);

  const [addRecipe] = useAddRecipeMutation();

  const handleAddIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const handleAddInstruction = () => {
    setInstructions([...instructions, '']);
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', image);
    formData.append('ingredients', JSON.stringify(ingredients));
    formData.append('instructions', JSON.stringify(instructions));

    try {
      await addRecipe(formData).unwrap();
      alert('Recipe added successfully!');
    } catch (error) {
      console.error('Failed to add recipe:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Recipe Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Image:</label>
        <input type="file" accept="image/*" onChange={handleFileChange} required />
      </div>
      <div>
        <label>Ingredients:</label>
        {ingredients.map((ingredient, index) => (
          <div key={index}>
            <input
              type="text"
              value={ingredient}
              onChange={(e) =>
                setIngredients(ingredients.map((ing, i) => (i === index ? e.target.value : ing)))
              }
              required
            />
          </div>
        ))}
        <button type="button" onClick={handleAddIngredient}>
          + Add Ingredient
        </button>
      </div>
      <div>
        <label>Instructions:</label>
        {instructions.map((instruction, index) => (
          <div key={index}>
            <input
              type="text"
              value={instruction}
              onChange={(e) =>
                setInstructions(instructions.map((inst, i) => (i === index ? e.target.value : inst)))
              }
              required
            />
          </div>
        ))}
        <button type="button" onClick={handleAddInstruction}>
          + Add Instruction
        </button>
      </div>
      <button type="submit">Submit Recipe</button>
    </form>
  );
}

export default RecipeForm;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Plate schema
const plateSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Plate name is required'], // Add custom error message
        trim: true, // Removes leading/trailing whitespaces
    },
    price: {
        type: Number,
        required: [true, 'Plate price is required'], // Add custom error message
    }
});

// Define the Menu schema
const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Menu name is required'], // Add custom error message
        trim: true, // Removes leading/trailing whitespaces
    },
    description: {
        type: String,
        required: [true, 'Menu description is required'], // Add custom error message
        trim: true, // Removes leading/trailing whitespaces
    },
    image: {
        type: String,
        required: [true, 'Image is required'], // Add custom error message
    },
    plates: {
        type: [plateSchema], // Array of plates
        validate: {
            validator: function (val) {
                return val && val.length > 0;

            },
                                
            message: 'Menu must include at least one plate.',
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: [true, 'User is required'], // Add custom error message
    },
}, {
    timestamps: true, // Automatically add createdAt and updatedAt fields
});

// Create the Menu model
const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;

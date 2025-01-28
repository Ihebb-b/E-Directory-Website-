const mongoose = require('mongoose');
const bycrypt = require('bcryptjs');

const Schema = mongoose.Schema;


const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["restaurant", "customer", "admin"],
  },

  localisation: {
    type: String, 
    enum: ["Algeria", "Tunisia", "France", "Italy", "Spain", "Albania", "Herzegovina", "Croatia", "Cyprus", "Greece", "Lebanon", "Syria", "Morocco", "Egypt", "Libya", "Palestine"   ]
  },
  averageBill: {
    type: Number,
    default: 0,
  },

  description: {
    type: String,
  },
  diet:[{
    type: String,
    enum: [
      "Vegetarian",
       "Vegan", 
       "Dairyfree", 
       "Flexterian",
       "Norestriction"],
  }],

  image: { 
    type: String, 
    },

  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
}, {
  timestamps: true,
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
    const salt = await bycrypt.genSalt(10);
    this.password = await bycrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bycrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);

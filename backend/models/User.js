const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true,
    minlength: 8,
    validate: {
      validator: function(value) {
        // checking for at least one numeric value and one special char
        return /(?=.*[0-9])(?=.*[!@#$%^&*])/.test(value);
      },
      message: props => `${props.value} is not a valid password! It must include at least one number and one special character.`
    }
   } // Store hashed password
});

module.exports = mongoose.model("User", userSchema);

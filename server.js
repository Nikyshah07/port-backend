const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require("dotenv").config()
const app = express();


// Connect to MongoDB
// mongoose.connect(`${process.env.URI}`, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

try{
  const response= mongoose.connect(`${process.env.URI}`,{ useNewUrlParser: true, useUnifiedTopology: true })
  if(response)
  {
      console.log("Connected to DB")
  }
}
 catch(error){
      console.log(error)
  }

// Create a Mongoose schema and model for the contact form data
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});
const Contact = mongoose.model('msg', contactSchema);

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route to handle form submission
app.post('/submit-contact', async (req, res) => {
  const { name, email, message } = req.body;
  const newContact = new Contact({ name, email, message });

  try {
    await newContact.save();
    res.status(200).send('Contact form data saved successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving contact form data');
  }
});

app.get("/",(req,res) =>{
  res.send("hello");
})
app.listen(`${process.env.PORT}`, () => {
  console.log(`Server is running on port `);
});
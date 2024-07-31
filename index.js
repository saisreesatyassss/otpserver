

// // const express = require('express');
// // const app = express();
// // const bodyParser = require('body-parser');
// // const { v4: uuidv4 } = require('uuid');
// // const cors = require('cors'); // Import CORS middleware

// // app.use(bodyParser.json());
// // app.use(cors()); // Enable CORS for all routes

// // let userDatabase = {}; // Simple in-memory database

// // // Endpoint to generate unique ID
// // app.post('/generate-id', (req, res) => {
// //   const phoneNumber = req.body.phoneNumber;

// //   if (!phoneNumber) {
// //     return res.status(400).json({ status: 'error', message: 'Phone number is required' });
// //   }

// //   const uniqueId = uuidv4();

// //   // Store uniqueId with phoneNumber
// //   userDatabase[phoneNumber] = { uniqueId, verified: false };

// //   // Send the unique ID back to the client
// //   console.log(`Generated ID for ${phoneNumber}: ${uniqueId}`);
// //   res.json({ uniqueId });
// // });

// // // Endpoint to verify unique ID
// // app.post('/verify-id', (req, res) => {
// //   const { phoneNumber, uniqueId } = req.body;

// //   if (!phoneNumber || !uniqueId) {
// //     return res.status(400).json({ status: 'error', message: 'Phone number and unique ID are required' });
// //   }

// //   if (userDatabase[phoneNumber] && userDatabase[phoneNumber].uniqueId === uniqueId) {
// //     userDatabase[phoneNumber].verified = true;
// //     res.json({ status: 'success', message: 'User verified' });
// //   } else {
// //     res.status(400).json({ status: 'error', message: 'Invalid ID or phone number' });
// //   }
// // });

// // app.listen(3000, () => {
// //   console.log('Server is running on port 3000');
// // });


// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// const { v4: uuidv4 } = require('uuid');
// const cors = require('cors');
// const mongoose = require('mongoose');

// // MongoDB Atlas connection string
// const mongoURI = 'mongodb+srv://saisreesatyassss:saisreesatyassss@cluster0.vsvcwri.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// // Connect to MongoDB Atlas
// mongoose.connect(mongoURI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log('Connected to MongoDB Atlas'))
// .catch(err => console.error('Failed to connect to MongoDB Atlas', err));

// // Define a schema and model
// const userSchema = new mongoose.Schema({
//   phoneNumber: { type: String, unique: true, required: true },
//   uniqueId: { type: String, required: true },
//   verified: { type: Boolean, default: false }
// });

// const User = mongoose.model('User', userSchema);

// const smsSchema = new mongoose.Schema({
//   sender: { type: String, required: true },
//   message: { type: String, required: true },
//   timeReceived: { type: Date, required: true }
// });

// const SMS = mongoose.model('SMS', smsSchema);



// app.use(bodyParser.json());
// app.use(cors());

// // Endpoint to receive SMS messages
// app.post('/receive-sms', async (req, res) => {
//   const { sender, message, timeReceived } = req.body;

//   if (!sender || !message || !timeReceived) {
//     return res.status(400).json({ status: 'error', message: 'Sender, message, and time received are required' });
//   }

//   try {
//     const sms = new SMS({
//       sender,
//       message,
//       timeReceived: new Date(timeReceived)
//     });
//     await sms.save();
//     console.log(`SMS received from ${sender}: ${message}`);
//     res.json({ status: 'success', message: 'SMS received and stored' });
//   } catch (err) {
//     res.status(500).json({ status: 'error', message: 'Failed to store SMS' });
//   }
// });





// // Endpoint to generate unique ID
// app.post('/generate-id', async (req, res) => {
//   const phoneNumber = req.body.phoneNumber;

//   if (!phoneNumber) {
//     return res.status(400).json({ status: 'error', message: 'Phone number is required' });
//   }

//   const uniqueId = uuidv4();

//   try {
//     // Store uniqueId with phoneNumber
//     const user = new User({ phoneNumber, uniqueId });
//     await user.save();
//     console.log(`Generated ID for ${phoneNumber}: ${uniqueId}`);
//     res.json({ uniqueId });
//   } catch (err) {
//     res.status(500).json({ status: 'error', message: 'Failed to generate ID' });
//   }
// });

// // Endpoint to verify unique ID
// app.post('/verify-id', async (req, res) => {
//   const { phoneNumber, uniqueId } = req.body;

//   if (!phoneNumber || !uniqueId) {
//     return res.status(400).json({ status: 'error', message: 'Phone number and unique ID are required' });
//   }

//   try {
//     const user = await User.findOne({ phoneNumber, uniqueId });

//     if (user) {
//       user.verified = true;
//       await user.save();
//       res.json({ status: 'success', message: 'User verified' });
//     } else {
//       res.status(400).json({ status: 'error', message: 'Invalid ID or phone number' });
//     }
//   } catch (err) {
//     res.status(500).json({ status: 'error', message: 'Failed to verify ID' });
//   }
// });

// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });


const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');
const mongoose = require('mongoose');

// MongoDB Atlas connection string
const mongoURI = 'mongodb+srv://saisreesatyassss:saisreesatyassss@cluster0.vsvcwri.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB Atlas
mongoose.connect(mongoURI)
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('Failed to connect to MongoDB Atlas', err));

// Define a schema and model for users
const userSchema = new mongoose.Schema({
  phoneNumber: { type: String, unique: true, required: true },
  uniqueId: { type: String, required: true },
  verified: { type: Boolean, default: false }
});

const User = mongoose.model('User', userSchema);

// Define a schema and model for SMS messages
const smsSchema = new mongoose.Schema({
  sender: { type: String, required: true },
  message: { type: String, required: true },
  timeReceived: { type: Date, required: true }
});

const SMS = mongoose.model('SMS', smsSchema);

app.use(bodyParser.json());
app.use(cors());

// Endpoint to generate unique ID
app.post('/generate-id', async (req, res) => {
  const phoneNumber = req.body.phoneNumber;

  if (!phoneNumber) {
    return res.status(400).json({ status: 'error', message: 'Phone number is required' });
  }

  const uniqueId = uuidv4();

  try {
    const user = new User({ phoneNumber, uniqueId });
    await user.save();
    console.log(`Generated ID for ${phoneNumber}: ${uniqueId}`);
    res.json({ uniqueId });
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Failed to generate ID' });
  }
});

// Endpoint to receive SMS messages
app.post('/receive-sms', async (req, res) => {
  const { sender, message, timeReceived } = req.body;

  if (!sender || !message || !timeReceived) {
    return res.status(400).json({ status: 'error', message: 'Sender, message, and time received are required' });
  }

  try {
    // Save the SMS message
    const sms = new SMS({
      sender,
      message,
      timeReceived: new Date(timeReceived)
    });
    await sms.save();
    console.log(`SMS received from ${sender}: ${message}`);

    // Check if the sender's phone number and the message match a user
    const user = await User.findOne({ phoneNumber: sender });

    if (user && user.uniqueId === message.trim()) {
      user.verified = true;
      await user.save();
      console.log(`User ${sender} verified with ID ${message.trim()}`);
      return res.json({ status: 'success', message: 'User verified' });
    } else {
      console.log(`Verification failed for ${sender}. ID or message does not match.`);
      return res.json({ status: 'error', message: 'Verification failed' });
    }
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Failed to store SMS or verify user' });
  }
});

// Start server on port 3001
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});

const express = require('express');
const mongoose = require('mongoose');
const choreRoute = require("./routes/chore.route.js");
const userRoute = require("./routes/user.route.js");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
require('dotenv').config();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const allowedOrigins = [
  'http://localhost:3000',
  'https://do-it-frontend.netlify.app',
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));


//routes
app.use("/api/chores", choreRoute);
app.use("/api/users", userRoute);

app.get('/', (req, res) => {
    res.send("Hello fron Node API Server Updated");
});

mongoose.connect('mongodb+srv://mastipatel:pVFZ87TwoDqbLLIa@cluster0.mkdb5nx.mongodb.net/do-it')
  .then(() => {
    console.log('Connected to database!');
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
})
  .catch((e) => {
    console.log('Connection fail'+ e);
  })  



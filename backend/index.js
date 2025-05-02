const express = require('express');
const mongoose = require('mongoose');
const chore = require('./models/chores.js');
const user = require('./models/users.js');
const choreRoute = require("./routes/chore.route.js");
const userRoute = require("./routes/user.route.js")
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//routes
app.use("/api/chores", choreRoute);
app.use("/api/users", userRoute);

app.get('/', (req, res) => {
    res.send("Hello fron Node API Server Updated");
});

mongoose.connect('mongodb+srv://mastipatel:ahopFZGP58nfJAtG@cluster0.mkdb5nx.mongodb.net/do-it')
  .then(() => {
    console.log('Connected to database!');
    app.listen(3000, () => {
        console.log('Server is running on port 3000')
    });
})
  .catch((e) => {
    console.log('Connection fail'+encodeURI);
  })  

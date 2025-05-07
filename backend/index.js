const express = require('express');
const mongoose = require('mongoose');
const choreRoute = require("./routes/chore.route.js");
const userRoute = require("./routes/user.route.js");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

//routes
app.use("/api/chores", choreRoute);
app.use("/api/users", userRoute);

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send("Hello fron Node API Server Updated");
});

mongoose.connect('mongodb+srv://mastipatel:pVFZ87TwoDqbLLIa@cluster0.mkdb5nx.mongodb.net/do-it')
  .then(() => {
    console.log('Connected to database!');
    app.listen(4000, () => {
        console.log('Server is running on port 4000')
    });
})
  .catch((e) => {
    console.log('Connection fail'+encodeURI);
  })  



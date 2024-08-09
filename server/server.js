require("dotenv").config();
const express = require("express");
const multer = require('multer');
const cors = require("cors");

const app = express();
var corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:4173"
  ],
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// Connection to the database
const db = require("./models");
const Role = db.role;
const User = db.user;

// WARNING!!! THIS IS JUST FOR DEVELOPMENT PURPOSES. IT WILL DROP THE DATABASE
// db.sequelize.sync({force: true}).then(() =>{
//     console.log("Drop and resync DB")
//     initial();
// })
// var bcrypt = require("bcryptjs");
// function initial () {
//   Role.bulkCreate([
//     { id: 1, name: "user" },
//     { id: 2, name: "manager" },
//     { id: 3, name: "admin" }
//   ]).then(() => {
//     // Create a user
//     User.create({
//       username: "realmranshuman",
//       email: "buddhabhog@gmail.com",
//       password: bcrypt.hashSync("Railtel@Main98", 8)
//     }).then(user => {
//       user.setRoles([1, 2, 3]);
//     });
//   });
// }
// END OF WARNING!!!
// IN PRODUCTION, JUST UNCOMMENT THE FOLLOWING COMMENT AFTER CREATING THE DATABASE AND TABLES
db.sequelize.sync();

// routes
require("./routes/auth.routes")(app);
require("./routes/event.routes")(app);
require("./routes/ticketType.routes")(app);
require("./routes/ticketSale.routes")(app);
require("./routes/task.routes")(app);
require('./routes/upload.routes')(app);
require("./routes/user.routes")(app);
require("./routes/manager.routes")(app);

app.get("/home", (req, res) => {
  res.json({ message: "WELCOME TO AQUAPONICS!!!" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

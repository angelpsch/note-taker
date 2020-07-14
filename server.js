const express = require("express");
// const path = require('path');
// const fs = require('fs'); 

const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");


const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));

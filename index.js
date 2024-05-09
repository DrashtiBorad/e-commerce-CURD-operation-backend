require("./connection/config");
const express = require("express");
const cors = require("cors");
const router = require("./api/api.routes");
const app = express();
app.use(express.json());
app.use(cors());
app.use(router);

// app.post("/upload", uploadFile, (req, res) => {
//   res.send("asdas");
// });

app.listen(5000, () => console.log("server start with port 5000"));

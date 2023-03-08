const express = require("express");
const fileUpload = require("./api/fileUpload")
require("dotenv").config({ path: "./config.env" });
require("./database/connections").default;
const cors = require("cors");

const app = express();
var corsOptions = {
  origin: "http://localhost:3000",
};
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/upload", fileUpload)
app.get("/", (req, res) => {
    res.json({ msg: "some message" });
  });

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
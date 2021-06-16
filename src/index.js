const express = require("express");
const routes = require ("./routes")
const cors = require("cors");
const {config} = require("dotenv");
const { connectDatabase } = require("./models");
config();
const app = express();
connectDatabase();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
    res.send("ok")
});
app.use("/api/v1", routes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`);
})
module.exports = app;

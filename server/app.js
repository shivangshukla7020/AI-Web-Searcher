const express = require("express");
const cors = require("cors");
require("dotenv").config();

const searchRoutes = require("./routes/searchRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/search", searchRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

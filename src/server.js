require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;
const fs = require("fs");

if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// Connect DB first
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
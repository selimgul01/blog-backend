const express = require("express");
const dotenv = require("dotenv")
const cors = require("cors")
const mongoose = require("mongoose")
const path = require("path");
dotenv.config()
const app = express()

const postRouter = require("./routes/postRoutes")
const authRouter = require("./routes/authRoutes")

const PORT = process.env.PORT || 5000

const allowedOrigins = [
  "https://block-frontend-zeta.vercel.app",
  "https://block-frontend-kb5gfzsgv-selims-projects-c3c368e9.vercel.app",
  // başka domainler varsa ekle
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // Postman gibi araçlar için izin ver
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `CORS policy: ${origin} not allowed`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
}));


app.use(express.json())

app.use("/post",postRouter) 
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use("/auth",authRouter)

app.get("/", (req, res) => {
  res.send("API is working 🚀");
});

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database Connected")
    } catch (error) {
        console.log(error)
    }
    }


connectDB()

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))

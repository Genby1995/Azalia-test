import express from "express";
import errorMiddleware from "./middlewares/error_middleware.js";
import router from "./router.js";
import cors from "cors";


const PORT = 5000;

const app = express()

//middleware
app.use(express.json())
app.use(cors({ origin: "*" }))
app.use("/api", router);
app.use(errorMiddleware);


app.post("/", (req, res) => {
    console.log(req.body);
    res.status(200).json("Server is started 11")
})
app.listen(PORT, () => {
    console.log("SERVER IS STARTED ON PORT " + PORT)
})
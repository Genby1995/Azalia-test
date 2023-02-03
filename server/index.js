import express from "express"
import repository from "./datastore/repository.js";
import router from "./router.js";


const PORT = 5000;

const app = express()

//middleware
app.use(express.json())
app.use("/api", router);


app.post("/", (req, res) => {
    console.log(req.body);
    res.status(200).json("Server is started 11")
})
app.listen(PORT, () => {
    console.log("SERVER IS STARTED ON PORT " + PORT)
})
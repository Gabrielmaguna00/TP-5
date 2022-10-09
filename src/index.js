import express, { application } from "express"
import morgan from "morgan"
import path from "path"
import * as url from "url"
import mailRoute from "./routes/mail.js"

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

const app = express()

app.use(express.static(path.join(__dirname + "public")))
app.use(express.json())
app.use(morgan("dev"))

app.use("/mail", mailRoute)
app.get("/home", (req, res) => { res.send("Home") })

app.use("*", (req, res) => {
    res.redirect("/home")
})

app.listen(3000, () => {
    console.log("server on port 3000")
})

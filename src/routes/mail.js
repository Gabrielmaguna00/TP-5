import {Router} from "express"
import { sendMail } from "../utils/mail.js"
import fs from "fs"

const router = Router()

router
    .get("/", (req, res) => {
        const data = fs.readFileSync("mail.json", "utf-8")
        res.json(JSON.parse(data))
    })

    .post("/", async (req, res) => {
        const mail = req.body
        const { from, to, subject, text, html } = mail

        if(!from || !to || !subject || !text || !html) {
            return res.status(400).send("Faltan datos")
        }

        const sentMail = await sendMail({ from, to, subject, text, html })

        if(sentMail) {
            if(fs.existsSync("mail.json")) {
                const mails = JSON.parse(fs.readFileSync("mail.json", "utf-8"))
                mails.push(sentMail)
                fs.writeFileSync("mail.json", JSON.stringify(mails))
            } else {
                fs.writeFileSync("mail.json", JSON.stringify([sentMail]))
            }
        }

        res.status(201).send("Mail enviado exitosamente!")
    })

export default router
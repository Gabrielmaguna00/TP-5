import nodemailer from "nodemailer"

const user = await nodemailer.createTestAccount()

const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: user.user,
      pass: user.pass
    }
})

export const sendMail = async (mail) => {
    const sentMail = await transporter.sendMail(mail)

    console.log(`Message sent:${sentMail.messageId}`)
    console.log(`Preview URL:${nodemailer.getTestMessageUrl(sentMail)}`)

    return sentMail
}
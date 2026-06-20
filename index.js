const express = require("express");
const path = require("path");
const hbs = require("hbs");
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// view engine setup
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// static files (optional but recommended)
app.use(express.static(path.join(__dirname, "public")));

// home route
app.get("/", (req, res) => {
  res.render("main");
});
const multer = require("multer");

const upload = multer({
    dest: "uploads/"
});
const nodemailer = require("nodemailer");

app.post("/contact", upload.single("image"), async (req, res) => {

    const {
        name,
        email,
        service,
        description
    } = req.body;

    try {

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "glibinff@gmail.com",
                pass: "wovs vjzh ttqo axmr"
            }
        });

        await transporter.sendMail({
            from: email,
            to: "glibinff@gmail.com",
            subject: `New ORIXO Project Request - ${service}`,
            html: `
                <h2>New Project Submission</h2>

                <p><strong>Name:</strong> ${name}</p>

                <p><strong>Email:</strong> ${email}</p>

                <p><strong>Service:</strong> ${service}</p>

                <p><strong>Description:</strong></p>

                <p>${description}</p>
            `,
            attachments: req.file ? [
                {
                    filename: req.file.originalname,
                    path: req.file.path
                }
            ] : []
        });

        res.send("Project submitted successfully");

    } catch (err) {
        console.error(err);
        res.status(500).send("Failed to send email");
    }
});
// start server
app.listen(8000, () => {
  console.log("Server running on port 8000");
});

const express = require('express')
var nodemailer = require('nodemailer');
var cors = require('cors');
const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'medilyze.sup@gmail.com',
        pass: '********'
    }
});

app.post('/mail', (req, res) => {
    if (req.body == null) {
        const msg = 'No email received';
        console.error(`error: ${msg}`);
        res.status(400).send(`Bad Request: ${msg}`);
        return;
    }
    if (req.body.message == null || req.body.subject == null || req.body.email == null) {
        const msg = 'Invalid email format';
        console.error(`error: ${msg}`);
        res.status(400).send(`Bad Request: ${msg}`);
        return;
    }
    else {
        console.log(req);
        console.log(req.body.message);
        console.log(req.body.subject);
        var mailOptions = {
            from: 'medilyze.reg@gmail.com',
            to: req.body.email,
            subject: req.body.subject,
            text: req.body.message
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error)
                res.status(400).send(error)
            } else {
                console.log('Email sent: ' + info.response);
                res.status(200).send('Email sent: ' + info.response)

            }
        });

    }

});
const port = process.env.PORT || 8080;
app.listen(port, () => console.log('Application listening on port ', port))

// using sendGrid for sending emails
const dotenv = require("dotenv");
dotenv.config();

const nodemailer = require("nodemailer");
const secretKey = process.env.NODEMAILER_SECRET_KEY;
const myEmailId = process.env.MAIL_ID;

const emailOperations = require("./src/services/emailOperations.js");
const wrapper = require("./src/utils/emailSenderWrapper_GISJobs.js");

const { finalEmailArray, attachmentPdf, htmlTemplate } = wrapper();

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: myEmailId,
		pass: secretKey,
	},
});

const mailOptions = {
	from: myEmailId,
	bcc: finalEmailArray,

	subject:
		"Application: Software Engineer — GIS Developer  | Ramesh Vairagar",
	html: htmlTemplate,

	attachments: [
		{
			filename: "Ramesh_Vairagar_GIS_Developer_2_Years.pdf",
			content: attachmentPdf,
			encoding: "base64",
		},
	],
};

transporter.sendMail(mailOptions, function (error, info) {
	if (error) {
		console.log("Error occurred:", error);
	} else {
		console.log("Email sent:", info.response);
		emailOperations.handleDeleteOldEmails(finalEmailArray);
	}
});

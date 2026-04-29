// using sendGrid for sending emails
const dotenv = require("dotenv");
dotenv.config();

const nodemailer = require("nodemailer");
const secretKey = process.env.NODEMAILER_SECRET_KEY;
const myEmailId = process.env.MAIL_ID;

const emailOperations = require("./src/services/emailOperations");
const wrapper = require("./src/utils/emailSenderWrapper.js");

const { finalEmailArray, attachmentPdf, htmlTemplate } = wrapper();

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: myEmailId,
		pass: secretKey,
	},
});

(async function sendAllTogether() {
	const mailOptions = {
		from: myEmailId,
		bcc: finalEmailArray,

		subject:
			"Application: Software Engineer — .NET Backend Developer 3 Years | Ramesh Vairagar",
		html: htmlTemplate,

		attachments: [
			{
				filename: "Ramesh_Vairagar_DotNet.pdf",
				content: attachmentPdf,
				encoding: "base64",
			},
		],
	};

	try {
		const info = await transporter.sendMail(mailOptions);
		console.log(`Email sent to ${finalEmailArray.length} recipients:`, info.response);
		emailOperations.handleDeleteOldEmails(finalEmailArray);
	} catch (error) {
		console.log(`Error occurred:`, error);
	}
})();

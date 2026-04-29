// using sendGrid for sending emails
const dotenv = require("dotenv");
dotenv.config();

const wrapper = require("./src/utils/emailSenderWrapper.js");
const emailOperations = require("./src/services/emailOperations");

const sgMail = require("@sendgrid/mail");
// Setting API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const { finalEmailArray, attachmentPdf, htmlTemplate } = wrapper();

// Email sending function
const sendEmails = async () => {
	const emails = finalEmailArray.map((email) => ({
		from: "aadityabuchale15@gmail.com",
		to: email,
		subject:
			"Experienced Full-Stack Developer (React & NodeJs) – Available Immediately",
		html: htmlTemplate,

		attachments: [
			{
				content: attachmentPdf,
				filename: "Aaditya_Software_1+yrs.pdf",
				type: "application/pdf",
				disposition: "attachment",
			},
		],
	}));

	try {
		await sgMail.send(emails);
		console.log("Emails sent successfully!");
		emailOperations.handleDeleteOldEmails(finalEmailArray);
	} catch (error) {
		console.log("Error occurred:", error);
	}
};

sendEmails();

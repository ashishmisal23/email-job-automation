const fs = require("fs");
const emailOperations = require("../services/emailOperations");
const segregator = require("./emailsSegragator");
const removeDuplicates = require("./removeDuplicateEmails");

function wrapper() {
	//reading html template
	const htmlTemplate = fs.readFileSync("./ui/template_gis.html", "utf8");
	const attachmentPdf = fs
			.readFileSync("./assets/Ramesh_Vairagar_GIS_DotNet_Engineer.pdf")
		.toString("base64");

	const allEmailArray = emailOperations.getToSendEmails();
	const sentEmailsArray = emailOperations.flattenEmailsData();

	const segregatedEmails = segregator(allEmailArray, sentEmailsArray);
	const finalEmailArray = removeDuplicates(segregatedEmails);

	console.log("emails of recipients", finalEmailArray);
	console.log("initial count", allEmailArray.length);
	console.log("no. of recipients", finalEmailArray.length);

	return { finalEmailArray, attachmentPdf, htmlTemplate };
}

module.exports = wrapper;

const email = require("../dao/email");

function getSentEmails() {
	return email.getSentEmails();
}

function getToSendEmails() {
	return email.getToSendEmails();
}

function getOldEmails() {
	return email.getOldEmails();
}

function saveOldEmails(oldEmailsData) {
	email.saveOldEmails(oldEmailsData);
}

function saveSentEmails(sentEmailsData) {
	email.saveSentEmails(sentEmailsData);
}

function isDatePassed(date) {
	return email.isDatePassed(date);
}

function addNewEmailsList(newEmails) {
	const todayDateString = new Date().toJSON().slice(0, 10);
	const emailsData = getSentEmails();
	const todaysData = emailsData[todayDateString] || [];

	emailsData[todayDateString] = todaysData.concat(newEmails);
	saveSentEmails(emailsData);

	console.log("Emails saved successfully");
}

function removeOldSentEmails() {
	const emailsData = getSentEmails();
	let deletedDates = "";
	const allDeletedEmails = [];
	for (let date in emailsData) {
		if (isDatePassed(date)) {
			deletedDates = deletedDates + " " + date;
			allDeletedEmails.push({ [date]: emailsData[date] });
			delete emailsData[date];
		}
	}
	saveSentEmails(emailsData);
	saveOldEmails(allDeletedEmails);

	console.log("This Dates Deleted : ", deletedDates);
}

function flattenEmailsData() {
	return Object.values(getSentEmails()).flat();
}

function handleDeleteOldEmails(finalEmailArray) {
	removeOldSentEmails();
	addNewEmailsList(finalEmailArray);
}

module.exports = {
	getSentEmails,
	getToSendEmails,
	addNewEmailsList,
	removeOldSentEmails,
	flattenEmailsData,
	handleDeleteOldEmails,
};

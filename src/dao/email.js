const fs = require("fs");
const path = require("path");

const dbDir = "./src/data/";
const sentEmailsFilePath = path.join(dbDir, "sentEmailsData.json");
const allowedDaysDifference = 5;

function getSentEmails() {
	try {
		const data = fs.readFileSync(sentEmailsFilePath, "utf8");
		return JSON.parse(data);
	} catch (err) {
		console.log(err);
	}

	return {};
}

function getToSendEmails() {
	try {
		const data = fs.readFileSync(
			path.join(dbDir, "toSendEmailsData.json"),
			"utf8"
		);
		return JSON.parse(data);
	} catch (err) {
		console.log(err);
	}

	return [];
}

function getOldEmails() {
	try {
		const data = fs.readFileSync(
			path.join(dbDir, "oldEmailsData.json"),
			"utf8"
		);
		return JSON.parse(data);
	} catch (err) {
		console.log("Error getting old emails", err);
	}

	return [];
}

function saveOldEmails(oldEmailsData) {
	const oldEmailsFromJSON = getOldEmails();
	const oldEmails = [...oldEmailsFromJSON, ...oldEmailsData];
	console.log("saving old emails");

	try {
		fs.writeFileSync(
			path.join(dbDir, "oldEmailsData.json"),
			JSON.stringify(oldEmails, null, 2),
			"utf8"
		);
	} catch (err) {
		console.log("Error saving old emails", err);
	}
}

function saveSentEmails(sentEmailsData) {
	try {
		fs.writeFileSync(
			sentEmailsFilePath,
			JSON.stringify(sentEmailsData, null, 2),
			"utf8"
		);
	} catch (err) {
		console.log("Error saving sent emails", err);
	}
}

function getDaysDifference(date) {
	const dateMillis = new Date(date).getTime();
	const today = Date.now();
	const daysDifference = Math.floor(
		(today - dateMillis) / (1000 * 60 * 60 * 24)
	);
	return daysDifference;
}

function isDatePassed(date) {
	return getDaysDifference(date) > allowedDaysDifference;
}

module.exports = {
	getSentEmails,
	getToSendEmails,
	getOldEmails,
	saveOldEmails,
	saveSentEmails,
	getDaysDifference,
	isDatePassed,
};

const email = require("./emailOperations");

// email.addNewEmailsList(["abcd", "efgh", "ijkl", "mnop", "rfd"]);

// console.log(email.getSentEmails());

// console.log(email.getDaysDifference("2024-10-30"));

// console.log(email.removeOldSentEmails());

// console.log(email.removeOldSentEmails());

// console.log(email.getToSendEmails());

// console.log(email.addNewEmailsList(email.getToSendEmails()));

// console.log(email.addNewEmailsList(["aaditya"]));

// console.log(email.flattenEmailsData());

// const finalEmailArray = ["aadityabuchale@gmail.com"];

function handleDeleteOldEmails() {
	// email.addNewEmailsList();
	email.removeOldSentEmails();
}

handleDeleteOldEmails();

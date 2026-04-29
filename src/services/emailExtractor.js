// Function to extract emails from a given text
function extractEmails(text) {
	const emailRegex = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g;
	return text.match(emailRegex);
}

// Function to scroll to the bottom of the page
function scrollToBottom() {
	window.scrollTo(0, document.body.scrollHeight);
}

// Function to extract emails from the current page
function extractEmailsFromPage() {
	const pageText = document.body.innerText;
	const emails = extractEmails(pageText);
	return emails;
}

// Function to continuously scroll and extract emails until there are no more emails found
function scrollAndExtractEmails() {
	const extractedEmails = new Set();
	let previousEmailCount = 0;

	const interval = setInterval(() => {
		scrollToBottom();

		setTimeout(() => {
			const newEmails = extractEmailsFromPage();

			if (newEmails) {
				newEmails.forEach((email) => {
					extractedEmails.add(email);
				});

				if (extractedEmails.size > previousEmailCount) {
					previousEmailCount = extractedEmails.size;
				} else {
					clearInterval(interval);
					console.log(
						"All emails extracted:",
						Array.from(extractedEmails)
					);
				}
			}
		}, 10000); // Adjust the delay (in milliseconds) if needed
	}, 1000); // Adjust the interval (in milliseconds) if needed
}

// Start scrolling and extracting emails
scrollAndExtractEmails();

const extractedEmails = new Set();

function checkPersonalEmail(email) {
	const personalDomains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com"];
	return personalDomains.some(domain => email.endsWith(`@${domain}`));
}

// Function to extract emails from a given text
function extractEmails(text) {
	const emailRegex = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g;
	const emailsArr = text.match(emailRegex);
	const validEmails = emailsArr.filter((email) => !checkPersonalEmail(email) && isValidRecruitingDomain(email));
	return validEmails;
}

// Function to validate recruiting/company domains
function isValidRecruitingDomain(email) {
	const domain = email.split("@")[1];
	const blacklist = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com"];
	return !blacklist.includes(domain);
}

// Function to scroll to the bottom of the page
function scrollToBottom() {
	window.scrollTo(0, document.body.scrollHeight);
}

// Function to extract emails from the current page
function extractEmailsFromPage() {
	const pageText = document.body.innerText;
	const emails = extractEmails(pageText);
	return emails || [];
}

// Function to find and click the "Show more results" button
function clickShowMoreResults() {
	// Use a more specific selector to find the button with "Show more results" text
	const showMoreButton = Array.from(document.querySelectorAll("button")).find(
		(button) =>
			button.querySelector("span") &&
			button.querySelector("span").textContent.trim() ===
				"Show more results"
	);

	if (showMoreButton && showMoreButton.offsetParent !== null) {
		// Ensure the button is visible
		try {
			showMoreButton.click();
			console.log("Clicked 'Show more results' button.");
		} catch (error) {
			console.error("Error clicking 'Show more results' button:", error);
		}
	} else {
		console.log("'Show more results' button not found or not visible.");
	}
}

// fnunction for closing extractor
function closeExtractor(interval) {
	clearInterval(interval);
	console.log(
		"All emails extracted: ",
		JSON.stringify(Array.from(extractedEmails), null, 2),
		extractedEmails.size
	);
}

// Function to continuously scroll and extract emails
function scrollAndExtractEmails() {
	let previousEmailCount = 0;
	let retryCount = 0;

	const interval = setInterval(() => {
		// Click "Show more results" button if it exists
		clickShowMoreResults();

		// Scroll to the bottom of the page to load more content
		scrollToBottom();

		setTimeout(() => {
			const newEmails = extractEmailsFromPage();

			if (newEmails.length) {
				newEmails.forEach((email) => {
					if (!extractedEmails.has(email)) {
						console.log(
							"new email extracted:",
							JSON.stringify(
								Array.from(extractedEmails),
								null,
								2
							),
							extractedEmails.size
						);
						extractedEmails.add(email);

						if (extractedEmails.size >= 30) {
							closeExtractor(interval);
						}
					}
				});

				if (extractedEmails.size > previousEmailCount) {
					previousEmailCount = extractedEmails.size;
					retryCount = 0; // Reset retry count when new emails are found
				} else {
					retryCount++;
					// Stop if we reach the retry limit without finding new emails
					if (retryCount >= 25) {
						closeExtractor(interval);
					}
				}
			}
		}, 1500); // Reduced delay for faster extraction
	}, 2000); // Reduced interval for faster extraction
}

// Start scrolling and extracting emails
scrollAndExtractEmails();

const extractedEmails = new Set();

/* ---------------- EMAIL HELPERS ---------------- */

function isValidEmail(email) {
	const blacklist = [
		"gmail.com",
		"yahoo.com",
		"hotmail.com",
		"outlook.com",
		"icloud.com",
		"live.com",
		"zohomail.com",
		"email.com"
	];

	const domain = email.split("@")[1].toLowerCase();
	return !blacklist.includes(domain);
}

function extractEmails(text) {
	const emailRegex =
		/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g;

	return (text.match(emailRegex) || []).filter(isValidEmail);
}

/* ---------------- SCROLL HELPERS ---------------- */

function getScrollableElement() {
	const elements = [...document.querySelectorAll("*")];

	const scrollable = elements.find(el => {
		const style = getComputedStyle(el);
		return (
			el.scrollHeight > el.clientHeight + 100 &&
			(style.overflowY === "auto" || style.overflowY === "scroll")
		);
	});

	return scrollable || document.documentElement;
}

function scrollToBottom(container) {
	container.scrollTo({
		top: container.scrollHeight,
		behavior: "smooth"
	});
}

/* ---------------- LOAD MORE BUTTON ---------------- */

function clickLoadMore() {
	const btn = Array.from(document.querySelectorAll("button")).find(
		(button) =>
			button.innerText.toLowerCase().includes("load more") ||
			button.textContent.toLowerCase().includes("show more")
	);

	if (btn && btn.offsetParent !== null) {
		try {
			btn.click();
			console.log("Clicked Load More");
		} catch (err) {
			console.log("Click failed:", err);
		}
	}
}

/* ---------------- STOP FUNCTION ---------------- */

function stop(interval) {
	clearInterval(interval);

	console.log("===== FINAL EMAILS =====");
	console.log(JSON.stringify([...extractedEmails], null, 2));
	console.log("TOTAL:", extractedEmails.size);
}

/* ---------------- MAIN EXECUTION ---------------- */

function startExtractor() {
	let previousHeight = 0;
	let previousCount = 0;
	let retry = 0;

	const interval = setInterval(() => {
		const container = getScrollableElement();

		// Click Load More
		clickLoadMore();

		// Scroll
		scrollToBottom(container);

		setTimeout(() => {
			const text = document.body.innerText || "";
			const emails = extractEmails(text);

			let newFound = false;

			emails.forEach(email => {
				if (!extractedEmails.has(email)) {
					extractedEmails.add(email);
					newFound = true;
				}
			});

			if (newFound) {
				console.clear();
				console.log("Emails:", [...extractedEmails]);
				console.log("TOTAL:", extractedEmails.size);
			}

			const currentHeight = container.scrollHeight;

			if (
				currentHeight === previousHeight &&
				extractedEmails.size === previousCount
			) {
				retry++;
			} else {
				retry = 0;
			}

			previousHeight = currentHeight;
			previousCount = extractedEmails.size;

			// STOP CONDITIONS
			if (retry >= 10 || extractedEmails.size >= 100) {
				stop(interval);
			}
		}, 1500);
	}, 2500);
}

/* ---------------- START ---------------- */

startExtractor();

// const extractedEmails = new Set();

// function getScrollableElement() {
// 	const elements = [...document.querySelectorAll("*")];

// 	const scrollable = elements.find(el => {
// 		const style = getComputedStyle(el);
// 		return (
// 			(el.scrollHeight > el.clientHeight + 100) &&
// 			(style.overflowY === "auto" ||
// 				style.overflowY === "scroll")
// 		);
// 	});

// 	return scrollable || document.documentElement;
// }

// function extractEmails(text) {
// 	const emailRegex =
// 		/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g;

// 	const blacklist = [
// 		"gmail.com",
// 		"yahoo.com",
// 		"hotmail.com",
// 		"outlook.com",
// 		"icloud.com",
// 		"live.com"
// 	];

// 	return (text.match(emailRegex) || []).filter(email => {
// 		const domain = email.split("@")[1].toLowerCase();
// 		return !blacklist.includes(domain);
// 	});
// }

// function scrollContainerToBottom(container) {
// 	container.scrollTo({
// 		top: container.scrollHeight,
// 		behavior: "smooth"
// 	});
// }

// function stop(interval) {
// 	clearInterval(interval);

// 	console.log("===== FINAL EMAILS =====");
// 	console.log(
// 		JSON.stringify(Array.from(extractedEmails), null, 2)
// 	);
// 	console.log("TOTAL:", extractedEmails.size);
// }

// function start() {
// 	let previousHeight = 0;
// 	let retry = 0;
// 	let previousCount = 0;

// 	const interval = setInterval(() => {
// 		const container = getScrollableElement();

// 		scrollContainerToBottom(container);

// 		setTimeout(() => {
// 			const text = document.body.innerText || "";
// 			const emails = extractEmails(text);

// 			emails.forEach(email => {
// 				if (!extractedEmails.has(email)) {
// 					extractedEmails.add(email);

// 					console.clear();
// 					console.log('Extracted Emails:',
// 						extractedEmails
// 					);
// 					console.log("TOTAL:", extractedEmails.size);
// 				}
// 			});

// 			const currentHeight =
// 				container.scrollHeight;

// 			if (
// 				currentHeight === previousHeight &&
// 				extractedEmails.size === previousCount
// 			) {
// 				retry++;
// 			} else {
// 				retry = 0;
// 			}

// 			previousHeight = currentHeight;
// 			previousCount = extractedEmails.size;

// 			if (retry >= 10 || extractedEmails.size >= 100) {
// 				stop(interval);
// 			}
// 		}, 1500);
// 	}, 2500);
// }

// start();

// const extractedEmails = new Set();

// function checkPersonalEmail(email) {
// 	const personalDomains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com"];
// 	return personalDomains.some(domain => email.endsWith(`@${domain}`));
// }

// // Function to extract emails from a given text
// function extractEmails(text) {
// 	const emailRegex = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g;
// 	const emailsArr = text.match(emailRegex);
// 	const validEmails = emailsArr.filter((email) => !checkPersonalEmail(email) && isValidRecruitingDomain(email));
// 	return validEmails;
// }

// // Function to validate recruiting/company domains
// function isValidRecruitingDomain(email) {
// 	const domain = email.split("@")[1];
// 	const blacklist = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com"];
// 	return !blacklist.includes(domain);
// }

// // Function to scroll to the bottom of the page
// function scrollToBottom() {
// 	window.scrollTo(0, document.body.scrollHeight);
// }

// // Function to extract emails from the current page
// function extractEmailsFromPage() {
// 	const pageText = document.body.innerText;
// 	const emails = extractEmails(pageText);
// 	return emails || [];
// }

// // Function to find and click the "Show more results" button
// function clickShowMoreResults() {
// 	// Use a more specific selector to find the button with "Show more results" text
// 	const showMoreButton = Array.from(document.querySelectorAll("button")).find(
// 		(button) =>
// 			button.querySelector("span") &&
// 			button.querySelector("span").textContent.trim() ===
// 			"Load more"
// 	);

// 	if (showMoreButton && showMoreButton.offsetParent !== null) {
// 		// Ensure the button is visible
// 		try {
// 			showMoreButton.click();
// 			console.log("Clicked 'Show more results' button.");
// 		} catch (error) {
// 			console.error("Error clicking 'Show more results' button:", error);
// 		}
// 	} else {
// 		console.log("'Show more results' button not found or not visible.");
// 	}
// }

// // fnunction for closing extractor
// function closeExtractor(interval) {
// 	clearInterval(interval);
// 	console.log(
// 		"All emails extracted: ",
// 		JSON.stringify(Array.from(extractedEmails), null, 2),
// 		extractedEmails.size
// 	);
// }

// // Function to continuously scroll and extract emails
// function scrollAndExtractEmails() {
// 	let previousEmailCount = 0;
// 	let retryCount = 0;

// 	const interval = setInterval(() => {
// 		// Click "Show more results" button if it exists
// 		clickShowMoreResults();

// 		// Scroll to the bottom of the page to load more content
// 		scrollToBottom();

// 		setTimeout(() => {
// 			const newEmails = extractEmailsFromPage();

// 			if (newEmails.length) {
// 				newEmails.forEach((email) => {
// 					if (!extractedEmails.has(email)) {
// 						console.log(
// 							"new email extracted:",
// 							JSON.stringify(
// 								Array.from(extractedEmails),
// 								null,
// 								2
// 							),
// 							extractedEmails.size
// 						);
// 						extractedEmails.add(email);

// 						if (extractedEmails.size >= 70) {
// 							closeExtractor(interval);
// 						}
// 					}
// 				});

// 				if (extractedEmails.size > previousEmailCount) {
// 					previousEmailCount = extractedEmails.size;
// 					retryCount = 0; // Reset retry count when new emails are found
// 				} else {
// 					retryCount++;
// 					// Stop if we reach the retry limit without finding new emails
// 					if (retryCount >= 10) {
// 						closeExtractor(interval);
// 					}
// 				}
// 			}
// 		}, 1500); // Reduced delay for faster extraction
// 	}, 2000); // Reduced interval for faster extraction
// }

// // Start scrolling and extracting emails
// scrollAndExtractEmails();

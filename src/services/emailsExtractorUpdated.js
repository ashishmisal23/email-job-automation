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
			if (retry >= 10 || extractedEmails.size >= 300) {
				stop(interval);
			}
		}, 1500);
	}, 2500);
}

/* ---------------- START ---------------- */

startExtractor();

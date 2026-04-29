const segregator = (to, sent = []) => {
	let requiredEmails = [];
	to.map(
		(item) =>
			!sent.includes(item.trim()) && requiredEmails.push(item.trim())
	);
	return requiredEmails;
};

module.exports = segregator;

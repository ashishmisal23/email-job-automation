const fs = require('fs');
const pdf = require('pdf-parse');

// Read the PDF file
const pdfData = fs.readFileSync('list.pdf');

// Parse the PDF
pdf(pdfData).then(function (data) {
    const text = data.text;

    // Use a regular expression to find email addresses
    const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;
    const emails = text.match(emailPattern);

    // Print the extracted email addresses
    if (emails) {
        emails.forEach(function (email) {
            console.log(`"${email}",`);
        });
    } else {
        console.log('No email addresses found in the PDF.');
    }
}).catch(function (error) {
    console.error(error);
});

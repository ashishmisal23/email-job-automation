const dns = require("dns");

function checkEmailExistence(email, callback) {
  const parts = email.split("@");
  const domain = parts[1];

  dns.resolveMx(domain, (error, addresses) => {
    if (error || !addresses || addresses.length === 0) {
      // No MX records found for the domain
      callback(false);
    } else {
      // MX records found, indicating a potentially valid domain
      callback(true);
    }
  });
}

const emailToCheck = "tksharmayoyometolol@gmail.com";

checkEmailExistence(emailToCheck, (exists) => {
  if (exists) {
    console.log("Email appears to have a valid domain.");
    // You might want to perform additional checks or send a verification email here.
  } else {
    console.log("Email domain does not appear to be valid.");
  }
});



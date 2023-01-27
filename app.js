document.getElementById("sendAirtime").addEventListener("click", (e) => {
  e.preventDefault();

  // Collect the phone number and amount from the form input field
  const phoneNumber = document.getElementById("phonenumber").value;
  const amount = document.getElementById("amount").value;
  console.log(phoneNumber + "  " + amount);
  // Send the phone number to the Node.js server using an HTTP POST request
  fetch("http://localhost:3003/submit-phone-number", {
    method: "POST",
    body: JSON.stringify({ phoneNumber: phoneNumber, amount: amount }),
    headers: { "Content-Type": "application/json" },
  });
});

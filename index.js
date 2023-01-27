const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json()); // parse request body as JSON

app.post("/submit-phone-number", (req, res) => {
  try {
    const phoneNumber = req.body.phoneNumber;
    const amount = req.body.amount;
    console.log(`Received phone number: ${phoneNumber}+${amount}`);

    class Stanbic {
      constructor() {
        this.consumerKey = "a01479ca2e0bdee0510f29988e8e1130";
        this.consumerSecret = "6fa98994067428c7047f5519ad3e2b46";
        this.accessToken = "";
      }

      async getToken() {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body:
            "client_id=" +
            this.consumerKey +
            "&client_secret=" +
            this.consumerSecret +
            "&scope=payments&grant_type=client_credentials",
        };

        const response = await fetch(
          "https://api.connect.stanbicbank.co.ke/api/sandbox/auth/oauth2/token",
          options
        );
        const json = await response.json();
        this.accessToken = json.access_token;
        return this.accessToken;
      }

      async makePayment(token, phone, amount) {
        const options = {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            dbsReferenceId: "REW21331DR5F1",
            billAccountRef: "3333562174",
            amount: amount,
            mobileNumber: phone,
            corporateNumber: "740757",
            bankReferenceId: "0100010969764",
            txnNarrative: "ttsteeeee",
            callBackUrl: "",
          }),
        };

        const response = await fetch(
          "https://api.connect.stanbicbank.co.ke/api/sandbox/mpesa-checkout",
          options
        );
        const json = await response.json();
        console.log(json);
      }
    }

    const stanbic = new Stanbic();
    stanbic
      .getToken()
      .then((token) => stanbic.makePayment(token, `${phoneNumber}`, "100"));
    res.status(200).send({ message: "Phone number received" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Something went wrong" });
  }
});

app.listen(3003, () => {
  console.log("Server running on port 3003");
});

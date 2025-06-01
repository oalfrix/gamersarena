
const crypto = require("crypto");
const fetch = require("node-fetch");

exports.handler = async (event) => {
  const consumer_key = "rahzsyz5+mLSFPxmRmzZ28uecnuYpQwu";
  const consumer_secret = "u/5Lt+sfEiqScc69Q6BXk7J5Tbk=";
  const callback_url = "https://your-site.netlify.app/success.html";

  const method = "POST";
  const url = "https://pay.pesapal.com/v3/api/PostPesapalDirectOrderV4";

  const oauth_params = {
    oauth_consumer_key: consumer_key,
    oauth_nonce: crypto.randomBytes(16).toString("hex"),
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
    oauth_version: "1.0",
  };

  const sorted_params = Object.keys(oauth_params).sort().map(key => `${encodeURIComponent(key)}=${encodeURIComponent(oauth_params[key])}`).join("&");

  const base_string = `${method}&${encodeURIComponent(url)}&${encodeURIComponent(sorted_params)}`;
  const signing_key = `${encodeURIComponent(consumer_secret)}&`;
  const oauth_signature = crypto.createHmac("sha1", signing_key).update(base_string).digest("base64");

  const auth_header = `OAuth ${Object.entries({ ...oauth_params, oauth_signature })
    .map(([k, v]) => `${encodeURIComponent(k)}="${encodeURIComponent(v)}"`).join(", ")}`;

  const body = {
    id: "",
    currency: "KES",
    amount: "100",
    description: "Game Purchase",
    callback_url,
    notification_id: "",
    branch: "",
    reference: "order001",
    email: "customer@example.com",
    phone_number: "",
    first_name: "Game",
    last_name: "Buyer"
  };

  const response = await fetch(url, {
    method,
    headers: {
      "Authorization": auth_header,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  const data = await response.json();
  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
};

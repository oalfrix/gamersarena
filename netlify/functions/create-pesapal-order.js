
const crypto = require("crypto");
const querystring = require("querystring");

exports.handler = async (event, context) => {
  const consumer_key = "rahzsyz5+mLSFPxmRmzZ28uecnuYpQwu";
  const consumer_secret = "u/5Lt+sfEiqScc69Q6BXk7J5Tbk=";

  const callback_url = "https://your-site.netlify.app/success.html";
  const amount = "100"; // You can make this dynamic from `event.queryStringParameters`
  const description = "Game Purchase";
  const type = "MERCHANT";
  const reference = "order001";
  const email = "customer@example.com";

  const params = {
    oauth_consumer_key: consumer_key,
    oauth_nonce: crypto.randomBytes(16).toString("hex"),
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
    oauth_version: "1.0",
    callback_url,
    amount,
    description,
    type,
    reference,
    email
  };

  const sorted = Object.keys(params).sort().reduce((r, k) => {
    r[k] = params[k];
    return r;
  }, {});

  const baseString =
    "POST&" +
    encodeURIComponent("https://www.pesapal.com/API/PostPesapalDirectOrderV4") +
    "&" +
    encodeURIComponent(querystring.stringify(sorted));

  const signingKey = consumer_secret + "&";
  const oauth_signature = crypto
    .createHmac("sha1", signingKey)
    .update(baseString)
    .digest("base64");

  sorted["oauth_signature"] = oauth_signature;

  const iframeUrl =
    "https://www.pesapal.com/API/PostPesapalDirectOrderV4?" +
    querystring.stringify(sorted);

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ url: iframeUrl })
  };
};

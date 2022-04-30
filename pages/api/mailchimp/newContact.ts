import mailchimp from "@mailchimp/mailchimp_marketing";
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API,
  server: process.env.MAILCHIMP_SERVER_PREFIX,
});

const listId = process.env.MAILCHIMP_LIST_ID;

function runMailchimp(email) {
  async function run() {
    const response = await mailchimp.lists.addListMember(listId, {
      email_address: email,
      status: "subscribed",
      tags: ["betaTester"],
    });
    return response;
  }
  return run();
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email } = req.body;
    const response = await runMailchimp(email);
    res.status(200).json(response);
  }
  res.status(405).end();
}

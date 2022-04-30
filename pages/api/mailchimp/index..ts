import mailchimp from "@mailchimp/mailchimp_marketing";
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API,
  server: process.env.MAILCHIMP_SERVER_PREFIX,
});

function runMailchimp() {
  async function run() {
    const response = await mailchimp.ping.get();
    console.log(response);
    return response;
  }
  return run();
}

export default async function handler(req, res) {
  const result = await runMailchimp();
  res.status(200).json(result);
}

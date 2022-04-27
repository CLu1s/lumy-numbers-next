import mailchimp from "@mailchimp/mailchimp_marketing";
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API,
  server: process.env.MAILCHIMP_SERVER_PREFIX,
});

export default function useMailchimp() {
  async function run() {
    const response = await mailchimp.ping.get();
    console.log(response);
  }
  return run;
}

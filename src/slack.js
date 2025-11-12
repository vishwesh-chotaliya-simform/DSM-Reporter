const { WebClient } = require("@slack/web-api");

const slackToken = process.env.SLACK_BOT_TOKEN;
const channelId = process.env.SLACK_CHANNEL_ID;

const slackClient = new WebClient(slackToken);

/**
 * Send a formatted text message to a Slack channel.
 * @param {string} message - The message to send (summarized report)
 * @returns {Promise<void>}
 */
async function sendReportToSlack(message) {
  await slackClient.chat.postMessage({
    channel: channelId,
    text: message,
    mrkdwn: true,
  });
}

module.exports = { sendReportToSlack };

const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Summarize developer activity using OpenAI GPT-4o-mini.
 * @param {Array<{author: string, message: string}>} commits - Array of commit objects
 * @param {Array<{author: string, title: string, body: string}>} pullRequests - Array of PR objects
 * @returns {Promise<string>} - Summarized daily report
 */
async function summarizeActivity(commits, pullRequests) {
  // Group messages by developer
  const activityByDev = {};

  commits.forEach(({ author, message }) => {
    if (!activityByDev[author]) activityByDev[author] = [];
    activityByDev[author].push(`Commit: ${message}`);
  });

  pullRequests.forEach(({ author, title, body }) => {
    if (!activityByDev[author]) activityByDev[author] = [];
    activityByDev[author].push(`PR: ${title} - ${body}`);
  });

  // Prepare prompt for GPT
  let prompt =
    "Summarize the following developer activities into a short, readable daily stand-up report grouped by developer:\n\n";
  for (const [dev, activities] of Object.entries(activityByDev)) {
    prompt += `Developer: ${dev}\n`;
    activities.forEach((act) => {
      prompt += `- ${act}\n`;
    });
    prompt += "\n";
  }

  // Call OpenAI API
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are an assistant that summarizes developer activity for daily stand-up reports.",
      },
      { role: "user", content: prompt },
    ],
    max_tokens: 400,
    temperature: 0.5,
  });

  return response.choices[0].message.content.trim();
}

module.exports = { summarizeActivity };

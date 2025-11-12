require("dotenv").config();

const { fetchRecentActivity } = require("./github");
const { summarizeActivity } = require("./summarize");
const { sendReportToSlack } = require("./slack");

async function main() {
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;

  if (!owner || !repo) {
    console.error("Please set GITHUB_OWNER and GITHUB_REPO in your .env file.");
    process.exit(1);
  }

  try {
    // Fetch recent commits and PRs
    const { commits, pullRequests } = await fetchRecentActivity(owner, repo);

    // Format commits and PRs for summarization
    const commitData = commits.map((commit) => ({
      author: commit.author
        ? commit.author.login
        : commit.commit.author.name || "Unknown",
      message: commit.commit.message,
    }));

    const prData = pullRequests.map((pr) => ({
      author: pr.user ? pr.user.login : "Unknown",
      title: pr.title,
      body: pr.body || "",
    }));

    // Summarize activity
    const summary = await summarizeActivity(commitData, prData);

    // Send summary to Slack
    await sendReportToSlack(summary);

    console.log("Daily stand-up report sent to Slack.");
  } catch (err) {
    console.error("Error generating or sending report:", err);
  }
}

main();

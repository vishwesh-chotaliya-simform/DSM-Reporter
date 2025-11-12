const { Octokit } = require("@octokit/rest");

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

/**
 * Fetch commits and pull requests from the last 24 hours for a given repo.
 * @param {string} owner - GitHub repo owner
 * @param {string} repo - GitHub repo name
 * @returns {Promise<{commits: Array, pullRequests: Array}>}
 */
async function fetchRecentActivity(owner, repo) {
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

  // Fetch commits
  const commitsRes = await octokit.repos.listCommits({
    owner,
    repo,
    since,
    per_page: 100,
  });

  // Fetch pull requests
  const prsRes = await octokit.pulls.list({
    owner,
    repo,
    state: "all",
    sort: "updated",
    direction: "desc",
    per_page: 100,
  });

  // Filter PRs updated in last 24 hours
  const pullRequests = prsRes.data.filter(
    (pr) => new Date(pr.updated_at) >= new Date(since)
  );

  return {
    commits: commitsRes.data,
    pullRequests,
  };
}

module.exports = {
  fetchRecentActivity,
};

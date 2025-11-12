# Daily Stand-Up AI Reporter

## 🚀 Overview

Daily Stand-Up AI Reporter automates the process of collecting developer activity from GitHub, summarizes it using OpenAI, and posts a readable daily report to Slack. This helps teams stay updated with minimal manual effort.

---

## 🧩 Features

- **Fetches recent GitHub commits and pull requests**
- **Summarizes activity by developer using GPT-4o-mini (OpenAI)**
- **Posts formatted reports to a Slack channel**
- **Runs automatically every day at 10:00 AM via cron**

---

## 🛠️ Tech Stack

| Component     | Purpose                      |
| ------------- | ---------------------------- |
| Node.js       | Core logic                   |
| OpenAI API    | Summarization (GPT-4o-mini)  |
| GitHub API    | Fetch commits and PRs        |
| Slack Web API | Send messages to Slack       |
| node-cron     | Schedule daily execution     |
| dotenv        | Manage environment variables |

---

## 🌐 How to Get Your Environment Variables

To use this project, you need to set up several API keys and IDs in your `.env` file:

### 1. GitHub Personal Access Token

- Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens).
- Click **"Generate new token"**.
- Select scopes: `repo` (for private repos), `read:user`, etc.
- Copy the token and set:
  ```
  GITHUB_TOKEN=your_github_token
  ```

### 2. OpenAI API Key

- Sign up or log in at [OpenAI](https://platform.openai.com/).
- Go to **API Keys** in your account dashboard.
- Create a new key and set:
  ```
  OPENAI_API_KEY=your_openai_key
  ```

### 3. Slack Bot Token & Channel ID

- Create a Slack App at [Slack API: Your Apps](https://api.slack.com/apps).
- Add the **Bot Token Scopes**: `chat:write`, `channels:read`, `groups:read`, etc.
- Install the app to your workspace and copy the **Bot User OAuth Token**:
  ```
  SLACK_BOT_TOKEN=xoxb-...
  ```
- To get your **Channel ID**:
  - Open Slack, go to the desired channel.
  - Click the channel name > "View channel details".
  - The Channel ID is at the bottom, or in the URL after `/messages/`.
  ```
  SLACK_CHANNEL_ID=CXXXXXXXX
  ```

### 4. GitHub Owner and Repo

- Go to your repository on GitHub: `https://github.com/<owner>/<repo>`
  - **Owner** is the username or organization.
  - **Repo** is the repository name.
  ```
  GITHUB_OWNER=your_github_owner
  GITHUB_REPO=your_github_repo
  ```

> **Tip:** Never share your `.env` file or commit it to GitHub.

---

## 🧱 Folder Structure

```
.
├── .env                # Environment variables (not committed)
├── .gitignore
├── package.json
├── README.md
├── src/
│   ├── cron.js         # Schedules daily report
│   ├── github.js       # Fetches GitHub activity
│   ├── index.js        # Main orchestrator
│   ├── slack.js        # Sends report to Slack
│   └── summarize.js    # Summarizes activity using OpenAI
```

---

## ⚡ Setup Instructions

### 1. Clone the repository

```sh
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
```

### 2. Install dependencies

```sh
npm install
```

### 3. Create a `.env` file

Copy the following template and fill in your credentials:

```
GITHUB_TOKEN=your_github_token
OPENAI_API_KEY=your_openai_key
SLACK_BOT_TOKEN=your_slack_token
SLACK_CHANNEL_ID=your_channel_id
GITHUB_OWNER=your_github_owner
GITHUB_REPO=your_github_repo
```

> **Note:** Never commit your `.env` file. It is ignored by `.gitignore`.

### 4. Run the daily cron job

```sh
npm run start:cron
```

This will schedule the report to run every day at 10:00 AM. You should keep this process running (e.g., on a server or with a process manager like PM2).

---

## 📝 Usage

- The script fetches all commits and pull requests from the last 24 hours for the specified repository.
- It summarizes the activity by developer using OpenAI GPT-4o-mini.
- The summary is posted to the specified Slack channel.

You can also run the report manually:

```sh
node src/index.js
```

---

## 🧑‍💻 Customization

- **Change report time:** Edit the cron expression in [`src/cron.js`](src/cron.js).
- **Add JIRA integration:** Extend [`src/github.js`](src/github.js) and [`src/index.js`](src/index.js) to fetch and summarize JIRA tickets.
- **Send to Teams or Email:** Add new modules similar to [`src/slack.js`](src/slack.js).

---

## 🛡️ Security

- Keep your `.env` file secret.
- Do not share API keys or tokens.
- Rotate credentials periodically.

---

## 📄 License

This project is licensed under the ISC License.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📬 Support

For questions or issues, open a GitHub issue or contact the maintainer.

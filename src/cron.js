const cron = require("node-cron");
const { exec } = require("child_process");

// Schedule to run every day at 10:00 AM
cron.schedule("0 10 * * *", () => {
  exec("node src/index.js", (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
});

console.log("Cron job scheduled: Daily at 10:00 AM");

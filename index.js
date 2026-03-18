import express from "express";
import chalk from "chalk";


const app = express();
const PORT = process.env.PORT || 3000;

// ฟังก์ชัน format เวลา (YYYY-MM-DD HH:mm:ss)
function formatDateTime(date) {
  return date.toLocaleString("th-TH", { timeZone: "Asia/Bangkok" });
}

// Middleware log request
app.use((req, res, next) => {
  console.log(
    chalk.greenBright(`[${new Date().toISOString()}]`) +
      chalk.cyan(` ${req.method} ${req.url}`)
  );
  next();
});

// Root endpoint
app.get("/", (req, res) => {
  const serverTime = formatDateTime(new Date());
  res.send(`
    <div style="font-family: Arial, sans-serif; text-align: center; margin-top: 50px;">
      <h1 style="color:#4CAF50;">🚀 Build Image To Container Platform Use (Express + Nginx)</h1>
      <p style="font-size:18px;">สอบทดการ Deploy App ใน OKD ผ่าน Github</p>
      <hr style="margin:20px 0;" />
      <p><strong>🕒 Current Date & Time (Realtime):</strong></p>
      <h2 id="clock" style="color:#ff5722;">${serverTime} testttttt</h2>
      <hr style="margin:20px 0;" />
    </div>

    <script>
      function updateClock() {
        const now = new Date();
        const options = { timeZone: "Asia/Bangkok" };
        const timeString = now.toLocaleString("th-TH", options);
        document.getElementById("clock").innerText = timeString;
      }
      setInterval(updateClock, 1000); // อัปเดตทุก 1 วินาที
    </script>
  `);
});

// Healthcheck endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: formatDateTime(new Date()) });
});

// Start server
app.listen(PORT, () => {
  console.log(chalk.yellow("===================================="));
  console.log(
    chalk.greenBright("✅ Express server is running!") +
      ` on port ${chalk.cyan(PORT)}`
  );
  console.log(
    chalk.yellow("👉 Visit: ") + chalk.blueBright(`http://localhost:${PORT}`)
  );
  console.log(chalk.yellow("===================================="));
});

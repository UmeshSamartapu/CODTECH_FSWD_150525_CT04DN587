# ⏱️ Time Tracker & Productivity Analytics

A Chrome Extension that tracks the time you spend on websites, classifies them as productive or not, and visualizes your weekly activity using a React Dashboard. Powered by Node.js, Express, MongoDB, and Chart.js.

---

## 🚀 Project Overview

🔌 **Chrome Extension:**  
Tracks user activity across tabs and websites.

🧠 **Backend (Express + MongoDB):**  
Receives time logs, stores them by user, hostname, and date.

📊 **React Dashboard:**  
Displays weekly productivity stats using bar charts.

---

## 🧱 Final Project Structure

```bash
time-tracker-extension/
├── extension/ # Chrome Extension (Frontend)
│ ├── background.js
│ ├── content.js
│ ├── popup.html
│ ├── popup.js
│ └── manifest.json
│
├── server/ # Backend (Node.js + Express + MongoDB)
│ ├── server.js
│ ├── .env
│ ├── models/
│ │ └── Session.js
│ └── routes/
│ └── tracker.js
│
├── dashboard/ # React Dashboard
│ ├── public/
│ ├── package.json
│ ├── .env (optional)
│ └── src/
│ ├── App.js
│ ├── index.js
│ └── components/
│ └── WeeklyChart.js
```

---

## ⚙️ How It Works

### 🔁 Chrome Extension
- Tracks tab activity in `background.js`
- Sends `{ userId, hostname, timeSpent }` to backend
- Shows today’s usage summary in popup

### 🧾 Backend API Routes
- `POST /api/tracker` → Log time spent
- `GET /api/tracker/:userId/today` → Get today’s sessions
- `GET /api/tracker/:userId/weekly` → Get weekly stats summary

### 📊 React Dashboard
- Pulls data from backend using Axios
- Uses Chart.js to render weekly usage per domain

---

## 🛠️ Installation & Setup

### 1. 🚀 Backend Server

```bash
cd server
npm install
# Create a .env file with:
# MONGO_URI=mongodb://localhost:27017/time-tracker
# PORT=5000
npm run dev
```
2. 💻 React Dashboard
```bash
cd dashboard
npm install
npm start
```

3. 🧩 Load Chrome Extension

- Go to chrome://extensions

- Enable "Developer Mode"

- Click "Load unpacked"

- Select the extension/ folder

📦 Tech Stack
```bash
Layer	Tech
Extension	HTML, JS, Manifest v3
Backend	Node.js, Express, MongoDB
Dashboard	React.js, Chart.js, Axios
```

📈 Demo Preview

🧪 Sample .env (server)
```bash
.env
PORT=5000
MONGO_URI=mongodb://localhost:27017/time-tracker
```

📬 API Sample Payload

```bash
json
POST /api/tracker
{
  "userId": "guestUser",
  "hostname": "youtube.com",
  "timeSpent": 123456
}
```

### 🤝 Contributors

- 💻 Backend & API – umesh samartapu
- 🧩 Chrome Extension – umesh samartapu
- 📊 React Dashboard – umesh samartapu

### 📝 License

MIT License – Free to use and modify


## 📫 Let's Connect

[![LinkedIn](https://img.shields.io/badge/-LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/umeshsamartapu/)
[![Twitter](https://img.shields.io/badge/-Twitter-1DA1F2?style=flat-square&logo=twitter&logoColor=white)](https://x.com/umeshsamartapu)
[![Email](https://img.shields.io/badge/-Email-D14836?style=flat-square&logo=gmail&logoColor=white)](mailto:umeshsamartapu@gmail.com)
[![Instagram](https://img.shields.io/badge/-Instagram-E4405F?style=flat-square&logo=instagram&logoColor=white)](https://www.instagram.com/umeshsamartapu/)
[![Buy Me a Coffee](https://img.shields.io/badge/-Buy%20Me%20a%20Coffee-FBAD19?style=flat-square&logo=buymeacoffee&logoColor=black)](https://www.buymeacoffee.com/umeshsamartapu)

---

🔥 Always exploring new technologies and solving real-world problems with code!


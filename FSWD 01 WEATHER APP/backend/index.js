import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import fetch from 'node-fetch';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get('/api/weather', async (req, res) => {
  const { city, lat, lon } = req.query;
  const apiKey = process.env.WEATHER_API_KEY;

  let apiUrl = '';
  if (lat && lon) {
    apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  } else if (city) {
    apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  } else {
    return res.status(400).json({ error: 'Missing city or coordinates' });
  }

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (response.ok) res.json(data);
    else res.status(response.status).json({ error: data.message });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});

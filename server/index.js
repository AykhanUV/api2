import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

const SEVEN_XTREAM_BASE_URL = 'https://embed.7xtream.com';

// Proxy for movie embed URLs
app.get('/embed/movie/:id', async (req, res) => {
  const { id } = req.params;
  const targetUrl = `${SEVEN_XTREAM_BASE_URL}/embed/movie/${id}`;

  try {
    const response = await axios.get(targetUrl, { responseType: 'stream' });
    response.data.pipe(res);
  } catch (error) {
    console.error('Error proxying request:', error);
    res.status(500).json({ error: 'Error proxying request' });
  }
});

// Proxy for TV show embed URLs
app.get('/embed/tv/:id/:season/:episode', async (req, res) => {
  const { id, season, episode } = req.params;
  const targetUrl = `${SEVEN_XTREAM_BASE_URL}/embed/tv/${id}/${season}/${episode}`;

  try {
    const response = await axios.get(targetUrl, { responseType: 'stream' });
    response.data.pipe(res);
  } catch (error) {
    console.error('Error proxying request:', error);
    res.status(500).json({ error: 'Error proxying request' });
  }
});

// Proxy for list URLs
app.get('/list/:type.json', async (req, res) => {
  const { type } = req.params;
  const targetUrl = `${SEVEN_XTREAM_BASE_URL}/list/${type}.json`;

  try {
    const response = await axios.get(targetUrl, { responseType: 'stream' });
    response.data.pipe(res);
  } catch (error) {
    console.error('Error proxying request:', error);
    res.status(500).json({ error: 'Error proxying request' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

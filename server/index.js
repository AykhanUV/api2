import express from 'express';
import cors from 'cors';
import axios from 'axios';
import { parse } from 'node-html-parser';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

// Example: Fetch streaming link from a dummy source (replace with actual scraping logic)
async function getStreamingLink(tmdbId, type, season = null, episode = null) {
  const dummyStreamingLink = `https://dummy-streaming-link.com/${type}/${tmdbId}`;
  if (type === 'tv' &amp;&amp; season &amp;&amp; episode) {
    return `${dummyStreamingLink}/${season}/${episode}`;
  }
  return dummyStreamingLink;
}

// Search for movies or TV shows
app.get('/search', async (req, res) => {
  const { query } = req.query;
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/search/multi`, {
      params: { query },
      headers: { Authorization: `Bearer ${TMDB_API_KEY}` },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from TMDB' });
  }
});

// Get movie details
app.get('/movie/:tmdbId', async (req, res) => {
  const { tmdbId } = req.params;
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/movie/${tmdbId}`, {
      headers: { Authorization: `Bearer ${TMDB_API_KEY}` },
    });
    const streamingLink = await getStreamingLink(tmdbId, 'movie');
    res.json({ ...response.data, streamingLink });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching movie details' });
  }
});

// Get TV show details
app.get('/tv/:tmdbId', async (req, res) => {
  const { tmdbId } = req.params;
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/tv/${tmdbId}`, {
      headers: { Authorization: `Bearer ${TMDB_API_KEY}` },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching TV show details' });
  }
});

// Get TV show episode details
app.get('/tv/:tmdbId/:season/:episode', async (req, res) => {
  const { tmdbId, season, episode } = req.params;
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/tv/${tmdbId}/season/${season}/episode/${episode}`, {
      headers: { Authorization: `Bearer ${TMDB_API_KEY}` },
    });
    const streamingLink = await getStreamingLink(tmdbId, 'tv', season, episode);
    res.json({ ...response.data, streamingLink });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching TV show episode details' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

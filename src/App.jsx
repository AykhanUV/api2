import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedEpisode, setSelectedEpisode] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/search?query=${searchQuery}`);
      setSearchResults(response.data.results);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  const handleSelectMovie = async (tmdbId, type) => {
    try {
      const response = await axios.get(`http://localhost:3000/${type}/${tmdbId}`);
      setSelectedMovie(response.data);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  const handleSelectEpisode = async (tmdbId, season, episode) => {
    try {
      const response = await axios.get(`http://localhost:3000/tv/${tmdbId}/${season}/${episode}`);
      setSelectedEpisode(response.data);
    } catch (error) {
      console.error('Error fetching episode details:', error);
    }
  };

  return (
    <div>
      <h1>Movie Streaming App</h1>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search for a movie or TV show"
      />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {searchResults.map((result) => (
          <li key={result.id} onClick={() => handleSelectMovie(result.id, result.media_type)}>
            {result.title || result.name} ({result.media_type})
          </li>
        ))}
      </ul>

      {selectedMovie &amp;&amp; (
        <div>
          <h2>{selectedMovie.title || selectedMovie.name}</h2>
          <p>{selectedMovie.overview}</p>
          {selectedMovie.streamingLink &amp;&amp; (
            <a href={selectedMovie.streamingLink} target="_blank" rel="noopener noreferrer">
              Watch Now
            </a>
          )}
          {selectedMovie.seasons &amp;&amp; (
            <ul>
              {selectedMovie.seasons.map((season) => (
                <li key={season.season_number}>
                  Season {season.season_number}
                  <ul>
                    {Array.from({ length: season.episode_count }, (_, i) => i + 1).map((episode) => (
                      <li key={episode} onClick={() => handleSelectEpisode(selectedMovie.id, season.season_number, episode)}>
                        Episode {episode}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {selectedEpisode &amp;&amp; (
        <div>
          <h3>{selectedEpisode.name}</h3>
          <p>{selectedEpisode.overview}</p>
          {selectedEpisode.streamingLink &amp;&amp; (
            <a href={selectedEpisode.streamingLink} target="_blank" rel="noopener noreferrer">
              Watch Now
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export default App;

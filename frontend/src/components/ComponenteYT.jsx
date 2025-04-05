import React, { useEffect, useState } from 'react';

const ComponenteYT = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = 'AIzaSyCe8QZO5AyTCCOlm1drtyttlIhyouFnBD0';
  const hashtag = '#Mayor_store_';
  const maxResults = 5;

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
            hashtag
          )}&type=video&maxResults=${maxResults}&key=${apiKey}`
        );

        if (!response.ok) {
          throw new Error('Error al obtener los videos');
        }

        const data = await response.json();
        
        // Filtrar los videos que contienen el hashtag en el título o descripción
        const filteredVideos = data.items.filter((video) => {
          const title = video.snippet.title.toLowerCase();
          const description = video.snippet.description.toLowerCase();
          return title.includes(hashtag.toLowerCase()) || description.includes(hashtag.toLowerCase());
        });

        setVideos(filteredVideos);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [apiKey]);

  if (loading) return <div className="loading">Cargando videos...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="ytContainer">
      <div className="ytSection">
        <h2 className="ytTitle">Comparte tus videos {hashtag}</h2>
        {videos.length === 0 ? (
          <p className="noVideos">No se encontraron videos con el hashtag {hashtag}.</p>
        ) : (
          <div className="videoGrid">
            {videos.map((video) => (
              <div key={video.id.videoId} className="videoCard">
                <h3 className="videoTitle">{video.snippet.title}</h3>
                <div className="thumbnailContainer">
                  <img
                    className="thumbnail"
                    src={video.snippet.thumbnails.medium.url}
                    alt={video.snippet.title}
                  />
                </div>
                <p className="videoDescription">{video.snippet.description}</p>
                <a
                    className="videoLink"
                    href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    Ver en YouTube
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ComponenteYT;
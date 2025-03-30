import React, { useState, useEffect } from 'react';
import { CiLink } from 'react-icons/ci';
import { getVideos } from '../services/videoManagerService';
import { useLocation, useNavigate } from 'react-router';

function VideoResource() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/');
  const folderId = pathSegments[pathSegments.length - 1];

  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getVideos(folderId);
        setVideos(response || []);
      } catch (err) {
        setError(err.message || 'Failed to load videos.');
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [folderId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg text-gray-600">Loading videos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  const handleVideoClick = (videoId) => {
    navigate(`/video/${videoId}`);
  };

  return (
    <div className="p-4 min-h-screen">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Video Resources</h2>
      {videos.length > 0 ? (
        [...videos].reverse().map((video) => ( // Reverse the videos array
          <div
            key={video.id}
            className="bg-gray-100 rounded-lg shadow p-6 mb-4 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleVideoClick(video.id)}
          >
            <h3 className="text-xl font-semibold mb-2 text-gray-800">{video.name}</h3>
            <div className="mt-4 space-y-2">
              <a
                href={video.webContentLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-blue-600 hover:underline"
              >
                <CiLink className="mr-2" />
                Download Video
              </a>
            </div>
          </div>
        ))
      ) : (
        <div className="text-gray-600">No videos found in this folder.</div>
      )}
    </div>
  );
}

export default VideoResource;
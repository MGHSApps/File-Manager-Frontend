import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { getVideo } from '../services/videoManagerService';
import { BiDownload } from 'react-icons/bi';

function Video() {
    const { id: videoId } = useParams();
    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVideo = async () => {
            setLoading(true);
            setError(null);
            try {
                const fetchedVideo = await getVideo(videoId);
                setVideo(fetchedVideo);
            } catch (err) {
                setError(err.message || 'Failed to load video.');
            } finally {
                setLoading(false);
            }
        };

        fetchVideo();
    }, [videoId]);

    if (loading) {
        return <div>Loading video...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!video) {
        return <div>Video not found.</div>;
    }

    return (
        <div className='flex flex-col p-4'>
            <h2 className="text-xl font-bold mb-4">{video.name}</h2>
            {video.webViewLink ? (
                <div className="relative rounded-lg overflow-hidden border border-base-300 shadow" style={{ paddingTop: '56.25%' }}> {/* 16:9 aspect ratio */}
                    <iframe
                    title="Google Drive Video Player"
                    src={video.webViewLink.replace('/view?usp=drivesdk', '/preview')}
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full"
                    ></iframe>
                </div>
                ) : (
                <p>Video content not available.</p>
            )}
            <div className="mt-6 space-y-3 flex justify-center flex-wrap gap-3">
            {video.webViewLink && (
                <a
                href={video.webViewLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-blue-500 rounded-md shadow-sm text-sm font-medium text-blue-700 mb-0 bg-white hover:bg-blue-50"
                >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                View on Google Drive
                </a>
            )}
            {video.webContentLink && (
                <a
                href={video.webContentLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-4 py-2 border border-green-500 rounded-md shadow-sm text-sm font-medium text-green-700 bg-white hover:bg-green-50"
                >
                <BiDownload></BiDownload>
                Download Video
                </a>
            )}
            </div>
        </div>
    );
}

export default Video;
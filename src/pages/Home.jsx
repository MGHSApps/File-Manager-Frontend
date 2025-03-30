import React, { useState, useEffect } from 'react';
import { getAnnouncements, getAnnouncement } from '../services/announcementService';
import ShuffleHero from '../components/hero';

const ANNOUNCEMENTS_FOLDER_ID = "1YXKXC9jymIIlpYn0X41yWS4lJQxDAReH";

function Home() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const docs = await getAnnouncements(ANNOUNCEMENTS_FOLDER_ID);

        if (!Array.isArray(docs.documents)) {
          throw new Error("Invalid API response: expected an array");
        }

        const announcementsData = await Promise.all(
          docs.documents.map(async (doc) => {
            const content = await getAnnouncement(doc.id);
            return { 
              title: content?.content?.title || doc.name,  
              description: content?.content?.description || 'No description available.', 
              link: doc.webViewLink // Add link for announcement
            };
          })
        );
        
        setAnnouncements(announcementsData);
      } catch (err) {
        setError(err.message || 'Failed to load announcements.');
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <div className="flex flex-col w-full p-6 space-y-6">
      <ShuffleHero />

      <div className='px-10'>
        <div className="bg-accent p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-4">📢 Latest Announcements</h2>

          {loading ? (
            <p className="text-center text-gray-500">Loading announcements...</p>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : announcements.length === 0 ? (
            <p className="text-gray-600 text-center">No announcements available.</p>
          ) : (
            <div className="space-y-4">
              {announcements.map((announcement, index) => (
                <a 
                  key={index} 
                  href={announcement.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block bg-gray-50 hover:bg-green-50 transition p-5 rounded-xl shadow-md border border-gray-200"
                >
                  <h3 className="text-lg font-semibold text-accent">{announcement.title || 'Untitled Announcement'}</h3>
                  <p className="text-gray-700 mt-1">{announcement.description || 'No description available.'}</p>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
}

export default Home;

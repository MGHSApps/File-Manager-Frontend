import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { getFolders } from "../services/videoManagerService";
import HoverDevCards from "../components/HoverDevCards";
import { CiFolderOn } from "react-icons/ci";

function VideoResources() {
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const data = await getFolders();
        setFolders(data);
      } catch (error) {
        console.error("Error fetching folders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFolders();
  }, []);

  if (loading) {
    return <div className="p-4">Loading folders...</div>;
  }

  if (folders.length === 0) {
    return <div className="p-4">No folders found.</div>;
  }

  const folderCards = folders.map((folder) => ({
    title: folder.name,
    subtitle: "View videos in this folder",
    href: `/video-resources/${folder.id}`,
    Icon: CiFolderOn,
  }));

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Available Folders</h2>
      <HoverDevCards cards={folderCards} />
    </div>
  );
}

export default VideoResources;
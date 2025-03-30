import axios from "axios";
import { API_BASE_URL } from "./config"; 

const getFolders = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/google-drive/folders`);
      console.log(response)
      return response.data.folders;
    } catch (error) {
      console.error("Error fetching folders:", error);
      throw error.response?.data || { message: "An unexpected error occurred." };
    }
};

const getVideos = async (folderId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/google-drive/folders/${folderId}/videos`);
    return response.data.videos;
  } catch (error) {
    console.error("Error fetching videos:", error);
    throw error.response?.data || { message: "An unexpected error occurred." };
  }
};

const getVideo = async (videoId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/google-drive/videos/${videoId}`);
      console.log("response", response)
      return response.data;
    } catch (error) {
      console.error("Error fetching videos:", error);
      throw error.response?.data || { message: "An unexpected error occurred." };
    }
};

export {getFolders, getVideos, getVideo}
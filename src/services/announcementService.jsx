import axios from "axios";
import { API_BASE_URL } from "./config"; 

const getAnnouncements = async (folderId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/google-drive/folders/${folderId}/documents`);
      console.log(response)
      return response.data;
    } catch (error) {
      console.error("Error fetching folders:", error);
      throw error.response?.data || { message: "An unexpected error occurred." };
    }
};

const getAnnouncement = async (docId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/google-drive/announcements/${docId}`);
      console.log(response)
      return response.data;
    } catch (error) {
      console.error("Error fetching Document:", error);
      throw error.response?.data || { message: "An unexpected error occurred." };
    }
};


export {getAnnouncements, getAnnouncement}
import axios from "axios";
import { API_BASE_URL } from "./config"; 

const getTasks = async (folderId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/google-drive/folders/${folderId}/documents`);
      console.log(response)
      return response.data;
    } catch (error) {
      console.error("Error fetching folders:", error);
      throw error.response?.data || { message: "An unexpected error occurred." };
    }
};

const getTask = async (docId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/google-drive/document/${docId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching Document:", error);
      throw error.response?.data || { message: "An unexpected error occurred." };
    }
};


export {getTasks, getTask}
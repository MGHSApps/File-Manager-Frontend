import axios from "axios";
import { API_BASE_URL } from "./config";

const submit = async (userId, taskName, link) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/submissions/create-submissions`, {
      userId,
      taskName,
      link
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error creating submission:", error);
    throw error.response?.data || { message: "An unexpected error occurred." };
  }
};

const getUserSubmissions = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/submissions/user/${userId}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching user submissions:", error);
    throw error.response?.data || { message: "An unexpected error occurred." };
  }
};

const deleteSubmission = async (submissionId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/submissions/${submissionId}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error deleting submission:", error);
    throw error.response?.data || { message: "An unexpected error occurred." };
  }
};

const editSubmission = async (submissionId, updatedData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/submissions/${submissionId}`, updatedData);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error editing submission:", error);
    throw error.response?.data || { message: "An unexpected error occurred." };
  }
};


export { submit, getUserSubmissions, editSubmission, deleteSubmission };

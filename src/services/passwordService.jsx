import axios from "axios";
import { API_BASE_URL } from "./config"; 

const sendOTP = async (email) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/passwords/send-otp`, {
        email: email
      });
      console.log(response)
      return response.data;
    } catch (error) {
      console.error("Error sending otp:", error);
      throw error.response?.data || { message: "An unexpected error occurred." };
    }
};

const verifyOTP = async (email, otp) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/passwords/verify-otp`, {
        email: email,
        otp: otp
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching verfying otp:", error);
      throw error.response?.data || { message: "An unexpected error occurred." };
    }
};


export {sendOTP, verifyOTP}
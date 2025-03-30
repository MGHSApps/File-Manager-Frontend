import axios from "axios";
import { API_BASE_URL } from "./config"; 

async function login(username, password) {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/login`, {
      username,
      password,
    });

    return response.data;
  } catch (error) {
    console.error("Login failed:", error.response?.data?.message || error.message);
    throw error.response?.data || { message: "An unexpected error occurred." };
  }
}

async function register(username, password, companyEmail, firstName, lastName, role) {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/register`, {
      username,
      password,
      companyEmail,
      firstName,
      lastName,
      role,
    });

    return response.data;
  } catch (error) {
    console.error("Registration failed:", error.response?.data?.message || error.message);
    throw error.response?.data || { message: "An unexpected error occurred." };
  }
}

const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error.response?.data?.message || error.message);
    throw error.response?.data || { message: "An unexpected error occurred." };
  }
};

const editUser = async (userId, updatedData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/users/${userId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error editing user:", error.response?.data?.message || error.message);
    throw error.response?.data || { message: "An unexpected error occurred." };
  }
};

const getUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Document:", error);

    throw error.response?.data || { message: "An error getting users." };
  }
};

const getUser = async (username) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${username}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Document:", error);

    throw error.response?.data || { message: "An error getting user." };
  }
};

export { login, register, deleteUser, editUser, getUsers, getUser };

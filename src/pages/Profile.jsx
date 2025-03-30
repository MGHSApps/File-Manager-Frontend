import React, { useState, useEffect, useRef } from 'react';
import { MdEmail, MdModeEdit, MdLock } from 'react-icons/md';
import { BiRename } from 'react-icons/bi';
import { editUser } from '../services/userService';

function Profile() {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    companyEmail: '',
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const prevStoredUserString = useRef(null);

  useEffect(() => {
    if (storedUser) {
      const storedUserString = JSON.stringify(storedUser);
      if (storedUserString !== prevStoredUserString.current) {
        setUserData({
          firstName: storedUser.firstName || '',
          lastName: storedUser.lastName || '',
          companyEmail: storedUser.companyEmail || '',
          username: storedUser.username || '',
          password: '',
        });
        prevStoredUserString.current = storedUserString;
      }
    }
  }, [storedUser]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      await editUser(storedUser._id, userData);
      localStorage.setItem('user', JSON.stringify({ ...storedUser, ...userData }));
      setIsEditing(false);
    } catch (err) {
      setError(err.message || 'Error updating user.');
      console.error('Error updating user:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-grow flex-col bg-neutral-content p-5">
      <div className="flex h-fit gap-5 w-full mb-6">
        <div className="flex justify-center place-items-center gap-2 cursor-pointer" onClick={handleEditClick}>
          <MdModeEdit size={20} className="text-accent" />
          <h4 className="text-accent font-semibold">Edit Profile</h4>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Account Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="firstName" className="text-sm font-medium text-gray-700 mb-1">First Name</label>
            <div className="flex items-center border rounded-md p-0.5 bg-white">
              <span className="bg-gray-100 p-2 rounded-l-md"><BiRename size={18} className="text-gray-500" /></span>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Enter first name"
                className="p-2 rounded-r-md w-full focus:outline-none"
                value={userData.firstName}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="lastName" className="text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <div className="flex items-center border rounded-md p-0.5 bg-white">
              <span className="bg-gray-100 p-2 rounded-l-md"><BiRename size={18} className="text-gray-500" /></span>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Enter last name"
                className="p-2 rounded-r-md w-full focus:outline-none"
                value={userData.lastName}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="companyEmail" className="text-sm font-medium text-gray-700 mb-1">Company Email</label>
            <div className="flex items-center border rounded-md p-0.5 bg-white">
              <span className="bg-gray-100 p-2 rounded-l-md"><MdEmail size={18} className="text-gray-500" /></span>
              <input
                type="email"
                name="companyEmail"
                id="companyEmail"
                placeholder="Enter company email"
                className="p-2 rounded-r-md w-full focus:outline-none"
                value={userData.companyEmail}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="username" className="text-sm font-medium text-gray-700 mb-1">User Name</label>
            <div className="flex items-center border rounded-md p-0.5 bg-white">
              <span className="bg-gray-100 p-2 rounded-l-md"><BiRename size={18} className="text-gray-500" /></span>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Enter user name"
                className="p-2 rounded-r-md w-full focus:outline-none"
                value={userData.username}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="flex items-center border rounded-md p-0.5 bg-white">
              <span className="bg-gray-100 p-2 rounded-l-md"><MdLock size={18} className="text-gray-500" /></span>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter password"
                className="p-2 rounded-r-md w-full focus:outline-none"
                value={userData.password}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
          </div>
        </div>
      </div>
      {isEditing && (
        <button
          onClick={handleSave}
          className="mt-6 p-3 bg-accent cursor-pointer text-white rounded-md hover:bg-gray-700 transition-colors duration-200"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      )}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}

export default Profile;
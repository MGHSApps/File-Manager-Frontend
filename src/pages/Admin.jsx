import React, { useState, useEffect } from 'react';
import { getUsers, deleteUser, editUser } from '../services/userService';
import Table from '../components/table';
import axios from 'axios';
import { API_BASE_URL } from '../services/config';

function Admin() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editUserData, setEditUserData] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const userData = await getUsers();
        setUsers(userData);
      } catch (err) {
        setError(err.message || 'Failed to load users.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (err) {
      setError(err.message || 'Failed to delete user.');
    }
  };

  const handleEdit = (user) => {
    setEditUserData(user);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await editUser(editUserData._id, editUserData);
      setUsers(users.map((user) => (user._id === editUserData._id ? editUserData : user)));
      setIsEditModalOpen(false);
    } catch (err) {
      setError(err.message || 'Failed to edit user.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUserData({ ...editUserData, [name]: value });
  };

  const handleViewSubmissions = async (userId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/submissions/user/${userId}`);
      setSubmissions(response.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setSubmissions([]);
      } else {
        setError(err.message || 'Failed to load submissions.');
      }
    } finally {
      setIsModalOpen(true);
    }
  };

  const columns = [
    { header: 'Username', accessorKey: 'username' },
    { header: 'First Name', accessorKey: 'firstName' },
    { header: 'Last Name', accessorKey: 'lastName' },
    { header: 'Email', accessorKey: 'companyEmail' },
    { header: 'Role', accessorKey: 'role' },
  ];

  const actions = (row) => (
    <div className="flex">
      <button className="btn btn-sm bg-accent text-white mr-2" onClick={() => handleViewSubmissions(row._id)}>
        Submissions
      </button>
      <button className="btn btn-sm bg-accent text-white mr-2" onClick={() => handleEdit(row)}>
        Edit
      </button>
      <button className="btn btn-sm bg-red-800 text-white" onClick={() => handleDelete(row._id)}>
        Delete
      </button>
    </div>
  );

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="flex w-full p-4">
      <div className="w-full">
        <h1 className="text-2xl mb-4 font-bold">Users</h1>
        <Table columns={columns} data={users} actions={actions} />
      </div>

      {/* User Submissions Modal */}
      {isModalOpen && (
        <div className="fixed z-40 inset-0 bg-gray-500/75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-4xl">
            <h2 className="text-xl font-bold mb-4">User Submissions</h2>
            {submissions.length > 0 ? (
              <div className="overflow-x-auto rounded-lg shadow-md">
                <table className="table-auto w-full rounded-lg">
                  <thead>
                    <tr className="bg-accent text-white rounded-t-lg">
                      <th className="p-3 text-left rounded-tl-lg">Task Name</th>
                      <th className="p-3 text-left rounded-tr-lg">Link</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submissions.map((submission, index) => (
                      <tr key={submission._id} className={index % 2 === 0 ? 'bg-gray-200' : 'bg-white'}>
                        <td className="p-3">{submission.taskName}</td>
                        <td className="p-3">
                          <a href={submission.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            {submission.link}
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>No submissions found.</p>
            )}
            <div className="mt-4 flex justify-end">
              <button className="btn btn-sm" onClick={() => setIsModalOpen(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {isEditModalOpen && editUserData && (
        <div className="fixed z-50 inset-0 bg-gray-500/75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit User</h2>
            <form onSubmit={handleEditSubmit}>
              <label className="block mb-2">
                First Name:
                <input
                  type="text"
                  name="firstName"
                  value={editUserData.firstName}
                  onChange={handleChange}
                  className="w-full p-2 border rounded mt-1"
                />
              </label>
              <label className="block mb-2">
                Last Name:
                <input
                  type="text"
                  name="lastName"
                  value={editUserData.lastName}
                  onChange={handleChange}
                  className="w-full p-2 border rounded mt-1"
                />
              </label>
              <label className="block mb-2">
                Email:
                <input
                  type="email"
                  name="companyEmail"
                  value={editUserData.companyEmail}
                  onChange={handleChange}
                  className="w-full p-2 border rounded mt-1"
                />
              </label>
              <label className="block mb-2">
                Role:
                <select
                  name="role"
                  value={editUserData.role}
                  onChange={handleChange}
                  className="w-full p-2 border rounded mt-1"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </label>
              <div className="mt-4 flex justify-end">
                <button type="button" className="btn btn-sm mr-2" onClick={() => setIsEditModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-sm bg-accent text-white">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;

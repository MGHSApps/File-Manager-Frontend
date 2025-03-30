import React, { useEffect, useState } from 'react';
import Table from '../components/table';
import EditSubmissionModal from '../components/editModal';
import { deleteSubmission, editSubmission, getUserSubmissions } from '../services/submissionService';

function SubmittedTasks() {
  const [submissions, setSubmissions] = useState([]);
  const [userId, setUserId] = useState(null);
  const [currentSubmission, setCurrentSubmission] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // rename isEditModalOpen

  const columns = [
    { header: 'Task Name', accessorKey: 'taskName' },
    { header: 'Username', accessorFn: (row) => row.userId?.username || 'N/A' },
    { header: 'Date Submitted', accessorKey: 'dateSubmitted' },
    { header: 'GDrive Link', accessorKey: 'link' },
  ];

  const handleDelete = async (submissionId) => {
    try {
      await deleteSubmission(submissionId);
      setSubmissions((prev) => prev.filter((submission) => submission._id !== submissionId));
      console.log('Submission deleted successfully');
    } catch (error) {
      console.error('Error deleting submission:', error);
    }
  };

  const handleOpenModal = (submission) => { 
    setCurrentSubmission(submission);
    setIsModalOpen(true);
    console.log('opening modal: ', isModalOpen);
  };

  const handleCloseModal = () => { 
    setIsModalOpen(false);
    setCurrentSubmission(null);
  };

  const handleSaveEdit = async (submissionId, updatedData) => {
    try {
      const updatedSubmission = await editSubmission(submissionId, updatedData);
      setSubmissions((prev) =>
        prev.map((submission) => (submission._id === submissionId ? updatedSubmission : submission))
      );
      setIsModalOpen(false);
      console.log('Submission updated successfully:', updatedSubmission);
    } catch (error) {
      console.error('Error editing submission:', error);
    }
  };

  const actions = (rowData) => (
    <div className="flex space-x-2">
      <button onClick={() => handleOpenModal(rowData)} className="btn btn-sm btn-accent">
        Edit
      </button>
      <button onClick={() => handleDelete(rowData.
        _id)} className="btn btn-sm btn-white border-base-300">
        Delete
      </button>
    </div>
  );

  useEffect(() => {
    const storedUserString = localStorage.getItem('user');
    if (storedUserString) {
      try {
        const storedUser = JSON.parse(storedUserString);
        setUserId(storedUser._id);
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
      }
    } else {
      console.log('No user object found in local storage.');
    }
  }, []);

  useEffect(() => {
    if (userId) {
      const fetchSubmissions = async () => {
        try {
          const data = await getUserSubmissions(userId);
          setSubmissions(data);
          console.log('submissions: ', data);
        } catch (error) {
          console.error('Error fetching submissions:', error);
        }
      };
      fetchSubmissions();
    }
  }, [userId]);

  return (
    <div className="p-5">
      <h2 className="text-lg font-semibold mt-4 mb-4">Submissions</h2>
      <Table columns={columns} data={submissions} actions={actions} />
      {isModalOpen && (
        <div className="absolute z-99">
          <EditSubmissionModal
            submission={currentSubmission}
            onSave={handleSaveEdit}
            onClose={handleCloseModal}
          />
        </div>
      )}
    </div>
  );
}

export default SubmittedTasks;
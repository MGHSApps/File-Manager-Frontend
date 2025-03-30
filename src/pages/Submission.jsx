import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { getTask } from '../services/taskService';
import { submit } from '../services/submissionService';
import Modal from '../components/modal';

function Submission() {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id: docId } = useParams();

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
    const fetchTask = async () => {
      setLoading(true);
      try {
        const fetchedDocument = await getTask(docId);
        console.log(fetchedDocument.content)
        setTask(fetchedDocument.content);
      } catch (err) {
        setError(err.message || 'Failed to load task.');
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [docId]);

  const handleSubmission = async (link) => {
    if (!userId) {
      console.error('User ID is not available.');
      return;
    }
    if (!task || !task.title) {
      console.error('Task information is incomplete.');
      return;
    }

    try {
      const response = await submit(userId, task.title, link);
      console.log('Submission successful:', response);
    } catch (error) {
      console.error('Submission failed:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!task) return <p>No task found.</p>;

  return (
    <div className="w-full flex flex-col p-4 gap-4">
      <div className="w-full flex flex-col">
        <h3 className="text-lg font-semibold mb-4">Instructional Video:</h3>
        <div
          className="relative border border-base-300 rounded-lg overflow-hidden"
          style={{ paddingTop: '56.25%' }}
        >
          <iframe
            src={`https://drive.google.com/file/d/${task.gdriveVideoLink}/preview`}
            title="Instructional Video"
            allow="autoplay; fullscreen"
            className="absolute top-0 left-0 w-full h-full"
          ></iframe>
        </div>
      </div>
      <div className='flex flex-col relative gap-0 p-0'>
        <div className="p-4 w-full bg-primary-content rounded-t border border-base-300 shadow">
            <h2 className="text-2xl font-semibold mb-2">Task: {task.title}</h2>
            <h3 className='text-md text-gray-700 mb-4'>Description: {task.description}</h3>
            <h3 className="text-lg font-semibold mb-2">Requirements</h3>
            <ul className="list-disc list-inside space-y-2 pl-6">
              {task.requirements.map((requirement, index) => (
                <li key={index} className="text-gray-700">{requirement}</li>
              ))}
            </ul>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-accent text-white font-medium px-4 py-2 rounded-b hover:opacity-90 transition-opacity"
          >
          Submit Task
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Submit Task"
        message="Please enter the required information."
        onConfirm={handleSubmission}
        onCancel={() => console.log('Submission cancelled')}
        includeInput={true}
        userId={userId}
        taskName={task.title}
        submit={submit}
      />
    </div>
  );
}

export default Submission;
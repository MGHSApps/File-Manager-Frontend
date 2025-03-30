import React, { useEffect, useState } from 'react';
import { FaTasks } from 'react-icons/fa';
import HoverDevCards from '../components/HoverDevCards';
import { getTasks } from '../services/taskService';

function SubmissionManager() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await getTasks('12jR_tr-sZ72cyH2q7rl9KHfHaG10t0dA');
        const documents = response.documents || [];

        const formattedTasks = documents.map((doc) => ({
          title: doc.name,
          subtitle: 'Manage ' + doc.name.toLowerCase(),
          href: `/submission-manager/${doc.id}`,
          Icon: FaTasks,
        }));

        setTasks(formattedTasks);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };

    fetchDocuments();
  }, []);

  return (
    <div className="p-5">
      <h2 className="text-lg font-semibold mt-4">Tasks</h2>
      <HoverDevCards cards={tasks} />
    </div>
  );
}

export default SubmissionManager;
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function EditSubmissionModal({ submission, onSave, onClose }) { // Add onClose prop
  const [formData, setFormData] = useState({ taskName: '', link: '' });

  useEffect(() => {
    if (submission) {
      setFormData({ taskName: submission.taskName, link: submission.link });
    }
  }, [submission]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(submission._id, formData);
  };

  const handleCancelClick = () => {
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-gray-500/75 flex justify-center items-center z-99"
      >
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-white p-6 rounded-md shadow-lg w-full max-w-md"
        >
          <h2 className="text-lg font-semibold mb-4">Edit Submission</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <h2 className="block text-gray-700 text-sm font-bold mb-2">
                Task Name: {formData.taskName}
              </h2>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                GDrive Link:
              </label>
              <input
                type="url"
                name="link"
                value={formData.link}
                onChange={handleChange}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded mr-2"
                onClick={handleCancelClick} // Add onClick handler
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Save Changes
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default EditSubmissionModal;
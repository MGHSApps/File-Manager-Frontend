import React from 'react';

function Guide() {
  return (
    <div className="flex w-full flex-col gap-6 p-6">
      
      <div className="flex flex-grow flex-col text-white bg-accent p-6 py-8 rounded-2xl shadow-lg">
        <h1 className="font-bold text-2xl mb-3">📁 Welcome to MGHS' File Management System!</h1>
        <p className="text-lg opacity-90">
          Your one-stop hub for accessing learning materials, managing tasks, and submitting assignments seamlessly. 
          Stay organized with all the resources you need to enhance your productivity.
        </p>
      </div>

      <div className="flex flex-grow gap-6 flex-col bg-white p-6 py-8 rounded-2xl shadow-lg border border-gray-200">
        <div className="border-l-4 border-accent pl-4">
          <h2 className="font-bold text-xl text-gray-800 mb-2">🎥 Video Resources</h2>
          <p className="text-gray-700">
            Access a curated collection of instructional videos that serve as valuable references for completing your tasks effectively.
          </p>
        </div>

        <div className="border-l-4 border-neutral pl-4">
          <h2 className="font-bold text-xl text-gray-800 mb-2">📝 Tasks & Submissions</h2>
          <p className="text-gray-700">
            View all your assigned tasks in one place. Each task includes a submission link where you can track and manage your completed work.
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg text-gray-800">
          <p className="font-semibold">💡 Tip:</p>
          <p>Use the sidebar navigation to quickly switch between resources and tasks for a smoother workflow.</p>
        </div>
      </div>
    </div>
  );
}

export default Guide;

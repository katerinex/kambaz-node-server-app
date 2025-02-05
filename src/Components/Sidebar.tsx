import React from 'react';
import { NavLink } from 'react-router-dom'; // If using React Router

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white p-4">
      <h2 className="text-xl font-bold mb-4">Kambaz</h2>
      <ul>
        <li className="py-2 hover:bg-gray-700">
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? "text-yellow-300" : ""}> {/* Active link styling */}
            Dashboard
          </NavLink>
        </li>
        <li className="py-2 hover:bg-gray-700">
          <NavLink to="/courses/1234" className={({ isActive }) => isActive ? "text-yellow-300" : ""}> {/* Example course link */}
            Course 1234
          </NavLink>
        </li>
        <li className="py-2 hover:bg-gray-700">
          <NavLink to="/assignments" className={({ isActive }) => isActive ? "text-yellow-300" : ""}>
            Assignments
          </NavLink>
        </li>
        <li className="py-2 hover:bg-gray-700">
          <NavLink to="/quizzes" className={({ isActive }) => isActive ? "text-yellow-300" : ""}>
            Quizzes
          </NavLink>
        </li>
        {/* Add more navigation links as needed */}
      </ul>
    </aside>
  );
};

export default Sidebar;
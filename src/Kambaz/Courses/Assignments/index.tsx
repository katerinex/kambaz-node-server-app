//src/Kambaz/Courses/Assignments/index.tsx
import React, { useState } from "react";  // Import useState from React
import { Link } from "react-router-dom";  // Import Link from react-router-dom

export default function Assignments() {
  // Static list of assignments, ideally this would come from an API
  const assignments = [
    { id: 1, title: "A1 - ENV + HTML" },
    { id: 2, title: "A2 - JavaScript Basics" },
    { id: 3, title: "A3 - React Introduction" },
    
  ];

 
  const [searchQuery, setSearchQuery] = useState("");


  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

 
  const filteredAssignments = assignments.filter((assignment) =>
    assignment.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div id="wd-assignments">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search for Assignments"
        id="wd-search-assignment"
        value={searchQuery}
        onChange={handleSearch}
      />
      
      {/* Buttons */}
      <button id="wd-add-assignment-group">+ Group</button>
      <button id="wd-add-assignment">+ Assignment</button>
      
      {/* Assignments Title */}
      <h3 id="wd-assignments-title">
        ASSIGNMENTS 40% of Total <button>+</button>
      </h3>
      
      {/* Assignment List */}
      <ul id="wd-assignment-list">
        {filteredAssignments.map((assignment) => (
          <li key={assignment.id} className="wd-assignment-list-item">
            <Link
              to={`/Kambaz/Courses/Assignments/${assignment.id}`}
              className="wd-assignment-link"
            >
              {assignment.title}
            </Link>
          </li>
        ))}
        
        <li className="wd-assignment-list-item">
          
        </li>
      </ul>
    </div>
  );
}

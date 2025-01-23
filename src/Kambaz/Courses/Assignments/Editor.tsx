import React, { useState } from "react";

export default function AssignmentEditor() {

  const [assignmentName, setAssignmentName] = useState("A1 - ENV + HTML");
  const [description, setDescription] = useState(
    "The assignment is available online Submit a link to the landing page of"
  );
  const [points, setPoints] = useState(100);
  const [dueDate, setDueDate] = useState("2025-05-01");
  const [availableFrom, setAvailableFrom] = useState("2025-04-01");
  const [availableUntil, setAvailableUntil] = useState("2025-06-01");


  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAssignmentName(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handlePointsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPoints(Number(e.target.value));
  };

  const handleDueDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDueDate(e.target.value);
  };

  const handleAvailableFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAvailableFrom(e.target.value);
  };

  const handleAvailableUntilChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAvailableUntil(e.target.value);
  };

  return (
    <div id="wd-assignments-editor">
      {/* Assignment Name */}
      <label htmlFor="wd-name">Assignment Name</label>
      <input
        id="wd-name"
        type="text"
        value={assignmentName}
        onChange={handleNameChange}
        placeholder="Enter Assignment Name"
      />
      <br /><br />

      {/* Description */}
      <label htmlFor="wd-description">Description</label>
      <textarea
        id="wd-description"
        value={description}
        onChange={handleDescriptionChange}
        placeholder="Enter Assignment Description"
      ></textarea>
      <br /><br />

      {/* Points */}
      <label htmlFor="wd-points">Points</label>
      <input
        id="wd-points"
        type="number"
        value={points}
        onChange={handlePointsChange}
        placeholder="Enter Points"
      />
      <br /><br />

      {/* Due Date */}
      <label htmlFor="wd-due-date">Due Date</label>
      <input
        id="wd-due-date"
        type="date"
        value={dueDate}
        onChange={handleDueDateChange}
      />
      <br /><br />

      {/* Available From */}
      <label htmlFor="wd-available-from">Available From</label>
      <input
        id="wd-available-from"
        type="date"
        value={availableFrom}
        onChange={handleAvailableFromChange}
      />
      <br /><br />

      {/* Available Until */}
      <label htmlFor="wd-available-until">Available Until</label>
      <input
        id="wd-available-until"
        type="date"
        value={availableUntil}
        onChange={handleAvailableUntilChange}
      />
      <br /><br />

      {/* Optional additional fields can be added similarly */}
    </div>
  );
}

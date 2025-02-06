// src/Kambaz/Courses/Assignments/Editor.tsx
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
//import '../../styles.css';

const AssignmentEditor = () => {
  const [assignmentName, setAssignmentName] = useState("A1");
  const [description, setDescription] = useState(
    "The assignment is available online Submit a link to the landing page of your Web application running on Netlify. The landing page should include the following: Your full name and section Links to each of the lab assignments Link to the Kanbas application Links to all relevant source code repositories The Kanbas application should include a link to navigate back to the landing page."
  );
  const [points, setPoints] = useState(100);
  const [dueDate, setDueDate] = useState("2024-05-13T23:59"); //ISO 8601 format for datetime-local
  const [availableFrom, setAvailableFrom] = useState("2024-05-06T00:00"); //ISO 8601 format for datetime-local
  const [availableUntil, setAvailableUntil] = useState(""); // You might not always have an "until" date


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
    <div id="wd-assignment-editor" className="p-4">
      <h2>
        <span>202440,2 Summer 1 20245</span>
        <span> &gt; Assignments &gt; </span>
        <span>{assignmentName}</span> {/* Display assignment name in heading */}
      </h2>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control type="text" value={assignmentName} onChange={handleNameChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Assignment Description</Form.Label>
          <Form.Control as="textarea" rows={5} value={description} onChange={handleDescriptionChange} /> {/* Increased rows */}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Points</Form.Label>
          <Form.Control type="number" value={points} onChange={handlePointsChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Due</Form.Label>
          <Form.Control type="datetime-local" value={dueDate} onChange={handleDueDateChange} /> {/* Use datetime-local */}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Available from</Form.Label>
          <Form.Control type="datetime-local" value={availableFrom} onChange={handleAvailableFromChange} /> {/* Use datetime-local */}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Until</Form.Label>
          <Form.Control type="datetime-local" value={availableUntil} onChange={handleAvailableUntilChange} /> {/* Use datetime-local */}
        </Form.Group>

        {/* Add other form groups for remaining fields */}
        <Form.Group className="mb-3">
          <Form.Label>Submission Type</Form.Label>
          <Form.Control as="select">
            <option>Online</option>
            {/* Add other submission type options */}
          </Form.Control>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Assign to</Form.Label>
          <Form.Control as="select">
            <option>Everyone</option>
            {/* Add other options */}
          </Form.Control>
        </Form.Group>

        <div className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2">Cancel</Button>
          <Button variant="primary">Save</Button>
        </div>
      </Form>
    </div>
  );
};

export default AssignmentEditor;
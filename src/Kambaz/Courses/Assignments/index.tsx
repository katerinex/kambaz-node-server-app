// src/Kambaz/Courses/Assignments/index.tsx
import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Button, FormControl, InputGroup, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { deleteAssignment, setAssignments } from "./reducer"; // Corrected import
import { Link, useNavigate, useParams } from "react-router-dom";
import * as client from "./client";

export default function Assignments() {
  const { cid } = useParams<{ cid: string }>();
  const assignments = useSelector((state: any) => state.assignmentsReducer).filter((a: any) => a.course === cid);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        if (cid) { // Check if cid is defined
          const fetchedAssignments = await client.findAssignmentsForCourse(cid);
          dispatch(setAssignments(fetchedAssignments));
        }
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    };
    fetchAssignments();
  }, [cid, dispatch]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredAssignments = assignments.filter((assignment: any) =>
    assignment.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (assignmentId: string) => {
    setAssignmentToDelete(assignmentId);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      await client.deleteAssignment(assignmentToDelete);
      dispatch(deleteAssignment(assignmentToDelete));
      setShowModal(false);
    } catch (error) {
      console.error("Error deleting assignment:", error);
    }
  };

  return (
    <div id="wd-assignments" className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Assignments</h2>
        <div>
          <Button variant="danger" onClick={() => navigate(`Assignments/new`)}>+ Assignment</Button>
        </div>
      </div>

      <InputGroup className="mb-3">
        <FormControl
          placeholder="Search for Assignment"
          aria-label="Search"
          aria-describedby="basic-addon1"
          value={searchQuery}
          onChange={handleSearch}
        />
        <InputGroup.Text id="basic-addon1">
          <FaSearch />
        </InputGroup.Text>
      </InputGroup>

      <ul className="list-group">
        {filteredAssignments.map((assignment: any) => (
          <li key={assignment._id} className="list-group-item">
            <div className="wd-assignment-item">
              <Link to={`Assignments/${assignment._id}`}>
                <h3>{assignment.title}</h3>
              </Link>
              <p>
                {assignment.description} | Due {assignment.dueDate} | {assignment.points} points
              </p>
              <Button variant="danger" onClick={() => handleDelete(assignment._id)}>Delete</Button>
            </div>
          </li>
        ))}
      </ul>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this assignment?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
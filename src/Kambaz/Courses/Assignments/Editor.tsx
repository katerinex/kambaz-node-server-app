// src/Kambaz/Courses/Assignments/Editor.tsx
import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addAssignment, updateAssignment } from "./reducer";

const AssignmentEditor = () => {
  const { cid, aid } = useParams<{ cid: string; aid: string }>();
  const assignments = useSelector((state: any) => state.assignmentsReducer);
  const assignment = assignments.find((a: any) => a._id === aid);
  const [formData, setFormData] = useState<any>(
    assignment || {
      _id: "",
      title: "",
      description: "",
      points: 0,
      dueDate: "",
      availableFromDate: "",
      availableUntilDate: "",
      course: cid,
    }
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (assignment) {
      setFormData(assignment);
    } else if(aid === 'new'){
      setFormData({
        _id: String(Date.now()),
        title: "",
        description: "",
        points: 0,
        dueDate: "",
        availableFromDate: "",
        availableUntilDate: "",
        course: cid,
      });
    }
  }, [assignment, cid, aid]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (assignment) {
      dispatch(updateAssignment(formData));
    } else {
      dispatch(addAssignment(formData));
    }
    navigate(`/Kambaz/Courses/${cid}/Assignments`);
  };

  return (
    <div id="wd-assignment-editor" className="p-4">
      <h2>
        <span>{cid}</span>
        <span> &gt; Assignments &gt; </span>
        <span>{formData.title}</span>
      </h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Assignment Description</Form.Label>
          <Form.Control as="textarea" rows={5} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Points</Form.Label>
          <Form.Control type="number" value={formData.points} onChange={(e) => setFormData({ ...formData, points: parseInt(e.target.value) })} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Due</Form.Label>
          <Form.Control type="datetime-local" value={formData.dueDate} onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Available from</Form.Label>
          <Form.Control type="datetime-local" value={formData.availableFromDate} onChange={(e) => setFormData({ ...formData, availableFromDate: e.target.value })} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Available until</Form.Label>
          <Form.Control type="datetime-local" value={formData.availableUntilDate} onChange={(e) => setFormData({ ...formData, availableUntilDate: e.target.value })} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </div>
  );
}
export default AssignmentEditor;
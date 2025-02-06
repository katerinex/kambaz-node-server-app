// src/Kambaz/Courses/Modules/ModulesControls.tsx
import { FaPlus } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";
import { Button, Dropdown } from "react-bootstrap";

export default function ModulesControls() {
  return (
    <div id="wd-modules-controls" className="d-flex justify-content-end align-items-center"> {/* Use flexbox for layout */}
      <Button variant="danger" size="lg" className="me-2" id="wd-add-module-btn">
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Module
      </Button>

      <Dropdown className="me-2">
        <Dropdown.Toggle variant="secondary" size="lg" id="wd-publish-all-btn">
          <GreenCheckmark /> Publish All
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item id="wd-publish-all">
            <GreenCheckmark /> Publish All
          </Dropdown.Item>
          <Dropdown.Item id="wd-publish-all-modules-and-items">
            <GreenCheckmark /> Publish all modules and items
          </Dropdown.Item>
          <Dropdown.Item id="wd-publish-modules-only">
            <GreenCheckmark /> Publish modules only
          </Dropdown.Item>
          <Dropdown.Item id="wd-unpublish-all-modules-and-items">
            <span>Unpublish all modules and items</span>
          </Dropdown.Item>
          <Dropdown.Item id="wd-unpublish-modules-only">
            <span>Unpublish modules only</span>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Button variant="light" size="lg" className="me-2" id="wd-view-progress">
        View Progress
      </Button>
      <Button variant="light" size="lg" id="wd-collapse-all">
        Collapse All
      </Button>
    </div>
  );
}

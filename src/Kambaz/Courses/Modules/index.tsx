// src/Kambaz/Courses/Modules/index.tsx

import { useState, useEffect } from "react";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import { ListGroup, FormControl } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  addModule,
  editModule,
  updateModule,
  deleteModule,
  setModules,
} from "./reducer";
import * as coursesClient from "../client";
import * as modulesClient from "./client";

interface ModulesProps {
  courseId: string | undefined;
}

export default function Modules(props: ModulesProps) {
  const { courseId } = props;
  const { cid } = useParams<{ cid?: string }>(); // Make cid optional
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const dispatch = useDispatch();

  const fetchModules = async () => {
    try{
      if (cid) {
        const fetchedModules = await coursesClient.findModulesForCourse(
          cid as string
        );
        dispatch(setModules(fetchedModules));
      }
    }catch(error){
      console.error("Error fetching modules:", error);
    }
  };

  const createModuleForCourse = async () => {
    if (!cid) return;
    try{
      const newModule = { name: moduleName, course: cid };
      const module = await coursesClient.createModuleForCourse(cid, newModule);
      dispatch(addModule(module));
      setModuleName(""); // Clear the input field after adding
    } catch (error) {
      console.error("Error creating module:", error);
    }
  };

  const removeModule = async (moduleId: string) => {
    try{
      await modulesClient.deleteModule(moduleId);
      dispatch(deleteModule(moduleId));
    } catch (error){
      console.error("Error deleting module:", error);
    }
  };

  const saveModule = async (module: any) => {
    try{
      await modulesClient.updateModule(module);
      dispatch(updateModule(module));
    } catch (error) {
      console.error("Error saving module:", error);
    }
  };

  useEffect(() => {
    fetchModules();
  }, [cid]);

  return (
    <div>
      <h3>Modules for Course {cid}</h3>
      <ModulesControls
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={createModuleForCourse}
      />
      <br />
      <br />
      <br />
      <br />
      <ListGroup className="rounded-0" id="wd-modules">
        {modules.map((module: any) => (
          <ListGroup.Item
            key={module._id}
            className="wd-module p-0 mb-5 fs-5 border-gray"
          >
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" />
              {!module.editing && module.name}
              {module.editing && (
                <FormControl
                  className="w-50 d-inline-block"
                  value={module.name}
                  onChange={(e) =>
                    dispatch(updateModule({ ...module, name: e.target.value }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      saveModule({ ...module, editing: false });
                    }
                  }}
                />
              )}
              <ModuleControlButtons
                moduleId={module._id}
                moduleName={moduleName}
                setModuleName={setModuleName}
                addModule={createModuleForCourse}
                deleteModule={removeModule}
                editModule={(moduleId) => dispatch(editModule(moduleId))}
              />
            </div>
            <ListGroup className="wd-lessons rounded-0">{/* ... */}</ListGroup>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
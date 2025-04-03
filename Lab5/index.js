// Lab5/index.js

import PathParameters from "./PathParameters.js";
import QueryParameters from "./QueryParameters.js";
import WorkingWithObjects from "./WorkingWithObjects.js";
import WorkingWithArrays from "./WorkingWithArrays.js";
import SessionController from "./SessionController.js";

export default function Lab5(app) {
  // Simple GET request to welcome users to Lab 5
  app.get("/lab5/welcome", (req, res) => {
    res.send("Welcome to Lab 5");
  });
  // Include routes for handling path parameters
  PathParameters(app);
  // Include routes for handling query parameters
  QueryParameters(app);
  // Include routes for working with JavaScript objects
  WorkingWithObjects(app);
  // Include routes for working with JavaScript arrays (ToDos)
  WorkingWithArrays(app);
  // Include routes for managing session data
  SessionController(app);
}
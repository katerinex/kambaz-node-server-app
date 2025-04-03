// Lab5/WorkingWithObjects.js

const module = {
  id: "MOD001",
  name: "Introduction to Web Development",
  description: "Learn the basics of HTML, CSS, and JavaScript",
  course: "Web Programming",
};

const assignment = {
  id: 1,
  title: "NodeJS Assignment",
  description: "Create a NodeJS server with ExpressJS",
  due: "2021-10-10",
  completed: false,
  score: 0,
};

export default function WorkingWithObjects(app) {
  // GET request to retrieve the entire assignment object
  app.get("/lab5/assignment", (req, res) => {
    res.json(assignment);
  });

  // GET request to retrieve only the title of the assignment
  app.get("/lab5/assignment/title", (req, res) => {
    res.json(assignment.title);
  });

  // GET request to update the assignment title and retrieve the updated object
  app.get("/lab5/assignment/title/:newTitle", (req, res) => {
    const { newTitle } = req.params;
    assignment.title = newTitle;
    res.json(assignment);
  });

  // GET request to retrieve the entire module object
  app.get("/lab5/module", (req, res) => {
    res.json(module);
  });

  // GET request to retrieve only the name of the module
  app.get("/lab5/module/name", (req, res) => {
    res.json(module.name);
  });

  // GET request to update the module name and retrieve the updated object
  app.get("/lab5/module/name/:newName", (req, res) => {
    const { newName } = req.params;
    module.name = newName;
    res.json(module);
  });

  // GET request to update the module description and retrieve the updated object
  app.get("/lab5/module/description/:newDescription", (req, res) => {
    const { newDescription } = req.params;
    module.description = newDescription;
    res.json(module);
  });

  // GET request to update the assignment score and retrieve the updated object
  app.get("/lab5/assignment/score/:newScore", (req, res) => {
    const { newScore } = req.params;
    const score = parseInt(newScore, 10);
    // Basic validation to ensure the score is a number
    if (isNaN(score)) {
      return res.status(400).json({ error: "Invalid score provided" });
    }
    assignment.score = score;
    res.json(assignment);
  });

  // GET request to update the assignment completion status and retrieve the updated object
  app.get("/lab5/assignment/completed/:completed", (req, res) => {
    const { completed } = req.params;
    // Convert the string 'true' or 'false' to a boolean
    assignment.completed = completed === "true";
    res.json(assignment);
  });
}
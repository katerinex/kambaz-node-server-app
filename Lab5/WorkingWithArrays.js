// Lab5/WorkingWithArrays.js

let todos = [
  { id: 1, title: "Task 1", completed: false, description: "Description 1" },
  { id: 2, title: "Task 2", completed: true, description: "Description 2" },
  { id: 3, title: "Task 3", completed: false, description: "Description 3" },
  { id: 4, title: "Task 4", completed: true, description: "Description 4" },
];

export default function WorkingWithArrays(app) {
  // GET request to retrieve all ToDos, with an optional filter for completed status via query parameter
  app.get("/lab5/todos", (req, res) => {
    const { completed } = req.query;
    if (completed !== undefined) {
      const completedBool = completed === "true";
      const completedTodos = todos.filter(
        (t) => t.completed === completedBool
      );
      res.json(completedTodos);
      return;
    }
    res.json(todos);
  });

  // GET request to create a new default ToDo and add it to the array
  app.get("/lab5/todos/create", (req, res) => {
    const newTodo = {
      id: new Date().getTime(),
      title: "New Task",
      completed: false,
      description: "New Description",
    };
    todos.push(newTodo);
    res.json(todos);
  });

  // POST request to create a new ToDo with data provided in the request body
  app.post("/lab5/todos", (req, res) => {
    const newTodo = { ...req.body, id: new Date().getTime() };
    // Basic validation to ensure title is provided
    if (!newTodo.title) {
      return res.status(400).json({ error: "Title is required for a new ToDo" });
    }
    todos.push(newTodo);
    res.json(newTodo);
  });

  // GET request to retrieve a specific ToDo by its ID
  app.get("/lab5/todos/:id", (req, res) => {
    const { id } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (!todo) {
      return res.status(404).json({ message: `Cannot find Todo with ID ${id}` });
    }
    res.json(todo);
  });

  // DELETE request to delete a specific ToDo by its ID with error handling
  app.delete("/lab5/todos/:id", (req, res) => {
    const { id } = req.params;
    const initialLength = todos.length;
    todos = todos.filter((t) => t.id !== parseInt(id));
    if (todos.length === initialLength) {
      return res.status(404).json({ message: `Unable to delete Todo with ID ${id}: not found` });
    }
    res.sendStatus(200);
  });

  // GET request to update the title of a specific ToDo by its ID
  app.get("/lab5/todos/:id/title/:title", (req, res) => {
    const { id, title } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (!todo) {
      return res.status(404).json({ message: `Cannot find Todo with ID ${id} to update title` });
    }
    todo.title = title;
    res.json(todos);
  });

  // GET request to update the completed status of a specific ToDo by its ID
  app.get("/lab5/todos/:id/completed/:completed", (req, res) => {
    const { id, completed } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (!todo) {
      return res.status(404).json({ message: `Cannot find Todo with ID ${id} to update completion status` });
    }
    todo.completed = completed === "true";
    res.json(todos);
  });

  // GET request to update the description of a specific ToDo by its ID
  app.get("/lab5/todos/:id/description/:description", (req, res) => {
    const { id, description } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (!todo) {
      return res.status(404).json({ message: `Cannot find Todo with ID ${id} to update description` });
    }
    todo.description = description;
    res.json(todos);
  });

  // PUT request to update a specific ToDo by its ID with data provided in the request body
  app.put("/lab5/todos/:id", (req, res) => {
    const { id } = req.params;
    const todoIndex = todos.findIndex((t) => t.id === parseInt(id));
    if (todoIndex === -1) {
      return res.status(404).json({ message: `Unable to update Todo with ID ${id}: not found` });
    }
    const updatedTodo = { ...todos[todoIndex], ...req.body, id: parseInt(id) };
    todos[todoIndex] = updatedTodo;
    res.sendStatus(200);
  });
}
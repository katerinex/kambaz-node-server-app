// Lab5/SessionController.js

const SessionController = (app) => {
    // GET request to set a session variable with a given name and value
    const setSession = (req, res) => {
      const { name, value } = req.params;
      req.session[name] = value;
      res.send(req.session);
    };
  
    // GET request to retrieve the value of a specific session variable
    const getSession = (req, res) => {
      const { name } = req.params;
      const value = req.session[name];
      res.send(value);
    };
  
    // GET request to retrieve all session variables
    const getSessionAll = (req, res) => {
      res.send(req.session);
    };
  
    // GET request to reset (destroy) the entire session
    const resetSession = (req, res) => {
      req.session.destroy((err) => {
        if (err) {
          console.error("Error destroying session:", err);
          return res.status(500).send("Failed to reset session");
        }
        res.sendStatus(200);
      });
    };
  
    // Define the API endpoints for session management
    app.get("/api/session/get/:name", getSession);
    app.get("/api/session", getSessionAll);
    app.get("/api/session/reset", resetSession);
    app.get("/api/session/set/:name/:value", setSession);
  };
  
  export default SessionController;
// Lab5/PathParameters.js
export default function PathParameters(app) {
    // GET request to add two numbers provided in the path
    app.get("/lab5/add/:a/:b", (req, res) => {
      const { a, b } = req.params;
      const numA = parseInt(a);
      const numB = parseInt(b);
      // Basic validation to ensure both parameters are numbers
      if (isNaN(numA) || isNaN(numB)) {
        return res.status(400).send("Invalid parameters: 'a' and 'b' must be numbers");
      }
      res.send((numA + numB).toString());
    });
  
    // GET request to subtract two numbers provided in the path
    app.get("/lab5/subtract/:a/:b", (req, res) => {
      const { a, b } = req.params;
      const numA = parseInt(a);
      const numB = parseInt(b);
      // Basic validation to ensure both parameters are numbers
      if (isNaN(numA) || isNaN(numB)) {
        return res.status(400).send("Invalid parameters: 'a' and 'b' must be numbers");
      }
      res.send((numA - numB).toString());
    });
  
    // GET request to multiply two numbers provided in the path
    app.get("/lab5/multiply/:a/:b", (req, res) => {
      const { a, b } = req.params;
      const numA = parseInt(a);
      const numB = parseInt(b);
      // Basic validation to ensure both parameters are numbers
      if (isNaN(numA) || isNaN(numB)) {
        return res.status(400).send("Invalid parameters: 'a' and 'b' must be numbers");
      }
      res.send((numA * numB).toString());
    });
  
    // GET request to divide two numbers provided in the path
    app.get("/lab5/divide/:a/:b", (req, res) => {
      const { a, b } = req.params;
      const numA = parseInt(a);
      const numB = parseInt(b);
      // Basic validation to ensure both parameters are numbers
      if (isNaN(numA) || isNaN(numB)) {
        return res.status(400).send("Invalid parameters: 'a' and 'b' must be numbers");
      }
      if (numB === 0) {
        res.status(400).send("Cannot divide by zero");
      } else {
        res.send((numA / numB).toString());
      }
    });
  }
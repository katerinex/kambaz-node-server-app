// Lab5/QueryParameters.js
export default function QueryParameters(app) {
  app.get("/lab5/calculator", (req, res) => {
    const { a, b, operation } = req.query;
    let result;

    if (!a || !b || !operation) {
      return res.status(400).send("Missing parameters: a, b, or operation");
    }

    const numA = parseInt(a);
    const numB = parseInt(b);

    if (isNaN(numA) || isNaN(numB)) {
      return res.status(400).send("Invalid parameters: a and b must be numbers");
    }

    switch (operation) {
      case "add":
        result = numA + numB;
        break;
      case "subtract":
        result = numA - numB;
        break;
      case "multiply":
        result = numA * numB;
        break;
      case "divide":
        if (numB === 0) {
          return res.status(400).send("Cannot divide by zero");
        }
        result = numA / numB;
        break;
      default:
        result = "Invalid operation";
    }

    if (typeof result === 'number') {
      res.send(result.toString());
    } else {
      res.send(result);
    }
  });
}
//Lab5/PathParameters.js
export default function PathParameters(app) {
  app.get("/lab5/add/:a/:b", (req, res) => {
      const { a, b } = req.params;
      res.send((parseInt(a) + parseInt(b)).toString());
  });
  app.get("/lab5/subtract/:a/:b", (req, res) => {
      const { a, b } = req.params;
      res.send((parseInt(a) - parseInt(b)).toString());
  });
  app.get("/lab5/multiply/:a/:b", (req, res) => {
      const { a, b } = req.params;
      res.send((parseInt(a) * parseInt(b)).toString());
  });
  app.get("/lab5/divide/:a/:b", (req, res) => {
      const { a, b } = req.params;
      if (parseInt(b) === 0) {
          res.status(400).send("cannot divide by zero");
      } else {
          res.send((parseInt(a) / parseInt(b)).toString());
      }
  });

}
let loggedIn = true; // You can declare this inside the function if it's only used there

return ( // Implicit return of the JSX
  <div id="wd-ternary-operator">
    <h4>Logged In</h4>
    {loggedIn ? <p>Welcome</p> : <p>Please login</p>} <hr />
  </div>
);

//src/Labs/Lab3/index.tsx
import Add from "./Add";
import VariablesAndConstants from "./VariablesAndConstants";

export default function Lab3() {
  return(
    <div id="wd-lab3">
      <h3>Lab 3</h3>
      <VariablesAndConstants/>
      <Add a={3} b={4} />
    </div>
  );
}


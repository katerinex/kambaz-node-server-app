// src/Labs/Lab3/DestructingImports.tsx

import { add, subtract } from "./Math"; // Removed unused imports
import * as Matematica from "./Math";
import Math from "./Math"; // Import Math if it's the default export

export default function DestructingImports() {
  return (
    <div id="wd-destructuring-imports">
      <h2>Destructing Imports</h2>
      <table className="table table-sm">
        <thead>
          <tr>
            <td>Math.add(2, 3) = {Math.add(2, 3)}</td>
            <td>Matematica.add(2, 3) = {Matematica.add(2, 3)}</td>
            <td>add(2, 3) = {add(2, 3)}</td>
          </tr>
          <tr>
            <td>Math.subtract(5, 1) = {Math.subtract(5, 1)}</td>
            <td>Matematica.subtract(5, 1) = {Matematica.subtract(5, 1)}</td>
            <td>subtract(5, 1) = {subtract(5, 1)}</td>
          </tr>
          {/* Add multiply and divide if you need them in the table */}
          <tr>
            <td>Math.multiply(2, 3) = {Math.multiply(2, 3)}</td>
            <td>Matematica.multiply(2, 3) = {Matematica.multiply(2, 3)}</td>
            {/* <td>multiply(2, 3) = {multiply(2, 3)}</td>  <- Uncomment if you use multiply*/}
          </tr>
          <tr>
            <td>Math.divide(6, 2) = {Math.divide(6, 2)}</td>
            <td>Matematica.divide(6, 2) = {Matematica.divide(6, 2)}</td>
            {/* <td>divide(6, 2) = {divide(6, 2)}</td> <- Uncomment if you use divide */}
          </tr>
        </thead>
        <tbody>
          {/* see next code block */}
        </tbody>
      </table>
      <hr />
    </div>
  );
}


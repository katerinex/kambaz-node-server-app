//src/Labs/Lab3/index.tsx
import Add from "./Add";
import Square from "./Square";
import Highlight from "./Highlight";
import VariablesAndConstants from "./VariablesAndConstants";
import { useSelector } from "react-redux";
import { ListGroup } from 'react-bootstrap';

export default function Lab3() {
  const { todos } = useSelector((state: any) => state.todosReducer);
  return(
    <div id="wd-lab3">
      <h3>JavaScript</h3>
      <ListGroup>
        {todos.map((todo: any) => (
          <ListGroup.Item key={todo.id}>
            {todo.title}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <hr />

      <VariablesAndConstants/>
      <Add a={3} b={4} />
      <h4>Square of 4</h4>
      <Square>4</Square>
      <hr />
      <Highlight>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipitratione eaque illo minus cum, saepe totam
        vel nihil repellat nemo explicabo excepturi consectetur. Modi omnis minus sequi maiores, provident voluptates.
     </Highlight>

    </div>
  );
}


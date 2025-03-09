import { useSelector, useDispatch } from "react-redux";
import { setMessage } from "./helloReducer"; // Corrected import

export default function HelloRedux() {
  const { message } = useSelector((state: any) => state.helloReducer);
  const dispatch = useDispatch();

  const handleButtonClick = () => {
    dispatch(setMessage("New message from useDispatch!"));
  };

  return (
    <div id="wd-hello-redux">
      <h3>Hello Redux</h3>
      <h4>{message}</h4>
      <hr />
      <button onClick={handleButtonClick}>Change Message</button>
    </div>
  );
}

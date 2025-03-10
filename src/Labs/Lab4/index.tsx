// src/Labs/Lab4/index.tsx
import ReduxExamples from "./ReduxExamples";
import PassingFunctions from "./PassingFunctions";
import ArrayStateVariable from "./ArrayStateVariable";
import BooleanStateVariables from "./BooleanStateVariables";
import ChildStateComponent from "./ChildStateComponent";
import ClickEvent from "./ClickEvent";
import Counter from "./Counter";
import DateStateVariable from "./DateStateVariable";
import EventObject from "./EventObject";
import ObjectStateVariable from "./ObjectStateVariable";
import ParentStateComponent from "./ParentStateComponent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import StringStateVariables from "./StringStateVariables";
import { useState } from "react";
import AddRedux from "./ReduxExamples/AddRedux";
import CounterRedux from "./ReduxExamples/CounterRedux";
import HelloRedux from "./ReduxExamples/HelloRedux";

export default function Lab4() {
  function sayHello() {
    alert("Hello");
  }

  const [counter, setCounter] = useState(0);

  return (
    <div id="wd-passing-functions">
      <h2>Lab 4</h2>
      <ReduxExamples />
      <PassingFunctions theFunction={sayHello} />
      <ArrayStateVariable />
      <BooleanStateVariables />
      <ChildStateComponent counter={counter} setCounter={setCounter} />
      <ClickEvent />
      <Counter />
      <DateStateVariable />
      <EventObject />
      <ObjectStateVariable />
      <ParentStateComponent />
      <PassingDataOnEvent />
      <StringStateVariables />
      <AddRedux />
      <CounterRedux />
      <HelloRedux />
      <hr />
      <h2>End of Lab 4</h2>
      <hr />
    </div>
  );
}


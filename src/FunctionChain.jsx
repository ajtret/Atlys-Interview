import React, { useState, useEffect } from "react";
import './FunctionChain.css';

const initialFunctions = [
  { id: 1, equation: "x^2", next: 2 },
  { id: 2, equation: "2*x+4", next: 4 },
  { id: 3, equation: "x^2+20", next: null },
  { id: 4, equation: "x-2", next: 5 },
  { id: 5, equation: "x/2", next: 3 },
];

const evaluateEquation = (equation, x) => {
  try {
    return new Function("x", `return ${equation.replace(/\^/g, "**")}`)(x);
  } catch (error) {
    return "Error";
  }
};

const FunctionCard = ({ func, onUpdate, inputValue, outputValue }) => {
  return (
    <div className="function-card">
      <h3 className="function-id">Function: {func.id}</h3>
      
      <label className="label">Equation</label>
      <input
        type="text"
        value={func.equation}
        onChange={(e) => onUpdate(func.id, e.target.value)}
        className="input"
      />

      <label className="label">Next function</label>
      <select className="select" disabled>
        <option>{func.next ? `Function: ${func.next}` : "Final Output"}</option>
      </select>

      <label className="label">Input Value</label>
      <input
        type="text"
        value={inputValue}
        className="input disabled"
        disabled
      />
      
      <label className="label">Output Value</label>
      <input
        type="text"
        value={outputValue}
        className="input disabled"
        disabled
      />
    </div>
  );
};

const FunctionChain = () => {
  const [functions, setFunctions] = useState(initialFunctions);
  const [initialX, setInitialX] = useState(2);
  const [results, setResults] = useState({});
  const [inputs, setInputs] = useState({});

  useEffect(() => {
    let values = {};
    let inputsMap = {};
    let x = initialX;
    let funcMap = Object.fromEntries(functions.map((f) => [f.id, f]));
    let func = funcMap[1];

    while (func) {
      inputsMap[func.id] = x;
      x = evaluateEquation(func.equation, x);
      values[func.id] = x;
      func = func.next ? funcMap[func.next] : null;
    }

    setResults(values);
    setInputs(inputsMap);
  }, [functions, initialX]);

  const updateEquation = (id, newEquation) => {
    setFunctions((prev) =>
      prev.map((func) => (func.id === id ? { ...func, equation: newEquation } : func))
    );
  };

  return (
    <div className="app-container">
      <div className="input-container">
        <label className="label">Initial Value of x</label>
        <input
          type="number"
          value={initialX}
          onChange={(e) => setInitialX(Number(e.target.value))}
          className="number-input"
        />
      </div>

      <div className="function-cards">
        {functions.map((func) => (
          <FunctionCard 
            key={func.id} 
            func={func} 
            onUpdate={updateEquation} 
            inputValue={inputs[func.id]} 
            outputValue={results[func.id]} 
          />
        ))}
      </div>

      <div className="final-output">
        Final Output y: {results[3]}
      </div>
    </div>
  );
};

export default FunctionChain;

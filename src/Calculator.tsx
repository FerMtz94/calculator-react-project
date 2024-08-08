import { useEffect, useState } from "react"
import CalculatorButton from "./Calculator-Button"
import "./styles.css"

export default function Calculator() {
  const rowsOfNumbers = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [0]]
  const operations = ["CE", "+", "-", "÷", "x", "="]

  const initialOperationState = {
    number1: 0,
    number2: 0,
    operation: "",
    result: 0,
    isFirstAdded: false,
    isSecondAdded: false,
  }
  const [operationProcess, setOperationProcess] = useState(
    initialOperationState
  )
  const [calculatorOutput, setCalculatorOutput] = useState("0")

  useEffect(() => {
    if (operationProcess.isSecondAdded) {
      setCalculatorOutput(String(operationProcess.result))
      setOperationProcess(initialOperationState)
    }
  }, [operationProcess])

  const writeNumber = (e: any) => {
    e.stopPropagation()
    if (calculatorOutput !== "0") {
      setCalculatorOutput((prev) => prev + e.target.innerText)
      return
    }
    if (e.target.innerText === "0") {
      setCalculatorOutput("0")
      return
    }
    if (e.target.innerText === "." && calculatorOutput === "0") {
      setCalculatorOutput("0" + e.target.innerText)
      return
    }
    setCalculatorOutput(e.target.innerText)
  }

  const performOperation = (e: any) => {
    switch (e.target.innerText) {
      case "CE":
        setOperationProcess(initialOperationState)
        setCalculatorOutput("0")
        break
      case "+":
      case "-":
      case "÷":
      case "x":
        setOperationProcess({
          ...operationProcess,
          number1: parseInt(calculatorOutput),
          operation: e.target.innerText,
          isFirstAdded: true,
        })
        setCalculatorOutput("0")
        break
      default:
        if (operationProcess.isFirstAdded) {
          switch (operationProcess.operation) {
            case "+":
              setOperationProcess({
                ...operationProcess,
                number2: parseInt(calculatorOutput),
                isSecondAdded: true,
                result: operationProcess.number1 + parseInt(calculatorOutput),
              })
              break
            case "-":
              setOperationProcess({
                ...operationProcess,
                number2: parseInt(calculatorOutput),
                isSecondAdded: true,
                result: operationProcess.number1 - parseInt(calculatorOutput),
              })
              break
            case "÷":
              setOperationProcess({
                ...operationProcess,
                number2: parseInt(calculatorOutput),
                isSecondAdded: true,
                result: operationProcess.number1 / parseInt(calculatorOutput),
              })
              break
            case "x":
              setOperationProcess({
                ...operationProcess,
                number2: parseInt(calculatorOutput),
                isSecondAdded: true,
                result: operationProcess.number1 * parseInt(calculatorOutput),
              })
              break
          }
        }
    }
  }

  return (
    <div className="Calculator">
      <h1 style={{ textAlign: "center" }}>Welcome to the calculator app!</h1>
      <div className="calculator-border">
        <div className="calculator-result">{calculatorOutput}</div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div className="calculator-column">
            {rowsOfNumbers.map((row) => (
              <div className="button-row">
                {row.map((calcNumber) => (
                  <CalculatorButton handleClick={(e: any) => writeNumber(e)}>
                    {calcNumber}
                  </CalculatorButton>
                ))}
              </div>
            ))}
          </div>
          <div className="calculator-column">
            {operations.map((operation) => (
              <CalculatorButton handleClick={(e) => performOperation(e)}>
                {operation}
              </CalculatorButton>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

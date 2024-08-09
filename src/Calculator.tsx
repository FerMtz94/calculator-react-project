import { useEffect, useState } from "react"
import CalculatorButton from "./Calculator-Button"
import Result from "./Result"
import "./styles.css"

export default function Calculator() {
  const rowsOfNumbers = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [0, "."],
  ]
  const operations = ["CE", "+", "-", "÷", "x", "="]

  const initialOperationState = {
    numbers: [] as number[],
    operation: "",
  }
  const [operationProcess, setOperationProcess] = useState(
    initialOperationState
  )
  const [calculatorOutput, setCalculatorOutput] = useState("0")
  const [isFirstType, setIsFirstType] = useState(true)

  useEffect(() => {
    const canPerformOperation =
      operationProcess.numbers.length >= 2 &&
      operationProcess.operation.length > 0

    if (canPerformOperation) {
      const operationResult = operationProcess.numbers.reduce(
        (accumulatedValue, current) => {
          switch (operationProcess.operation) {
            case "+":
              return accumulatedValue + current
            case "-":
              return accumulatedValue - current
            case "÷":
              return accumulatedValue / current
            default:
              return accumulatedValue * current
          }
        }
      )

      setOperationProcess({
        ...operationProcess,
        numbers: [operationResult],
        // operation: "",
      })

      setCalculatorOutput(String(operationResult))
      setIsFirstType(true)

      console.log(operationProcess)
    }
  }, [operationProcess])

  const writeNumber = (e: any) => {
    e.stopPropagation()
    const buttonText = e.target.innerText

    if (calculatorOutput.includes(".") && buttonText === ".") {
      return
    }
    if (calculatorOutput === "0") {
      if (buttonText === "0") {
        return
      }
      if (buttonText === ".") {
        setCalculatorOutput((prev) => prev + buttonText)
        setIsFirstType(false)
        return
      }
      setCalculatorOutput(buttonText)
      setIsFirstType(false)
      return
    }

    if (isFirstType) {
      setCalculatorOutput(buttonText)
      setIsFirstType(false)
      return
    }
    setCalculatorOutput((prev) => prev + buttonText)
  }

  const performOperation = (e: any) => {
    switch (e.target.innerText) {
      case "CE":
        setOperationProcess(initialOperationState)
        setCalculatorOutput("0")
        setIsFirstType(true)
        break
      case "+":
      case "-":
      case "÷":
      case "x":
        setOperationProcess((prev) => {
          if (
            prev.numbers[prev.numbers.length - 1] !==
            parseFloat(calculatorOutput)
          ) {
            return {
              ...operationProcess,
              numbers: [
                ...operationProcess.numbers,
                parseFloat(calculatorOutput),
              ],
              operation: e.target.innerText,
            }
          }
          return {
            ...operationProcess,
            numbers: [...operationProcess.numbers],
            operation: e.target.innerText,
          }
        })
        setCalculatorOutput("0")
        break
      case "=":
        setOperationProcess((prev) => {
          if (
            prev.numbers[prev.numbers.length - 1] !==
            parseFloat(calculatorOutput)
          ) {
            return {
              ...operationProcess,
              numbers: [
                ...operationProcess.numbers,
                parseFloat(calculatorOutput),
              ],
              operation: operationProcess.operation,
            }
          }
          return {
            ...operationProcess,
            numbers: [...operationProcess.numbers],
            operation: operationProcess.operation,
          }
        })
        console.log(operationProcess)
        break
    }
  }

  return (
    <div className="Calculator">
      <div className="calculator-border">
        <Result calculatorOutput={calculatorOutput} />
        <div className="calculator-content">
          <div className="calculator-numbers">
            {rowsOfNumbers.map((row) => (
              <div className="button-row">
                {row.map((calcNumber) => (
                  <CalculatorButton
                    key={calcNumber}
                    handleClick={(e: any) => writeNumber(e)}
                  >
                    {calcNumber}
                  </CalculatorButton>
                ))}
              </div>
            ))}
          </div>
          <div className="calculator-column">
            {operations.map((operation) => (
              <CalculatorButton
                key={operation}
                handleClick={(e) => performOperation(e)}
              >
                {operation}
              </CalculatorButton>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

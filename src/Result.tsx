type ResultProps = {
  calculatorOutput: string
  children?: React.ReactNode
}

const Result: React.FC<ResultProps> = ({ calculatorOutput }) => {
  return (
    <div className="calculator-result-container">
      <div className="calculator-result">
        <p>{calculatorOutput}</p>
      </div>
    </div>
  )
}

export default Result

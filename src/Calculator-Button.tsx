type CalculatorProps = {
  handleClick: () => unknown;
  children: number | number[] | string;
};

export default function CalculatorButton({
  handleClick,
  children,
}: CalculatorProps) {
  return (
    <button className="calculator-button" onClick={handleClick}>
      {children}
    </button>
  );
}

interface PriceProps {
  children: number | undefined;
  className?: string;
}

const Price = ({ children, className = '' }: PriceProps) => {
  return <p className={`text-sm ${className}`}>₹ {children?.toFixed(2)}</p>;
};

export default Price;

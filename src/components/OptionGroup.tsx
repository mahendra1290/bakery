export interface Option {
  name: string;
  price: number;
}

export interface OptionGroupProps {
  name: string;
  options: Option[];
  selected?: Option[];
  onSelect?: (selected: Option[]) => void;
  isMultiple?: boolean;
  required?: boolean;
}

const OptionGroup = ({
  options,
  name,
  selected = [],
  isMultiple,
  onSelect,
  required,
}: OptionGroupProps) => {
  const handleChange = (value: Option) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onSelect) {
      return;
    }
    if (isMultiple) {
      if (e.target.checked) {
        onSelect([...selected, value]);
      } else {
        onSelect(selected.filter((option) => option !== value));
      }
    } else {
      onSelect([value]);
    }
  };

  const listOptions = options.map((option) => (
    <label
      key={option.name}
      className='flex justify-between flex-row-reverse'
      htmlFor={option.name}
    >
      <input
        className='accent-red-500 peer'
        type={isMultiple ? 'checkbox' : 'radio'}
        checked={selected?.includes(option)}
        name={name}
        value={option.name}
        id={option.name}
        onChange={handleChange(option)}
      />
      <span className='peer-checked:text-red-500 text-gray-500'>
        {option.name} - ₹ {option.price}
      </span>
    </label>
  ));

  return (
    <div>
      <p className='text-lg'>
        {name} {required && <span className='text-red-500'>*</span>}
      </p>
      <ul>{listOptions}</ul>
    </div>
  );
};

export default OptionGroup;

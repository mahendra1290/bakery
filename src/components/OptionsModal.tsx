import { Fragment, useState } from 'react';
import OptionGroup, { Option } from './OptionGroup';
import Modal from './Modal';
import { AddRemoveButton } from './AddButton';

export interface OptionGroup {
  name: string;
  options: Option[];
  isMultiple?: boolean;
  required?: boolean;
}

interface OptionsModalProps {
  basePrice: number;
  title: string;
  open: boolean;
  onClose: () => void;
  options: OptionGroup[];
  onAddToCart: (options: Record<string, Option[]>, quantity: number) => void;
}

const OptionsModal = ({
  open,
  onClose,
  options,
  basePrice,
  title,
  onAddToCart,
}: OptionsModalProps) => {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, Option[]>>({});
  const [quantity, setQuantity] = useState(1);

  const totalPrice =
    basePrice +
    Object.values(selectedOptions).reduce((acc, options) => {
      return acc + options.reduce((accInt, option) => accInt + option.price, 0);
    }, 0);

  const resetState = () => {
    setQuantity(1);
    setSelectedOptions({});
  };

  return (
    <Modal
      title={title}
      open={open}
      onClose={() => {
        resetState();
        onClose();
      }}
    >
      <>
        <div className='max-h-[50vh] overflow-auto'>
          <hr className='my-2' />
          {options.map((option) => (
            <Fragment key={option.name}>
              <OptionGroup
                selected={selectedOptions[option.name]}
                onSelect={(selected) =>
                  setSelectedOptions({ ...selectedOptions, [option.name]: selected })
                }
                options={option.options}
                name={option.name}
                isMultiple={option.isMultiple}
                required={option.required}
              />
              <hr className='my-2' />
            </Fragment>
          ))}
        </div>
        <div className='flex items-center justify-between mt-2'>
          <AddRemoveButton
            quantity={quantity}
            onAdd={() => setQuantity(quantity + 1)}
            onRemove={() => setQuantity(quantity - 1)}
          />
          <button
            className='btn-outline'
            onClick={() => {
              onAddToCart(selectedOptions, quantity);
              resetState();
            }}
          >
            Add item ₹ {(totalPrice * quantity).toFixed(2)}
          </button>
        </div>
      </>
    </Modal>
  );
};

export default OptionsModal;

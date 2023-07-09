interface AddButtonProps {
  quantity?: number;
  onAdd: () => void;
  onRemove: () => void;
}

const AddRemoveButton = ({ quantity, onAdd, onRemove }: AddButtonProps) => {
  return (
    <div className='text-white bg-red-500 whitespace-nowrap w-fit h-fit rounded-md'>
      <button
        onClick={onRemove}
        className='btn-outline btn-sm px-0 w-8 hover:scale-100 rounded-e-none'
      >
        -
      </button>
      <span className='mx-2 h-full'>{quantity}</span>
      <button
        onClick={onAdd}
        className='btn-outline btn-sm px-0  w-8 hover:scale-100 rounded-s-none'
      >
        +
      </button>
    </div>
  );
};

const AddButton = ({ quantity, onAdd, onRemove }: AddButtonProps) => {
  return (
    <>
      {(!quantity || quantity === 0) && (
        <button onClick={onAdd} className='btn-outline btn-sm  whitespace-nowrap'>
          + Add
        </button>
      )}
      {quantity != undefined && quantity > 0 && (
        <AddRemoveButton quantity={quantity} onAdd={onAdd} onRemove={onRemove} />
      )}
    </>
  );
};

export { AddButton, AddRemoveButton };

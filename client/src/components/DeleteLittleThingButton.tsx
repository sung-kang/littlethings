import { Dispatch, SetStateAction } from 'react';

interface DeleteLittleThingButtonProps {
  deletable: boolean;
  setDeletable: Dispatch<SetStateAction<boolean>>;
}

const DeleteLittleThingButton = ({
  deletable,
  setDeletable,
}: DeleteLittleThingButtonProps) => {
  return (
    <button
      onClick={() => setDeletable(!deletable)}
      className="flex justify-center items-center w-[36px] h-[36px] ml-2 text-4xl rounded-md border border-input hover:text-destructive"
    >
      -
    </button>
  );
};

export default DeleteLittleThingButton;

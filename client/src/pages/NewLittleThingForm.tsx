import { createPost } from '@/api-client/homepage';
import { Post } from '@/api-client/homepageutility';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { Dispatch, SetStateAction } from 'react';

interface TestComponentsProps {
  handleClose: () => void;
  handleOpen: () => void;
  setPosts: Dispatch<SetStateAction<Post[]>>;
}

const NewLittleThingForm = ({
  handleClose,
  handleOpen,
  setPosts,
}: TestComponentsProps) => {
  const { register, handleSubmit } = useForm<Post>();

  const createPostHandler = async (postData: Post) => {
    const data = await createPost(postData);
    setPosts((posts) => [...posts, { ...data.message }]);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          onClick={handleOpen}
        >
          New Littlething
        </Button>
      </DialogTrigger>
      <DialogContent className=" sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Littlething</DialogTitle>
          <DialogDescription>
            Create your new littlething here!
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(createPostHandler)}
          className="flex flex-col justify-center items-center gap-6"
        >
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="littlething" className="text-right">
                Littlething:
              </Label>
              <Input
                {...register('littlething', { required: true })}
                id="littlething"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description:
              </Label>
              <Input
                {...register('description', { required: true })}
                id="description"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="frequency" className="text-right">
                Frequency:
              </Label>
              <Input
                {...register('frequency', { required: true })}
                id="frequency"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="occurence" className="text-right">
                Occurence:
              </Label>
              <Input
                {...register('occurence', { required: true })}
                id="occurence"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              className="bg-[#99b4df]"
              onClick={handleClose}
              type="submit"
            >
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewLittleThingForm;

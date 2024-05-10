import * as littlethingsApi from '@/api-client/littlethingsApi';
import { Post } from '@/types/LittleThingTypes';
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
import { Frequency } from '@/types/LittleThingTypes';

interface PostForm {
  littlething: string;
  occurrence: number;
  frequency: Frequency;
  description: string;
  completion: number;
  user_id: string;
  createdAt: string;
  updatedAt: string;
  id: string;
  completionCount: number;
}

interface FormComponentProps {
  setPosts: Dispatch<SetStateAction<Post[]>>;
}

const NewLittleThingForm = ({ setPosts }: FormComponentProps) => {
  const { register, handleSubmit } = useForm<PostForm>();

  const createPostHandler = async (postData: PostForm) => {
    const data = await littlethingsApi.createPost(postData);
    setPosts((posts) => [...posts, { ...data.message }]);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex justify-center items-center w-[36px] h-[36px] ml-2 text-4xl rounded-md border border-input hover:text-lt-green-3">
          +
        </button>
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
              <Label htmlFor="occurrence" className="text-right">
                Occurrence:
              </Label>
              <Input
                {...register('occurrence', { required: true })}
                id="occurrence"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button className="bg-[#99b4df]" type="submit">
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewLittleThingForm;

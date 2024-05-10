import { Dispatch, SetStateAction } from 'react';
import {
  DeleteLittleThingButton,
  NewLittleThingForm,
  SortLittleThingsSelect,
} from '@/components';
import { Post } from '@/types/LittleThingTypes';

interface LittleThingNavBarProps {
  posts: Post[];
  setPosts: Dispatch<SetStateAction<Post[]>>;
  deletable: boolean;
  setDeletable: Dispatch<SetStateAction<boolean>>;
}

const LittleThingNavBar = ({
  posts,
  setPosts,
  deletable,
  setDeletable,
}: LittleThingNavBarProps) => {
  return (
    <div className="flex justify-center items-center mt-4">
      <SortLittleThingsSelect posts={posts} setPosts={setPosts} />
      <DeleteLittleThingButton
        deletable={deletable}
        setDeletable={setDeletable}
      />
      <NewLittleThingForm setPosts={setPosts} />
    </div>
  );
};

export default LittleThingNavBar;

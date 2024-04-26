import useAuthContext from '@/hooks/useAuthContext';
import { useEffect, useState } from 'react';

import * as littlethingsApi from '@/api-client/littlethingsApi';
import { Post } from '@/api-client/homepageutility';
import NewLittleThingForm from './NewLittleThingForm';

import TestComponents from './TestComponents';

const HomePage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const { user } = useAuthContext();
  const [create, setCreate] = useState(false);
  const [deletable, setDeletable] = useState(false);

  const deleteButtonState = () => {
    setDeletable(!deletable);
  };

  useEffect(() => {
    getPostsHandler();
  }, []);

  const handleClose = () => {
    setCreate(false);
  };

  const handleOpen = () => {
    setCreate((create) => !create);
  };

  const getPostsHandler = async () => {
    const data = await littlethingsApi.getAllPosts();
    setPosts(data);
  };

  return (
    <>
      <div className="relative">
        <button
          onClick={deleteButtonState}
          className="absolute top-0 right-10 m-4 z-50 text-4xl text-gray-800"
        >
          -
        </button>
        <div>
          <NewLittleThingForm
            handleOpen={handleOpen}
            handleClose={handleClose}
            setPosts={setPosts}
          />
        </div>
        <div className="flex justify-center items-center">
          <div className=" grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10 p-10 ">
            {posts.map((post) => (
              <TestComponents
                posts={posts}
                setPosts={setPosts}
                postId={post.id}
                littlething={post.littlething}
                description={post.description}
                frequency={post.frequency}
                occurence={post.occurence}
                createdAt={post.createdAt}
                deletable={deletable}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;

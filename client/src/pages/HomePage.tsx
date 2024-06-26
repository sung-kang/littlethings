import { useEffect, useState } from 'react';
import * as littlethingsApi from '@/api-client/littlethingsApi';
import { Post } from '@/types/LittleThingTypes';
import { LittleThingCard, LittleThingNavBar } from '@/components';
import { sortByUrgencyDescending } from '@/utils/sortLittleThings';

const HomePage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [deletable, setDeletable] = useState(false);

  useEffect(() => {
    getPostsHandler();
  }, []);

  const getPostsHandler = async () => {
    const initialPosts = await littlethingsApi.getAllPosts();
    const initialSortedPosts = sortByUrgencyDescending(initialPosts);
    setPosts(initialSortedPosts);
  };

  return (
    <>
      <LittleThingNavBar
        posts={posts}
        setPosts={setPosts}
        deletable={deletable}
        setDeletable={setDeletable}
      />
      <div className="flex flex-wrap justify-center gap-10 p-10">
        {posts.map((post) => (
          <LittleThingCard
            key={post.id}
            post={post}
            setPosts={setPosts}
            deletable={deletable}
          />
        ))}
      </div>
    </>
  );
};

export default HomePage;

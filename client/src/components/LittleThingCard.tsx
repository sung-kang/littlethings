import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import clsx from 'clsx';
import * as littlethingsApi from '@/api-client/littlethingsApi';
import { Dispatch, SetStateAction } from 'react';
import { Frequency, TimeOptions } from '@/types/LittleThingTypes';
import { Post } from '@/types/LittleThingTypes';

interface CardComponentProps {
  setPosts: Dispatch<SetStateAction<Post[]>>;
  littlething: string;
  description: string;
  frequency: Frequency;
  occurrence: number;
  createdAt: string;
  user_id?: string;
  updatedAt?: string;
  key: string;
  postId: string;
  posts: Post[];
  deletable?: boolean;
}

const LittleThingCard = ({
  setPosts,
  littlething,
  description,
  frequency,
  occurrence,
  createdAt,

  postId,
  deletable,
}: CardComponentProps) => {
  const deletePostHandler = async (postId: string) => {
    const success = await littlethingsApi.deletePost(postId);
    if (success) {
      setPosts((posts) => posts.filter((post) => post.id !== postId));
    }
  };

  return (
    <div>
      <div
        key={postId}
        className={clsx(
          'max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 h-90 w-96 relative',
          { 'wiggle-animation': deletable }
        )}
      >
        {deletable && (
          <button
            onClick={() => deletePostHandler(postId)}
            className="w-5 h-5 absolute top-2 left-[-15px] transform -translate-y-1/2 translate-x-1/2 p-1 bg-[#CE6A6C] rounded-full shadow-lg flex items-center justify-center"
            aria-label="Delete post"
          >
            <span className="text-white"></span>
          </button>
        )}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <div className="flex-shrink-0"></div>
            <div className="flex-1 min-w-0 ms-4">
              <div className="flex-shrink-0"></div>
              <p className="text-xl font-medium text-gray-900 truncate dark:text-white">
                <span className="text-lt-green-2">Little</span> Thing:{' '}
                {littlething}
                <span className="inline-flex items-end ml-2">
                  <a
                    href="#_"
                    className="relative px-2 py-0 overflow-hidden font-medium text-gray-600 bg-gray-100 border border-gray-100 rounded-full shadow-inner group"
                  >
                    <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
                    <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
                    <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                    <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
                    <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-lt-green-2 opacity-0 group-hover:opacity-100"></span>
                    <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">
                      +
                    </span>
                  </a>
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="flow-root">
          <ul
            role="list"
            className="divide-y divide-gray-200 dark:divide-gray-700"
          >
            <li className="py-3 sm:py-4">
              <div className="flex items-center">
                <div className="flex-shrink-0"></div>
                <div className="flex-1 min-w-0 ms-4">
                  <div className="flex-shrink-0"></div>
                  <div className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <div className="truncate">
                          Description: {description}
                        </div>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80">
                        <div className="flex justify-between space-x-4">
                          <div className="space-y-1">
                            <h4 className="text-sm font-semibold">
                              Description
                            </h4>
                            <p className="text-sm">{description}</p>
                            <div className="flex items-center pt-2">
                              <span className="text-xs text-muted-foreground">
                                About Your LittleThing{' '}
                              </span>
                            </div>
                          </div>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                </div>
              </div>
            </li>
            <li className="py-3 sm:py-4">
              <div className="flex items-center ">
                <div className="flex-shrink-0"></div>
                <div className="flex-1 min-w-0 ms-4">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    Frequency: {frequency}
                  </p>
                </div>
              </div>
            </li>
            <li className="py-3 sm:py-4">
              <div className="flex items-center">
                <div className="flex-shrink-0"></div>
                <div className="flex-1 min-w-0 ms-4">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    Occurrence: {occurrence}
                  </p>
                </div>
              </div>
            </li>
            <li className="py-3 sm:py-4">
              <div className="flex items-center ">
                <div className="flex-shrink-0"></div>
                <div className="flex-1 min-w-0 ms-4">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    Started:{' '}
                    {new Date(createdAt).toLocaleDateString(
                      'en-US',
                      TimeOptions
                    )}
                  </p>
                </div>
              </div>
            </li>
            <li className="pt-3 pb-0 sm:pt-4">
              <div className="flex items-center ">
                <div className="flex-shrink-0"></div>
                <div className="flex-1 min-w-0 ms-4">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    Completion Status:
                    <span className="inline-flex items-center ml-2">
                      {Array.from({ length: occurrence }).map((_, idx) => (
                        <span
                          key={idx}
                          className="w-2 h-2 rounded-full bg-green-500 mr-2"
                        ></span>
                      ))}
                    </span>
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LittleThingCard;

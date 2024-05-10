import { Dispatch, SetStateAction } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  sortByFrequencyAscending,
  sortByFrequencyDescending,
  sortByUrgencyAscending,
  sortByUrgencyDescending,
} from '@/utils/sortLittleThings';
import { Post } from '@/types/LittleThingTypes';

interface SortLittleThingsSelectProps {
  posts: Post[];
  setPosts: Dispatch<SetStateAction<Post[]>>;
}

export function SortLittleThingsSelect({
  posts,
  setPosts,
}: SortLittleThingsSelectProps) {
  const handleChange = (sortBy: string) => {
    let sortedPosts: Post[] = [...posts];

    switch (sortBy) {
      case 'frequency-ascending':
        sortedPosts = sortByFrequencyAscending(sortedPosts);
        break;
      case 'frequency-descending':
        sortedPosts = sortByFrequencyDescending(sortedPosts);
        break;
      case 'urgency-ascending':
        sortedPosts = sortByUrgencyAscending(sortedPosts);
        break;
      case 'urgency-descending':
        sortedPosts = sortByUrgencyDescending(sortedPosts);
        break;
      default:
        break;
    }

    setPosts(sortedPosts);
  };

  return (
    <Select defaultValue={'urgency-descending'} onValueChange={handleChange}>
      <SelectTrigger className="w-[260px] ">
        <SelectValue placeholder="Sort LittleThings By:" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort LittleThings By:</SelectLabel>
          <SelectItem value="frequency-ascending">
            Sort By Frequency (Ascending)
          </SelectItem>
          <SelectItem value="frequency-descending">
            Sort By Frequency (Descending)
          </SelectItem>
          <SelectItem value="urgency-ascending">
            Sort By Urgency (Ascending)
          </SelectItem>
          <SelectItem value="urgency-descending">
            Sort By Urgency (Descending)
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default SortLittleThingsSelect;

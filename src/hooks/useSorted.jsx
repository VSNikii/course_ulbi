import { useState } from "react";


export function useSorted(arr, func) {
  const [selectedSort, setSelectedSort] = useState('default');

  const sortPosts = (sort) => {
    setSelectedSort(sort);
    func([...arr].sort((a, b) => a[sort].localeCompare(b[sort])));
  };

  return {
    selectedSort, 
    setSelectedSort,
    sortPosts
  }

}

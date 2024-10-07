


export function useDeletePost(arr, func) {

  const onDeleteClickMyButton = (id) => {
    const filteredPosts = arr.filter((elem) => elem.id !== id);
    func(filteredPosts);
  };

  return {
    onDeleteClickMyButton
  }
}

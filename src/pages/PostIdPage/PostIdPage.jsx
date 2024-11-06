import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import PostService from '../../API/PostService';
import { useFetching } from '../../hooks/useFetching';
import { Loader } from '../../components/UI/loader/Loader';

export function PostIdPage() {
  const params = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [fetchPostById, isLoading, error] = useFetching(async (id) => {
    const response = await PostService.getById(id);
    console.log(response);
    setPost(response.data);
  });
  
  
  const [fetchComments, isCommentsLoading, errorComments] = useFetching(async (id) => {
    const response = await PostService.getByComments(id);
    console.log(response);
    setComments(response.data);
    
    
  });
  

  useEffect(() => {
    fetchPostById(params.id);
    fetchComments(params.id);
  }, []);

  return (
    <>
      <div>
        <h1>Вы открыли страницу поста c ID={params.id}</h1>

        {isLoading ? (
          <Loader />
        ) : (
          <div>
            {post.id} {post.title}
          </div>
        )}
        <h1>Комментарии</h1>
        <div>
          {isCommentsLoading ? (
            <Loader />
          ) : (
            <div>
              {comments.map((comments) => (
                <div style={{marginTop: 15}}>
                  <h5>{comments.email}</h5>
                  <div>{comments.name}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

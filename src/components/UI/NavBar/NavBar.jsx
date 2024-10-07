import { Link } from "react-router-dom";

export function NavBar({path, setPath}) {

    const onClickAbout = () => {
        setPath('/about');
        
    }

    const onClickPosts = () => {
        setPath('/posts');
        
    }

  return (
    <>
      <div className="navbar">
        <div className="navbar__links">
          <Link to='/about' onClick={onClickAbout}>About</Link>
          <Link to='/posts' onClick={onClickPosts}>Posts</Link>
        </div>
      </div>
    </>
  );
}

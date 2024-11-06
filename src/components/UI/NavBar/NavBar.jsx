import { Link } from 'react-router-dom';
import { useState } from 'react';
import { MyButton } from '../button/MyButton';
import { AuthContext } from '../../../context';
import { useContext } from 'react';

export function NavBar() {
  const {isAuth, setIsAuth} = useContext(AuthContext);
  let [path, setPath] = useState('/posts');

  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem('auth');
  }

  const onClickAbout = () => {
    setPath('/about');
  };

  const onClickPosts = () => {
    setPath('/posts');
  };

  return (
    <>
      <div className="navbar">
      <MyButton onClick={logout}>Выйти</MyButton>
        <div className="navbar__links">
          <Link to="/about" onClick={onClickAbout}>
            About
          </Link>
          <Link to="/posts" onClick={onClickPosts}>
            Posts
          </Link>
        </div>
      </div>
    </>
  );
}

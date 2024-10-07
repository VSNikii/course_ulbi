import { Route, Routes } from "react-router";
import { NotFound } from "../pages/NotFound/NotFound";
import { About } from "../pages/About";
import { Posts } from "../pages/Posts/Posts";
import { PostIdPage } from "../pages/PostIdPage/PostIdPage";

export function AppRouter() {
  return (
    <>
      <Routes>
        <Route path="/about" element={<About />} />
        <Route exact path="/posts" element={<Posts />} />
        <Route exact path="/posts/:id" element={<PostIdPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

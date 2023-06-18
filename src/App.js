import { Route, Routes } from "react-router-dom";
import "~/App.scss";
import HomePage from "~/pages/HomePage";
import Login from "./pages/Login";
import Authen from "./components/Authen";
import AllSinhVienPage from "./pages/AllSinhVienPage";
import SinhVienDetailPage from "./pages/SinhVienDetailPage";
import KhoaPage from "./pages/KhoaPage";
import KhoaDetailPage from "./pages/KhoaDetailPage";
import Register from "./pages/Register";
import UserPage from "./pages/UserPage";
import Layout from "./components/Layout";
import CreatePost from "./pages/CreatePost";
import PostDetailPage from "./pages/PostDetailPage";
import UpdatePostPage from "./pages/UpdatePostPage";
import GiangVienDetailPage from "./pages/GiangVienDetailPage";
import AllPostPage from "./pages/AllPostPage";
import AllGiangVienPage from "./pages/AllGiangVienPage";
import CreateGiangVienpage from "./pages/CreateGiangVienpage";

function App() {
  return (
    <div
      className="App"
      style={{ marginTop: "200px", paddingTop: "40px", paddingBottom: "40px" }}
    >
      <Routes>
        //authen
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<Layout />}>
          //route user
          <Route path="/user" element={<UserPage />} />
          <Route path="" element={<HomePage />} />
          //route giảng viên
          <Route path="/giangviens" element={<AllGiangVienPage />} />
          <Route path="/giangviens/create" element={<CreateGiangVienpage />} />
          <Route
            path="/giangviens/:giangVienId"
            element={<GiangVienDetailPage />}
          />
          //route sinh viên
          <Route path="/sinhviens" element={<AllSinhVienPage />} />
          <Route path="/sinhviens/create" element={<SinhVienDetailPage />} />
          <Route
            path="/sinhviens/:sinhVienId"
            element={<SinhVienDetailPage />}
          />
          //route khoa
          <Route path="/khoas" element={<KhoaPage />} />
          <Route path="/khoas/:khoaId" element={<KhoaDetailPage />} />
          //route bài viết
          <Route path="/posts" element={<AllPostPage />} />
          <Route path="/createPost" element={<CreatePost />} />
          <Route path="/posts/:postId" element={<PostDetailPage />} />
          <Route path="/posts/update/:postId" element={<UpdatePostPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

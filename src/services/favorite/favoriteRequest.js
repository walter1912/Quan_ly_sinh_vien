import axiosInstance from "../../utils/axiosInstance";

export const favoriteRequest = {
  checkExist: async function (userId, postId) {
    try {
      let url = `/Favorites/checkExist?userId=${userId}&postId=${postId}`;
      
      let res = await axiosInstance.post(url);
      console.log("Kết quả khi trả về favorite", res);
      return res;
    } catch (err) {
      console.log("Lỗi khi tìm favorite", err);
      return err;
    }
  },
  create: async function (data) {
    try {
      let url = `/Favorites`;
      let createAt = new Date().toISOString();
      let updateAt = new Date().toISOString();
      let dataPost = { ...data, createAt, updateAt };
      let res = await axiosInstance.post(url, dataPost);
      return res.data;
    } catch (err) {
      console.log("Lỗi khi thích 1 bài viết", err);
    }
  },
  getById: async function (id) {
    try {
      let url = `/Favorites/${id}`;
      let res = await axiosInstance.get(url);
      // trả về 1
      return res;
    } catch (err) {
      console.log("Lỗi khi lấy thông tin 1 lượt thích", err);
    }
  },
  getByUserId: async function (userId) {
    try {
      let url = `/Favorites/user/${userId}`;
      let res = await axiosInstance.get(url);
      //trả về mảng
      return res.data;
    } catch (err) {
      console.log(
        "Lỗi khi lấy thông tin các lượt thích bởi user có userId = ",
        userId,
        err
      );
    }
  },
  getByPostId: async function (postId) {
    try {
      let url = `/Favorites/post/${postId}`;
      let res = await axiosInstance.get(url);
      //trả về mảng
      return res.data;
    } catch (err) {
      console.log(
        "Lỗi khi lấy thông tin các lượt thích của bài viết có postId = ",
        postId,
        err
      );
    }
  },
  update: async function (data) {
    try {
      let url = `/Favorites/${data.id}`;
      let updateAt = new Date().toISOString();
      let dataPut = { ...data, updateAt };
      let res = await axiosInstance.put(url, dataPut);
      if (data.type === 1) {
        console.log("Bạn vừa thích bài viết", res);
      } else console.log("Bạn không thích bài viết", res);

      return res;
    } catch (err) {
      console.log("Lỗi khi cập nhật trạng thái favorite", err);
    }
  },
};

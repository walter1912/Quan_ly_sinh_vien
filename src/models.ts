export interface SinhVienDTO {
  id: string;
  tenSV: string;
  maSV: string;
  ngaySinh: any;
  gioiTinh: string;
  khoaId: string;
  isEdit: boolean;
  tenKhoa: string;

  //
  userId: string;
}
export interface GiangVienDTO {
  id: string;
  tenGV: string;
  maGV: string;
  ngaySinh: any;
  gioiTinh: string;
  khoaId: string;
  isEdit: boolean;
  email: string;
}
export interface KhoaDTO {
  id: string;
  ten: string;
}
export interface UserDTO {
  id: string;
  username: string;
  password: string;
  role: number;
  ten: string;
  ma: string;
  ngaySinh: any;
  gioiTinh: string;
  khoaId: string;
  email: string;
  // 1 với giảng viên, 2 với sinh viên
}
export interface PostDTO {
  id: string;
  userId: string;
  title: string;
  createAt: any;
  updateAt: any;
  thumbnail: string;
}

export interface CommentDTO {
  id: string; //PK auto từ id = 1
  postId: string; //FK from post
  userId: string; //FK from user
  //id của comment mà mình rep, trường hợp bình luận đầu tiên thì id = 0
  // để tránh trường hợp nhầm là rep comment khác.
  repCommentId: string;
  // nội dung comment chỉ dùng text;
  //dùng textArea
  content: string;
  // thời gian tạo comment, sẽ đc tạo trong comment services
  createAt: any;
  //level của user cmt, level = 0 là người cmt đầu tiên, level = 1 là user cmt level = 0, ...
  level: number;
}
export interface FavoriteDTO {
  id: string;
  postId: string;
  userId: string;
  createAt: any;
  updateAt: any;
  type: number;
  // 1 là like
  //2 là unlike
}
export const initialSinhVien: SinhVienDTO = {
  ngaySinh: new Date().toISOString(),
  id: "",
  tenSV: "",
  maSV: "",
  gioiTinh: "",
  khoaId: "",
  isEdit: false,
  tenKhoa: "",
  userId: ""
};

export const initialGiangVien: GiangVienDTO = {
  ngaySinh: new Date().toISOString(),
  id: "",
  tenGV: "",
  maGV: "",
  gioiTinh: "",
  khoaId: "",
  isEdit: false,
  email: ""
};

export const initialKhoa: KhoaDTO = {
  ten: "",
  id: ""
};
export const initialUser: UserDTO = {
  id: "",
  username: "",
  password: "",
  role: 0,
  ten: "",
  ma: "",
  ngaySinh: new Date().toISOString(),
  gioiTinh: "",
  khoaId: "",
  email: ""
};

export const initialPost: PostDTO = {
  id: "",
  userId: "",
  title: "",
  createAt: new Date().toISOString(),
  updateAt: new Date().toISOString(),
  thumbnail: ""
};

export const initialComment: CommentDTO = {
  id: "",
  postId: "",
  userId: "",
  repCommentId: "",
  content: "",
  createAt: new Date().toISOString(),
  level: 0
};

export const initialFavorite: FavoriteDTO = {
  id: "",
  postId: "",
  userId: "",
  createAt: new Date().toISOString(),
  updateAt: new Date().toISOString(),
  type: 0
};





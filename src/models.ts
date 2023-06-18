export interface SinhVienDTO {
  id: number;
  tenSV: string;
  maSV: string;
  ngaySinh: any;
  gioiTinh: string;
  khoaId: number;
  isEdit: boolean;
  tenKhoa: string;

  //
  giangVienId: number;
}
export interface GiangVienDTO {
  id: number;
  tenGV: string;
  maGV: string;
  ngaySinh: any;
  gioiTinh: string;
  khoaId: number;
  isEdit: boolean;
  email: string;
}
export interface KhoaDTO {
  id: number;
  ten: string;
}
export interface UserDTO {
  id: number;
  username: string;
  password: string;
  role: number;
  ten: string;
  ma: string;
  ngaySinh: any;
  gioiTinh: string;
  khoaId: number;
  email: string;
  // 1 với giảng viên, 2 với sinh viên
}
export interface PostDTO {
  id: number;
  userId: number;
  title: string;
  createAt: any;
  updateAt: any;
  thumbnail: string;
}

export interface CommentDTO {
  id: number; //PK auto từ id = 1
  postId: number; //FK from post
  userId: number; //FK from user
  //id của comment mà mình rep, trường hợp bình luận đầu tiên thì id = 0
  // để tránh trường hợp nhầm là rep comment khác.
  repCommentId: number;
  // nội dung comment chỉ dùng text;
  //dùng textArea
  content: string;
  // thời gian tạo comment, sẽ đc tạo trong comment services
  createAt: any;
  //level của user cmt, level = 0 là người cmt đầu tiên, level = 1 là user cmt level = 0, ...
  level: number;
}
export interface FavoriteDTO {
  id: number;
  postId: number;
  userId: number;
  createAt: any;
  updateAt: any;
  type: number;
  // 1 là like
  //2 là unlike
}
export const initialSinhVien: SinhVienDTO = {
  id: 0,
  tenSV: "",
  maSV: "",
  ngaySinh: new Date().toISOString(),
  gioiTinh: null,
  khoaId: 1,
  isEdit: false,
  tenKhoa: "",
  giangVienId: 0,
};

export const initialGiangVien: GiangVienDTO = {
  id: 0,
  tenGV: "",
  maGV: "",
  ngaySinh: new Date().toISOString(),
  gioiTinh: null,
  khoaId: 1,
  isEdit: false,
  email: "",
};

export const initialKhoa: KhoaDTO = {
  id: 1,
  ten: "",
};
export const initialUser: UserDTO = {
  id: 1,
  username: "",
  password: "",
  role: 2,
  ten: "",
  ma: "",
  ngaySinh: undefined,
  gioiTinh: "",
  khoaId: 0,
  email: "",
};

export const initialPost: PostDTO = {
  id: 0,
  userId: 0,
  title: "",
  createAt: new Date().toISOString(),
  updateAt: new Date().toISOString(),
  thumbnail: "",
};

export const initialComment: CommentDTO = {
  id: 0,
  postId: 0,
  userId: 0,
  repCommentId: 0,
  content: "",
  createAt: new Date().toISOString(),
  level: 0,
};

export const initialFavorite: FavoriteDTO = {
  id: 0,
  postId: 0,
  userId: 0,
  createAt: new Date().toISOString(),
  updateAt: new Date().toISOString(),
  type: 1,
};





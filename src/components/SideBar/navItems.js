export const navItems = [
  {
    name: "Trang chủ",
    route: "",
    des: "Trang chủ",
  },
  {
    name: "Sinh viên",
    // route: "sinhviens",
    des: "Tất cả sinh viên",
    listMenu: [
      {
        name: "Tất cả sinh viên",
        route: "sinhviens",
        des: "Tất cả sinh viên",
      },
    ],
  },
  {
    name: "Giảng viên",
    // route: "giangviens",
    des: "Tất cả giảng viên",
    listMenu: [
      {
        name: "Tất cả giảng viên",
        route: "giangviens",
        des: "Tất cả giảng viên",
      },
      {
        name: "Cập nhật giảng viên",
        route: "giangviens/create",
        des: "Tất cả giảng viên",
      },
    ],
  },
  {
    name: "Khoa",
    route: "khoas",
    des: "Tất cả khoa",
    listMenu: [
      {
        name: "Danh sách khoa",
        route: "khoas",
        des: "Danh sách khoa",
      },
    ],
  },
  {
    name: "Bài viết",
    route: "posts",
    des: "Tất cả Bài viết",
    listMenu: [
      {
        name: "Danh sách bài viết",
        route: "posts",
        des: "Tất cả Bài viết",
      },
    ],
  },
  {
    name: "Tài khoản",
    route: "user",
    des: "Tài khoản giảng viên/sinh viên",
    listMenu: [
      {
        name: "Tài khoản",
        route: "user",
        des: "Tài khoản giảng viên/sinh viên",
      },
      {
        name: "Thêm sinh viên",
        route: "sinhviens/create",
        des: "Thêm sinh viên",
        role: 1,
      },
      {
        name: "Tạo bài viết",
        route: "createPost",
        des: "Tất cả Bài viết",
        role: 1,
      },
    ],
  },
  {
    name: "Đăng nhập",
    route: "login",
    des: "",
  },
  {
    name: "Đăng ký",
    route: "register",
    des: "",
  },
  {
    name: "Đăng xuất",
    route: "",
    des: "logout",
  },
];

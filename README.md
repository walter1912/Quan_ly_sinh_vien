# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

từ đầu dùng makeStyles của MUI nhưng bị lỗi, sửa mãi thì phát hiện ra là phải nâng cấp lên dùng styled của MUI v5 thì mới dùng được.
cấu trúc dùng styled của MUI khá là khó hiểu so với styled của styled-component.
giờ mình sẽ dùng css theo cách:

1.  với các style dùng ở nhiều nơi thì sẽ đặt tên class ở index.css
2.  với các style nhỏ lẻ thì dùng bootstrap.
3.  với các style có thay đổi tham số truyền vào thì dùng styled as makeStyles của mui.
4.  không dùng đến styled của styled-component nữa để tránh xung đột,nhầm lẫn style.

chú ý: nếu dùng đc tag HTML thường thì nên dùng, tránh lạm dụng các component của MUI, vì css, tải tài nguyên chậm hơn.

==> tại tag thường ko được dùng inline-style.

1.  PROJECT WEB QUẢN LÝ SINH VIÊN
    mô tả web:
    web giúp giảng viên quản lý toàn bộ sinh viên của trường. giúp giảng viên đăng bài viết để sinh viên cập nhật tình hình, thông báo.
    web có các khoa và mỗi giảng viên sẽ quản lý một số lượng sinh viên tùy chỉnh.

actor: giảng viên, sinh viên

user: giảng viên, sinh viên

giảng viên có các chức năng:

1. đăng bài
2. crud sinh viên
3. crud khoa
4. xem toàn bộ danh sách sinh viên
5. xem CHI TIẾT thông tiN của sinh viên BẤT KỲ
6. crud thông tin của mình
7. xem thông tin của các giảng viên khác
8. đăng nhập, đăng ký tài khoản

sinh viên có các chức năng:

1. xem bài viết, comment, like bài viết
2. crud thông tin bản thân
3. xem thông tin TỔNG QUÁT của sinh viên BẤT KỲ
4. xem chi tiết thông tin giảng viên thêm mình vào danh sách
5. đăng nhập, đăng ký tài khoản

cơ sở dữ liệu

giangvien {
    id: number;
    tenGV: string;
    maGV: string;
    ngaySinh: string;
    gioiTinh: string;
    khoaId: number;
    email: string;
    tenKhoa:string;
}

sinhvien {
    id: number;
    tenSV: string;
    maSV: string;
    ngaySinh: any;
    gioiTinh: string;
    khoaId: number;
    isEdit: boolean;
    tenKhoa: string;

    idGiangVien: int; // id của giảng viên đã thêm sinh viên vào danh sách
}
user {
    username: string; = mã sinh viên hoặc giảng viên
    password: string;
    vitri: number;
    createAt: date; // ngày thêm 
    //1 là giảng viên
    //2 là sinh viên
}

khoa {
    id: number;
    ten: string;
}

post {

}

==> hướng làm 
//ngày 31/5
1. làm đăng nhập đăng ký 
 1.1 tạo api user
 1.2 tạo api giangvien 
=> đăng nhập bằng user giảng viên 

1.3 tạo service giangvien
1.4 tạo service user 

//ngày 7/6
target: làm trang tạo bài viết 
2. tạo bài viết 
    2.1 tạo giao diện, tìm hiểu react-quill

//ngày 9/6 
xong create, update bài viết

target: 
1. làm chức năng lấy danh sách sinh viên theo khoa 
    1.1 có thể crud sinh viên đó khi nhấn vào ==> done
2. làm chức năng lấy danh sách giảng viên theo khoa 
    2.1 có thể xem danh sách sinh viên mà giảng viên đó thêm vào ==> done
        ==> có thể CRUD với sinh viên
    2.2 có thể xem danh sách bài đăng mà giảng viên đã đăng ==> done
        ==> có thể CRUD với post

// ngày 10/6
1. thêm chức năng bình luận cho bài viết: 
    1.1 user có thể bình luận cho bài viết 
        ==> tạo bảng comment có 
        comment {
            id: number; //PK auto từ id = 1
            postId: number;  //FK from post
            userId: number; //FK from user
            //id của comment mà mình rep, trường hợp bình luận đầu tiên thì id = 0
            // để tránh trường hợp nhầm là rep comment khác.
            repCommentId: number; 
            // nội dung comment chỉ dùng text;
            //dùng textArea
            content: string;
            // thời gian tạo comment, sẽ đc tạo trong comment services
            createAt: any;
        }
        // hình dung luồng hoạt động của comment:
        ở trang detail post sẽ lấy ra tất cả comment có postId = post.id và hiển thị ra các comment có repCommentId = 0;
        khi nhấn vào comment có repCommentId = 0 thì  sẽ hiển thị ra các comment có repId = comment.id

        bước 1: tạo database và kết nối với frontend
        ==> ở back end có thêm các chức năng: 
        1. getCommentByPostId(int postId) => done
        ==> ở frontend có thêm các chức năng: 
        1. getAllCommentByPostId(postId) => done 
        2. getAllRepCommentById(repCommentId) => done 

        bước 2: tạo giao diện:
        1. tạo giao diện danh sách các comment ở postdetailPage 
        2. có thể xem các cmt được rep => done
        3. hiển thị username của comment từ userId
        4. khi nhấn vào comment thì xem thông tin user được.
        
        user khi nhấn vào từ comment thì không thể CRUD được ==> sẽ tạo trang riêng ViewUser 
//nên nhớ khi get list thì trả về data.comment và status để đồng bộ với các APi trước.

//ngày 15/06 
1. chức năng search giangvien 
    = search theo tên
    - ở trong trang AllGiangVienPage => done 

2. chức năng search bài viết ==> optional 
    - search theeo thời gian create, theo thời gian update
    - ở trong trang AllPostPage

3. sửa lại phần login, register 
    1. sửa phần backend: không được trả về password => done
    -  tìm cách trả về access_token

    2. register => done

4. phân quyền: 
    1. chỉ user của bài viết mới được chỉnh sửa bài viết đó
    2. chỉ user sinh viên mới được chỉnh sửa sinh viên đó
    3. chỉ user giảng viên mới được chỉnh sửa tất cả sinh viên, và thêm sinh viên 
    ==> tại trang user 
        nếu là sinh viên: 
        => có thể update hoặc delete sinh viên đó => chuyển trang 
        nếu là giảng viên: 
        => chuyển trang CRUD sinh viên 
    4. chỉ có role = 1 mới được createPost, updatePost

    5. tạo trang báo lỗi khi bạn không thể truy cập: ErrorAuthenPage


upcode online 



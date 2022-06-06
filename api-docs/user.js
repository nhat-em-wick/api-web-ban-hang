/**
 * @swagger 
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      required: 
 *        - name
 *        - email
 *        - password
 *      properties:
 *        name:
 *          type: string
 *          description: Tên người dùng
 *        email:
 *          type: string
 *          description: Email
 *        password:
 *          type: string
 *          description: Mật khẩu (ít nhất 8 ký tự)
 *        phone:
 *          type: string
 *          description: Số điện thoại
 *        address:
 *          type: string
 *          description: Địa chỉ
 *        isAdmin: 
 *          type: boolean
 *          description: Admin
 *      example:
 *        name: Nguyễn Minh Nhật
 *        email: nhat@gmail.com
 *        password: "12345678"
 *        phone: "0123456789"
 *        address: Thành phố HCM
 *        isAdmin: true
 */

/**
 * @swagger
 * /users/info:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    tags: [User]
 *    summary: lấy thông tin người dùng đang đăng nhập
 *    responses:
 *      200: 
 *        description: Thành công
 */

/**
 * @swagger
 * /users/info:
 *  put:
 *    security:
 *      - bearerAuth: []
 *    tags: [User]
 *    summary: Thay đổi thông tin người dùng đang đăng nhập
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *              address:
 *                type: string
 *              phone:
 *                type: string
 *    responses:
 *      200: 
 *        description: Thành công
 */

/**
 * @swagger
 * /users/change-password:
 *  put:
 *    security:
 *      - bearerAuth: []
 *    tags: [User]
 *    summary: Thay đổi mật khẩu người dùng đang đăng nhập
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              password:
 *                type: string
 *              newPassword:
 *                type: string
 *    responses:
 *      200: 
 *        description: Thành công
 *      400:
 *        description: Sai mật khẩu
 *      500:
 *        description: Lỗi server
 */

/**
 * @swagger
 * /users/recovery:
 *  post:
 *    tags: [User]
 *    summary: Khôi phục mật khẩu
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              password:
 *                type: string
 *              token:
 *                type: string
 *    responses:
 *      200:
 *        description: Thành công
 *      400:
 *        description: Token hết hạn
 *      500:
 *        description: Lỗi server
 */

/**
 * @swagger 
 * /users:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    tags: [Admin user]
 *    summary: Lấy danh sách người dùng
 *    parameters:
 *      - name: _page
 *        description: Trang hiện tại
 *        in: query
 *        type: integer
 *      - name: _limit
 *        description: Giới hạn số người dùng trả về
 *        in: query
 *        type: integer
 *      - name: q
 *        description: Tìm kiếm người dùng theo email hoặc sđt
 *        in: query
 *        type: string
 *    responses:
 *      200: 
 *        description: Thành công
 */

/**
 * @swagger 
 * /users/{userId}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    tags: [Admin user]
 *    summary: Lấy thông tin 1 người dùng
 *    parameters:
 *      - name: userId
 *        description: id của người dùng
 *        in: path
 *        type: string
 *    responses:
 *      200: 
 *        description: Thành công
 *      404:
 *        description: Người dùng không tồn tại
 *      500:
 *        description: Lỗi server
 */     


/**
 * @swagger
 * /users:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    tags: [Admin user]
 *    summary: Tạo người dùng mới
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    
 *    responses:
 *      200:
 *        description: Thành công
 */

/**
 * @swagger
 * /users:
 *  delete:
 *    security:
 *      - bearerAuth: []
 *    tags: [Admin user]
 *    summary: Xóa 1 hoặc nhiều người dùng
 *    parameters:
 *      - name: ids
 *        description: id của nhiều người dùng
 *        in: query
 *        schema:
 *           type: array
 *           items: 
 *             type: string
 *             description: id của người dùng
 *    responses:
 *      200:
 *        description: Thành công
 */

/**
 * @swagger
 * /users:
 *  put:
 *    security:
 *      - bearerAuth: []
 *    tags: [Admin user]
 *    summary: Sửa thông tin người dùng
 *    parameters:
 *      - name: id
 *        description: id của người dùng
 *        in: query
 *        type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                description: Tên người dùng
 *              email:
 *                type: string
 *                description: Email
 *              phone:
 *                type: string
 *                description: Số điện thoại
 *              address:
 *                type: string
 *                description: Địa chỉ
 *              isAdmin: 
 *                type: boolean
 *                description: Admin
 *    responses:
 *      200:
 *        description: Thành công
 */


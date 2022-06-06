/**
 * @swagger
 * components:
 *  schemas:
 *    Order:
 *      type: object
 *      properties:
 *        customerId: 
 *          type: string
 *          description: id khách hàng
 *        cartItems:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              productId:
 *                 type: string
 *                 description: Id sản phẩm
 *              quantity:
 *                 type: integer
 *                 description: Số lượng sản phẩm
 *        total_product:
 *          type: integer
 *          description: Tổng số sản phẩm
 *        total_price: 
 *          type: integer
 *          description: Tổng số tiền
 *        shipping:
 *          type: integer
 *          description: "Phương thức giao hàng (1: Miễn phí, 2: Nhanh, 3: Tại cửa hàng)"
 *        payment:
 *          type: integer
 *          description: "Phương thức thanh toán (1: Tiền mặt, 2: Online)"
 *        message:
 *          type: string
 *          description: Lời nhắn của khách hàng
 *        status:
 *          type: integer
 *          description: "Trạng thái đơn hàng (0: Đã hủy, 1: Đặt hàng thành công, 2: Đã xác nhận, 3: Đang vận chuyển, 4: Giao hàng thành công)"
 *        paid: 
 *          type: boolean
 *          description: Trạng thái thanh toán
 *        
 */

/**
 * @swagger
 * /orders/user:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    tags: [Order]
 *    summary: Lấy danh sách đơn hàng của người dùng đang đăng nhập
 *    responses:
 *      200:
 *        description: Thành công
 */

/**
 * @swagger
 * /orders/user:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    tags: [Order]
 *    summary: Tạo đơn hàng mới
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              customerId: 
 *                type: string
 *                description: id khách hàng
 *              cartItems:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    productId:
 *                       type: string
 *                       description: Id sản phẩm
 *                    quantity:
 *                       type: integer
 *                       description: Số lượng sản phẩm
 *              total_product:
 *                type: integer
 *                description: Tổng số sản phẩm
 *              total_price: 
 *                type: integer
 *                description: Tổng số tiền
 *              shipping:
 *                type: integer
 *                description: "Phương thức giao hàng (1: Miễn phí, 2: Nhanh, 3: Tại cửa hàng)"
 *              payment:
 *                type: integer
 *                description: "Phương thức thanh toán (1: Tiền mặt, 2: Online)"
 *              message:
 *                      type: string
 *                      description: Lời nhắn của khách hàng
 *    responses:
 *      200:
 *        description: Thành công
 */

/**
 * @swagger
 * /orders/user/{orderId}:
 *  put:
 *    security:
 *      - bearerAuth: []
 *    tags: [Order]
 *    summary: Hủy đơn hàng
 *    parameters:
 *      - name: orderId
 *        in: path
 *        description: id đơn hàng
 *        type: string
 *    responses:
 *      200: 
 *        description: Thành công
 */

/**
 * @swagger
 * /orders/user/{orderId}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    tags: [Order]
 *    summary: Xem đơn hàng
 *    parameters:
 *      - name: orderId
 *        in: path
 *        description: id đơn hàng
 *        type: string
 *    responses:
 *      200: 
 *        description: Thành công
 */

/**
 * @swagger
 * /orders/customer:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    tags: [Admin order]
 *    summary: Lấy danh sách đơn hàng
 *    parameters:
 *      - name: _page
 *        description: Trang hiện tại
 *        in: query
 *        type: integer
 *      - name: _limit
 *        description: Giới hạn số đơn hàng trả về
 *        in: query
 *        type: integer
 *      - name: q
 *        description: Tìm kiếm đơn hàng theo sđt hoặc email
 *        in: query
 *        type: string
 *    responses:
 *      200: 
 *        description: Thành công
 */

/**
 * @swagger
 * /orders/customer/{orderId}:
 *  put:
 *    security:
 *      - bearerAuth: []
 *    tags: [Admin order]
 *    summary: Cập nhật đơn hàng
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              status:
 *                type: integer
 *              paid:
 *                 type: boolean
 *    responses:
 *     200: 
 *       description: Thành công
 */

/**
 * @swagger
 * /orders/customer/{orderId}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    tags: [Admin order]
 *    summary: Xem đơn hàng của khách hàng
 *    parameters:
 *       - name: id
 *         in: path
 *         type: string
 *         description: id của đơn hàng
 *    responses:
 *      200: 
 *        description: Thành công
 */
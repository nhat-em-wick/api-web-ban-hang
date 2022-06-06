/**
 * @swagger 
 * components:
 *  schemas:
 *    Product:
 *      type: object
 *      required: 
 *        - name
 *        - new_price
 *        - stock
 *      properties:
 *        name:
 *          type: string
 *          description: Tên sản phẩm
 *        slug:
 *          type: string
 *          description: Đường dẫn
 *        stock:
 *          type: integer
 *          description: Số lượng trong kho
 *        new_price: 
 *          type: integer
 *          description: Giá mới
 *        old_price:
 *          type: integer
 *          description: Giá cũ
 *        long_description: 
 *          type: string
 *          description: Mô tả dài
 *        short_description:
 *          type: string
 *          description: Mô tả ngắn
 *        category:
 *          type: string
 *          description: id danh mục
 *        gallery:
 *          type: array
 *          description: Hình ảnh
 *        rating: 
 *          type: integer
 *          description: Điểm đánh giá  
 */

/**
 * @swagger
 *
 *  /products:
 *    get:
 *      tags: [Product]
 *      summary: Lấy toàn bộ sản phẩm
 *      parameters:
 *        - name: _page
 *          description: Trang hiện tại
 *          in: query
 *          type: integer
 *        - name: _limit
 *          description: Giới hạn số sản phẩm trả về
 *          in: query
 *          type: integer
 *        - name: q
 *          description: Tìm kiếm sản phẩm
 *          in: query
 *          type: string
 *        - name: price_lte
 *          description: Tìm sản phẩm từ giá x trở xuống
 *          in: query
 *          type: integer
 *        - name: price_gte
 *          description: Tìm sản phẩm từ giá x trở lên
 *          in: query
 *          type: integer
 *        - name: cate
 *          in: query
 *          schema:
 *            type: array
 *            items: 
 *              type: string
 *          description: Tìm sản phẩm thuộc danh mục
 *      responses:
 *        200:
 *          description: Danh sách sản phẩm
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 */   

/**
 * @swagger
 * 
 * /products/{slug}:
 *    get:
 *      tags: [Product]
 *      summary: Lấy 1 sản phẩm
 *      parameters:
 *        - name: slug
 *          in: path
 *          type: string
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Product'
 *              example: 
 *                _id: 62528240777a466ecb3be179
 *                name: Nước rửa chén john
 *                stock: 10
 *                old_price: 30000
 *                new_price: 20000
 *                rating: 0
 *                sold: 0
 *                short_description: lorem input
 *                long_description: lorem input
 *                category:
 *                  _id: 62109fcb158736512e2792f0
 *                  name: Uncategory
 *                gallery: 
 *                  - http://res.cloudinary.com/coder-nhatpro/image/upload/v1649574889/bacola-clone/xipq17j4l3n4thj6baaj.webp
 *                  - http://res.cloudinary.com/coder-nhatpro/image/upload/v1649574889/bacola-clone/yjrvq5jlmdofuvhutdcl.webp
 *                slug: nuoc-rua-chen-john-wick
 *                  
 *        404:
 *          description: Không tìm thấy sản phẩm
 */

/**
 * @swagger
 * 
 * /products:
 *    post: 
 *      security:
 *        - bearerAuth: []
 *      tags: [Admin product]
 *      summary: Thêm 1 sản phẩm
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                slug: 
 *                  type: string
 *                stock:
 *                  type: integer
 *                old_price:
 *                  type: integer
 *                new_price:
 *                  type: integer
 *                short_description:
 *                  type: string
 *                long_description:
 *                  type: string
 *                gallery:
 *                   type: array
 *                   items:
 *                      type: string
 *                      description: Link hình ảnh
 *      responses:
 *        200:
 *          description: ok
 *          
 */ 
/**
 * @swagger
 * 
 * /products/{productId}:
 *    put: 
 *      security:
 *        - bearerAuth: []
 *      tags: [Admin product]
 *      summary: Sửa 1 sản phẩm
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                slug: 
 *                  type: string
 *                stock:
 *                  type: integer
 *                old_price:
 *                  type: integer
 *                new_price:
 *                  type: integer
 *                short_description:
 *                  type: string
 *                long_description:
 *                  type: string
 *                gallery:
 *                   type: array
 *                   items:
 *                      type: string
 *                      description: Link hình ảnh
 *      responses:
 *        200:
 *          description: ok
 *          
 */ 

/**
 * @swagger
 * /products:
 *   delete:
 *     security:
 *      - bearerAuth: []
 *     tags: [Admin product]
 *     summary: xóa 1 hoặc nhiều sản phẩm
 *     parameters:
 *       - name: ids
 *         in: query
 *         schema:
 *           type: array
 *           items: 
 *             type: string
 *             description: Danh sach sản phẩm cần xóa
 *     responses:
 *       200: 
 *         description: ok
 */

/**
 * @swagger
 * /products/tracking:
 *   get:
 *     tags: [Product]
 *     summary: Kiểm tra số lượng sản phẩm trong kho
 *     parameters:
 *       - name: slug
 *         in: query
 *         description: Đường đẫn 
 *       - name: quantity
 *         in: query 
 *         description: Sô lượng sản phẩm 
 *     responses:
 *       200: 
 *         description: ok
 */
/**
 * @swagger 
 * components:
 *  securitySchemes:
 *    bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 */

/**
 * @swagger
 * /auth/login:
 *  post:
 *    tags: [Authentication]
 *    summary: Đăng nhập
 *    requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                  example: mnhat@gmail.com
 *                password:
 *                  type: string
 *                  example: 12345678
 *    responses:
 *      200: 
 *        description: Đăng nhập thành công
 *            
 */

/**
 * @swagger
 * /auth/register:
 *  post: 
 *    tags: [Authentication]
 *    summary: Đăng ký
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *              email:
 *                type: string
 *              pasword: 
 *                type: string
 *    responses:
 *      200:
 *        description: Đăng kí thành công
 */   

/**
 * @swagger
 * /auth/refresh:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    tags: [Authentication]
 *    summary: Refresh token
 *    parameters:
 *      - name: token
 *        in: query
 *        description: refresh token
 *        type: string
 *    responses:
 *      200:
 *        description: Thành công
 */
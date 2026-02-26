# OV6 Backend API

Backend API server cho website OV6 - Trading Education Platform.

## Công nghệ sử dụng

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database (với Mongoose)
- **Nodemailer** - Email service (optional)
- **Express Validator** - Input validation

## Cài đặt

```bash
# Cài đặt dependencies
npm install

# Copy file .env.example thành .env và cập nhật thông tin
cp .env.example .env

# Chạy development server (với nodemon)
npm run dev

# Hoặc chạy production server
npm start
```

## Cấu hình môi trường

Tạo file `.env` từ `.env.example` và cập nhật các biến môi trường:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/ov6
FRONTEND_URL=http://localhost:5173

# Email (optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_TO=ov6familyforextradingvip@gmail.com
```

## API Endpoints

### Health Check
- `GET /api/health` - Kiểm tra server status

### Contact API
- `POST /api/contact` - Gửi form liên hệ
- `GET /api/contact` - Lấy danh sách contact (Admin)
- `GET /api/contact/:id` - Lấy chi tiết contact (Admin)
- `PATCH /api/contact/:id` - Cập nhật status (Admin)
- `DELETE /api/contact/:id` - Xóa contact (Admin)

### Blog API
- `GET /api/blog` - Lấy danh sách blog posts (published)
  - Query params: `category`, `page`, `limit`
- `GET /api/blog/:slug` - Lấy chi tiết blog post
- `POST /api/blog` - Tạo blog post mới (Admin)
- `PUT /api/blog/:id` - Cập nhật blog post (Admin)
- `DELETE /api/blog/:id` - Xóa blog post (Admin)

### Services API
- `GET /api/services` - Lấy danh sách services

### Results API
- `GET /api/results/trades` - Lấy trade results
  - Query params: `limit`, `pair`
- `GET /api/results/stats` - Lấy performance statistics
- `POST /api/results/trades` - Tạo trade result mới (Admin)
- `PUT /api/results/stats` - Cập nhật performance stats (Admin)

## Cấu trúc dự án

```
ov6-be/
├── controllers/         # Request handlers
│   ├── contactController.js
│   ├── blogController.js
│   ├── servicesController.js
│   └── resultsController.js
├── models/             # Mongoose models
│   ├── Contact.js
│   ├── BlogPost.js
│   ├── TradeResult.js
│   └── PerformanceStats.js
├── routes/             # API routes
│   ├── contactRoutes.js
│   ├── blogRoutes.js
│   ├── servicesRoutes.js
│   └── resultsRoutes.js
├── middleware/         # Custom middleware
│   └── validator.js
├── utils/              # Utility functions
│   └── emailService.js
├── server.js           # Entry point
├── package.json
└── .env.example
```

## Database Models

### Contact
- name (String, required)
- email (String, required)
- message (String, required)
- status (Enum: new, read, replied, archived)
- createdAt (Date)

### BlogPost
- title (String, required)
- slug (String, unique, auto-generated)
- excerpt (String, required)
- content (String, required)
- category (Enum)
- author (String)
- featuredImage (String)
- published (Boolean)
- publishedAt (Date)
- views (Number)
- createdAt, updatedAt (Date)

### TradeResult
- date (Date, required)
- pair (String, required)
- type (Enum: Long, Short)
- entry, exit, stopLoss, takeProfit (Number)
- result, resultPercent (Number)
- notes (String)
- createdAt (Date)

### PerformanceStats
- period (Enum: daily, weekly, monthly, yearly)
- winRate, avgRiskReward, maxDrawdown (Number)
- totalTrades, winningTrades, losingTrades (Number)
- totalProfit (Number)
- lastUpdated (Date)

## Response Format

Tất cả API responses đều có format:

```json
{
  "success": true,
  "message": "Optional message",
  "data": { ... },
  "pagination": { ... } // Nếu có phân trang
}
```

Error responses:

```json
{
  "success": false,
  "message": "Error message",
  "error": { ... } // Chỉ trong development
}
```

## Development

Server sẽ tự động restart khi code thay đổi khi chạy `npm run dev` (sử dụng nodemon).

Server vẫn có thể chạy mà không cần MongoDB trong development mode (nhưng các API endpoints sẽ lỗi khi truy cập database).

## Production Deployment

1. Set `NODE_ENV=production`
2. Cấu hình MongoDB connection string
3. Cấu hình CORS để chỉ cho phép frontend domain
4. Sử dụng process manager như PM2
5. Cấu hình reverse proxy (nginx)

## Tương lai (Future Enhancements)

- [ ] Authentication & Authorization (JWT)
- [ ] Admin dashboard API
- [ ] File upload cho blog images
- [ ] Rate limiting
- [ ] API documentation với Swagger
- [ ] Testing (Jest)
- [ ] Logging (Winston)


# Forever E-commerce API

A complete RESTful API for an e-commerce platform built with Node.js, Express, and MongoDB. This API supports user authentication, product management, shopping cart functionality, and order processing with Cash on Delivery (COD) payment method.

## 🚀 Features

- **User Authentication**: JWT-based authentication for users and admins
- **Product Management**: CRUD operations for products with image upload
- **Shopping Cart**: Add, update, and retrieve cart items
- **Order Processing**: Place and manage orders with COD payment
- **Admin Panel**: Admin-only endpoints for product and order management
- **File Upload**: Cloudinary integration for product images
- **Data Validation**: Comprehensive input validation and error handling

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Cloudinary account for image storage

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
PORT=4000
MONGO_URI=mongodb://localhost:27017/forever-ecommerce
JWT_SECRET=your_jwt_secret_key
ADMIN_EMAIL=admin@forever.com
ADMIN_PASSWORD=admin123
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

4. Start the server:
```bash
npm start
```

The API will be available at `http://localhost:4000`

## 📚 API Documentation

This API is fully documented using OpenAPI 3.0 specification. You can find the documentation in:

- **YAML format**: `openapi.yaml`
- **JSON format**: `openapi.json`

### Viewing the Documentation

You can view the interactive API documentation using tools like:

1. **Swagger UI**: Upload the `openapi.yaml` or `openapi.json` to [Swagger Editor](https://editor.swagger.io/)
2. **Postman**: Import the OpenAPI spec into Postman for testing
3. **Insomnia**: Import the spec for API testing
4. **ReDoc**: Use ReDoc to generate beautiful documentation

### Quick Start with Swagger UI

1. Go to [Swagger Editor](https://editor.swagger.io/)
2. Copy the content of `openapi.yaml` and paste it in the editor
3. The interactive documentation will be generated automatically

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

### Authentication Endpoints

- `POST /api/user/register` - Register a new user
- `POST /api/user/login` - User login
- `POST /api/user/admin` - Admin login

## 📦 API Endpoints

### Health Check
- `GET /` - API health check

### User Authentication
- `POST /api/user/register` - Register new user
- `POST /api/user/login` - User login
- `POST /api/user/admin` - Admin login

### Products
- `GET /api/product/list` - Get all products
- `GET /api/product/single` - Get single product
- `POST /api/product/add` - Add product (Admin only)
- `POST /api/product/remove` - Remove product (Admin only)

### Shopping Cart
- `GET /api/cart/get` - Get user cart
- `POST /api/cart/add` - Add item to cart
- `POST /api/cart/update` - Update cart item quantity

### Orders
- `POST /api/order/place` - Place new order (COD)
- `GET /api/order/userorders` - Get user orders
- `GET /api/order/list` - Get all orders (Admin only)
- `POST /api/order/status` - Update order status (Admin only)

## 📋 Data Models

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  cartData: Object
}
```

### Product
```javascript
{
  name: String,
  description: String,
  price: Number,
  image: Array,
  category: String,
  subCategory: String,
  sizes: Array,
  bestseller: Boolean,
  date: Number
}
```

### Order
```javascript
{
  userId: String,
  items: Array,
  amount: Number,
  address: Object,
  status: String,
  paymentMethod: String,
  payment: Boolean,
  date: Number
}
```

## 💳 Payment Method

This API currently supports **Cash on Delivery (COD)** only. All payment integrations (Stripe, Razorpay) have been removed to simplify the ordering process.

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: Using bcrypt for password security
- **Input Validation**: Comprehensive validation using validator.js
- **CORS Enabled**: Cross-origin resource sharing configured
- **Environment Variables**: Sensitive data stored in environment variables

## 🧪 Testing

You can test the API using:

1. **Postman**: Import the OpenAPI spec
2. **curl**: Command-line testing
3. **Insomnia**: API testing tool
4. **Frontend Application**: Connect your React/Vue/Angular app

### Example curl commands:

```bash
# Health check
curl http://localhost:4000/

# Register user
curl -X POST http://localhost:4000/api/user/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:4000/api/user/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'

# Get products
curl http://localhost:4000/api/product/list
```

## 📁 Project Structure

```
backend/
├── config/
│   ├── cloudinary.js          # Cloudinary configuration
│   └── mongoDB.js              # MongoDB connection
├── controllers/
│   ├── cartController.js       # Cart operations
│   ├── orderController.js      # Order management
│   ├── productController.js    # Product CRUD
│   └── userController.js       # User authentication
├── middleware/
│   ├── adminAuth.js            # Admin authentication
│   ├── auth.js                 # User authentication
│   └── multer.js               # File upload handling
├── models/
│   ├── orderModel.js           # Order schema
│   ├── productModels.js        # Product schema
│   └── userModel.js            # User schema
├── routes/
│   ├── cartRoute.js            # Cart routes
│   ├── orderRoute.js           # Order routes
│   ├── productRoute.js         # Product routes
│   └── userRoute.js            # User routes
├── .env                        # Environment variables
├── server.js                   # Main server file
├── openapi.yaml                # OpenAPI specification (YAML)
├── openapi.json                # OpenAPI specification (JSON)
└── package.json                # Dependencies and scripts
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Update the OpenAPI documentation if needed
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For questions or support, please contact:
- Email: support@forever-ecommerce.com
- GitHub Issues: Create an issue in the repository

## 🔄 Recent Changes

- **Removed Payment Integrations**: Stripe and Razorpay integrations have been removed
- **COD Only**: All orders now use Cash on Delivery payment method
- **Complete OpenAPI Spec**: Added comprehensive API documentation
- **Enhanced Security**: Improved authentication and validation

## 🚀 Deployment

For production deployment:

1. Set up environment variables on your hosting platform
2. Configure MongoDB connection string
3. Set up Cloudinary for image storage
4. Update CORS settings if needed
5. Set NODE_ENV to 'production'

The API is ready for deployment on platforms like:
- Heroku
- Vercel
- AWS
- Digital Ocean
- Railway"# foreverbackend" 

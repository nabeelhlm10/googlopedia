# Googlopedia API Endpoints

## Base URL: `http://localhost:8080/api/v1`

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | Register a new user | No |
| POST | `/auth/login` | Login and get JWT token | No |
| GET | `/books` | Get all books (optional ?title= search) | No |
| GET | `/books/{id}` | Get book details | No |
| GET | `/articles` | Get all articles | No |
| GET | `/articles/{id}` | Get article details | No |
| GET | `/cart` | Get current user's cart | Yes |
| POST | `/cart/add?bookId=X&quantity=Y` | Add book to cart | Yes |
| DELETE | `/cart/{id}` | Remove item from cart | Yes |
| DELETE | `/cart/clear` | Clear cart | Yes |
| POST | `/orders/place` | Place an order from cart | Yes |
| GET | `/orders` | Get user's order history | Yes |

## Admin Endpoints (Auth + ADMIN role required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/admin/books` | Add a new book |
| PUT | `/admin/books/{id}` | Update book details |
| DELETE | `/admin/books/{id}` | Delete a book |
| POST | `/admin/articles` | Add a new article |
| PUT | `/admin/articles/{id}` | Update article |
| DELETE | `/admin/articles/{id}` | Delete article |

# LuxeWatch API Backend

Express + MongoDB backend for the Luxury Watch Ecommerce site.

## Tech
- **Express** — REST API server
- **Mongoose** — MongoDB ODM
- **CORS** — Cross-origin support
- **dotenv** — Environment config

## Setup

1. Install dependencies:
   ```bash
   cd server
   npm install
   ```

2. Configure MongoDB in `.env`:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/watches
   ```
   > For MongoDB Atlas, replace with your connection string.

3. Seed the database with the 14 watch products:
   ```bash
   npm run seed
   ```

4. Start the server (with auto-reload):
   ```bash
   npm run dev
   ```

Server runs at **http://localhost:5000**.

## API Endpoints

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products?category=men` | Filter by category |
| GET | `/api/products?brand=Rolex` | Filter by brand |
| GET | `/api/products/:id` | Get one product by id |
| POST | `/api/products` | Create a product (JSON body) |
| PUT | `/api/products/:id` | Update a product |
| DELETE | `/api/products/:id` | Delete a product |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/orders` | Get all orders |
| GET | `/api/orders/:orderId` | Get one order |
| POST | `/api/orders` | Place an order (JSON body) |

## Testing with ThunderClient

1. Open the **Thunder Client** extension in VS Code.
2. Click the collection icon and **Import** the `ThunderClient_collection.json` file.
3. The **LuxeWatch API** collection with Products & Orders folders will appear.
4. Ensure the server is running, then send requests.

### Sample: Create an Order
```json
POST http://localhost:5000/api/orders
Content-Type: application/json

{
  "customerName": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "address": "123 Main St",
  "city": "New York",
  "zip": "10001",
  "paymentMethod": "phonepe",
  "items": [
    { "id": 1, "name": "Submariner Date", "brand": "Rolex", "price": 9750, "image": "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=400", "quantity": 1 }
  ],
  "total": 9750
}

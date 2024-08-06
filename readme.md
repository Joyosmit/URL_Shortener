# URL Shortener
Description
A brief description of the project, its purpose, and features.

## Getting Started
### Prerequisites
1. Node.js: Make sure you have Node.js installed. You can download it here.
2. MongoDB Atlas: Set up a MongoDB Atlas account and create a database. Get your connection string (MONGODB_URI).
3. Redis: Make sure Redis is installed and running. If using Docker, expose port ``6379``.

### Server Setup
1. Navigate to the server directory:

```bash
cd server
```
2. Create a .env file and add your MongoDB connection string as:
```bash
MONGODB_URI=<your_mongodb_atlas_connection>
PORT=<any_port_number>
```

3. Install Redis locally:

Follow instructions from the official Redis website.

4. Running Redis with Docker:

```bash
docker run -p 6379:6379 redis
```
5. Install server dependencies:

```bash
npm install
```
6. Start the server:

```bash
npm run start
```
The server should now be running.

## Client Setup
1. Navigate to the client directory:

```bash
cd client
```
2. Install client dependencies:

```bash
npm install
```
3. Start the client:

```bash
npm run start
```
The client should now be running and accessible in your browser.
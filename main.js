const express = require('express');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redis = require('redis');

const app = express();
const PORT = process.env.PORT || 4000;

// Redis client
const redisClient = redis.createClient({
  host: 'localhost',
  port: 6379, // Default Redis port
});

// Session middleware with Redis store
app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: 'my secret key',
  resave: false,
  saveUninitialized: true,
}));

// Example route
app.get('/', (req, res) => {
  if (req.session.views) {
    req.session.views++;
  } else {
    req.session.views = 1;
  }
  res.send(`Views: ${req.session.views}`);
});

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});

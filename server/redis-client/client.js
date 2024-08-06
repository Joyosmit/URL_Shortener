const { Redis } = require('ioredis');
const URL = require('../model/url');

// Create a new Redis client at port 6379
const client = new Redis();

// Set up keyspace notifications for expired events
client.config('SET', 'notify-keyspace-events', 'Ex')
  .then(() => {
    console.log('Keyspace notifications configured successfully');
  })
  .catch((error) => {
    console.error('Failed to configure keyspace notifications:', error);
  });

// Create a subscriber client
const subscriber = new Redis();

// Subscribe to key expiration events
subscriber.psubscribe('__keyevent@0__:expired', (err, count) => {
  if (err) {
    console.error('Failed to subscribe to expired events:', err);
  } else {
    console.log(`Subscribed to ${count} channel(s).`);
  }
});

// Handle expired events
subscriber.on('pmessage', async(pattern, channel, message) => {
  if (message.startsWith('shortUrl:')) {
    const shortUrl = message.split(':')[1];
    const accessTimesKey = `accessTimes:${shortUrl}`;
    console.log(message);
    const accessTimes = await client.lrange(accessTimesKey, 0, -1);
    if (accessTimes.length > 0) {
      await URL.updateOne({ shortUrl }, { $push: { history: { $each: accessTimes } } });
    }
    await client.del(accessTimesKey); // Clean up access times key
  }
});

module.exports = client;

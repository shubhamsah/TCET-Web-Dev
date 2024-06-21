## Node.js REST API Code Explanation

This code sets up a basic Node.js REST API using Express.js and MongoDB.

```javascript
require('dotenv').config() // Load environment variables from .env file

const express = require('express')  // Import Express.js
const app = express() // Create Express app

const mongoose = require('mongoose')  // Import Mongoose ODM

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }) // Connect to MongoDB
const db = mongoose.connection
db.on('error', (error) => console.error(error)) // Error handling
db.once('open', () => console.log('Connected to Database')) // Success message

app.use(express.json()) // Parse JSON request bodies

const subscribersRouter = require('./routes/subscribers') // Import route handlers
app.use('/subscribers', subscribersRouter) // Mount routes at /subscribers

app.listen(3000, () => console.log('Server Started')) // Start server on port 3000\

```
## Mongoose Subscriber Schema
This code defines a Mongoose schema named subscriberSchema to represent a subscriber in a MongoDB database.

```JavaScript
const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  subscribedToChannel: {
    type: String,
    required: true
  },
  subscribeDate: {
    type: Date,
    required: true,
    default: Date.now 
  }
});

module.exports = mongoose.model('Subscriber', subscriberSchema);
```

Create a new file called subscriber.js
```js 
const express = require('express');
const router = express.Router();
const Subscriber = require('../models/subscriber');

module.exports = router;

```

### GetRequest - Find all subscribers
```js
// Getting all
router.get('/', async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.json(subscribers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
```
### PostRequest to post a new subscriber

```js
router.post('/', async (req, res) => {
  const subscriber = new Subscriber({
    name: req.body.name,
    subscribedToChannel: req.body.subscribedToChannel
  });

  try {
    const newSubscriber = await subscriber.save();
    res.status(201).json(newSubscriber);
  } catch (err) {
    res.status(400).json({ message: err.message }); 
  }
});

```


### Get single user by id

```js
router.get('/:id', async (req, res) => {
  try {
    const subscriber = await Subscriber.findById(req.params.id);
    if (!subscriber) { // Check if subscriber exists
      return res.status(404).json({ message: 'Subscriber not found' });
    }
    res.json(subscriber);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

```

### Delete a user

```js

router.delete('/:id', async (req, res) => {
  try {
    const result = await Subscriber.findByIdAndDelete(req.params.id);
    if (!result) { 
      return res.status(404).json({ message: 'Subscriber not found' });
    }
    res.json({ message: 'Deleted Subscriber' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
```

### Patch a user

```js
router.patch('/:id', async (req, res) => {
  try {
    const subscriber = await Subscriber.findById(req.params.id);
    if (!subscriber) {
      return res.status(404).json({ message: 'Subscriber not found' });
    }

    if (req.body.name != null) {
      subscriber.name = req.body.name;
    }
    if (req.body.subscribedToChannel != null) {
      subscriber.subscribedToChannel = req.body.subscribedToChannel;
    }

    const updatedSubscriber = await subscriber.save();
    res.json(updatedSubscriber);
  } catch (err) {
    res.status(400).json({ message: err.message }); 
  }
});
```

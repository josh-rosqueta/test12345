const express = require('express');
const app = express();
const routes = require('./routes');

app.use(express.json());
app.use('/viber/webhook', routes);

const PORT = process.env.PORT || 8081;

app.listen(PORT, async () => {
  console.log("Server is running on port", PORT);
});
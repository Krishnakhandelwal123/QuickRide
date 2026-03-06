const http = require('http');
const app = require('./app');
const { initializeSocket } = require('./socket');

const server = http.createServer(app);
const port = process.env.PORT || 3000; 

initializeSocket(server);

server.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
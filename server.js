const mongoose = require("mongoose");
const app = require('./app.js');
const config = require('./configs/config');

mongoose.connect(config.databaseUrl).then(() => {
  console.log('MongoDB Connected!');
}).catch(err => {
  console.log(err.messages)
});

app.listen(config.port, () => {
  console.log("App running on http://localhost:" + config.port);
})
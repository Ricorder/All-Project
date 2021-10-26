// const { connect } = require('mongoose')
const { options } = require('./config')
const app = require("../app");

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log('Сервер газанул ', PORT)
  // connect(dbConnectionURL, options, (err) => {
  //   if (err) return console.log(err)
  //   console.log('База рванула')
  // })
})

// module.exports = connect

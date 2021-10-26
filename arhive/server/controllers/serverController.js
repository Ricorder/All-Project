const fetch = require('node-fetch');

async function getToken(req, res) {
  const postData = JSON.stringify(req.body);
  const response = await fetch('https://erp-test.sistema.ru/ServiceModel/AuthService.svc/Login',
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'content-length': Buffer.byteLength(postData).toString()
      },
      body: postData
    })

  const responseInternals = response[Object.getOwnPropertySymbols(response)[1]]
  const headers = responseInternals.headers
  const ObjectNnullPrototype = headers[Object.getOwnPropertySymbols(headers)[0]]
  const setCookie = ObjectNnullPrototype['set-cookie']
  res.setHeader('set-cookie', setCookie).json(setCookie)
}

async function getData(req, res) {
  console.log(typeof(req.cookies));
  const response = await fetch(`https://erp-test.sistema.ru${req.url}`,
    {
      headers: {
        'accept': 'application/json;odata=verbose',
        'content-type': 'application/json',
        'forceusesession': 'true',
        'ForceUseSession': 'true',
        'Cookie': req.cookies
      }
    }
  );
  // console.log(response);
  // res.json(response)
}
module.exports = {
  getToken,
  getData
}

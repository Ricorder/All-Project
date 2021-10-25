const fetch = require('node-fetch');

function serializeCookie(cookies) {
  return Object.keys(cookies).reduce((res, key) =>  `${res}${key}=${cookies[key]}; `, "") || "";
}

async function proxy (req, res) {
  const cookie = serializeCookie(req.cookies);
  const options = {
    method: req.method,
    headers: {
      "content-type": "application/json",
      "accept": "application/json;odata=verbose",
      "forceusesession": "true",
      cookie
    },
    credentials: "include"
  }
  if (req.method === "POST") {
    // POST with body
    const body = JSON.stringify(req.body);
    options.body = body;
    options.headers["content-length"] = Buffer.byteLength(body).toString();
  }

  const response = await fetch(process.env.HOST + req.url, options);

  if (req.method === "POST") {
    // POST response with Cookie
    const responseInternals = response[Object.getOwnPropertySymbols(response)[1]]
    const headers = responseInternals.headers
    const ObjectNnullPrototype = headers[Object.getOwnPropertySymbols(headers)[0]]
    const setCookie = ObjectNnullPrototype["set-cookie"]
    res.setHeader("set-cookie", setCookie);
  }

  if (!req.url.includes("/0/img")){
    // json response
    const resBody = await response.json()
    res.json(resBody);
  } else {
    // image response
    const buffer = await response.buffer()
    res.end(buffer);
  }
}

module.exports = {
  proxy
}

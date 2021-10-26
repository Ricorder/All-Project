const http = require("http");
const httpProxy = require("http-proxy");
var https = require("https");
const commandLineArgs = require("command-line-args");
console.log("START");

let cookie = "";
const optionDefinitions = [
  { name: "port", alias: "p", type: Number, defaultValue: 8000 },
  {
    name: "target",
    alias: "t",
    type: String,
    defaultValue: "https://erp-test.sistema.ru"
  } //'http://51.144.103.133'
];

const options = commandLineArgs(optionDefinitions);
console.log("Start proxy on port", options.port, "for", options.target);

const proxy = httpProxy.createProxyServer({});
const sendError = function(res, err) {
  return res.status(500).send({
    error: err,
    message: "An error occured in the proxy"
  });
};

proxy.on("error", function(err, req, res) {
  sendError(res, err);
});

const enableCors = function(req, res) {
  if (req.headers["access-control-request-method"]) {
    res.setHeader(
      "access-control-allow-methods",
      req.headers["access-control-request-method"]
    );
  }

  if (req.headers["access-control-request-headers"]) {
    res.setHeader(
      "access-control-allow-headers",
      req.headers["access-control-request-headers"]
    );
  }

  if (req.headers.origin) {
    res.setHeader("access-control-allow-origin", req.headers.origin);
    res.setHeader("access-control-allow-credentials", "true");
  }
};

const enablePrCors = function(req, res) {
  if (req.headers["access-control-request-method"]) {
    res.headers["access-control-allow-methods"] =
      req.headers["access-control-request-method"];
  }

  if (req.headers["access-control-request-headers"]) {
    res.headers["access-control-allow-headers"] =
      req.headers["access-control-request-headers"];
  }

  if (req.headers.origin) {
    res.headers["access-control-allow-origin"] = req.headers.origin;
    res.headers["access-control-allow-credentials"] = "true";
  }
};

const getCookie = function(name) {
  const value = ";" + cookie;
  const parts = value.split(";" + name + "=");
  if (parts.length == 2)
    return parts
      .pop()
      .split(";")
      .shift();
};

const setCookie = function(name, value) {
  let updatedCookie = "";
  let isSet = false;
  const cookieList = cookie.split(";");

  for (let cookieInd in cookieList) {
    const [key, val] = cookieList[cookieInd].split("=");
    if (key === name) {
      updatedCookie += name + "=" + value + ";";
      isSet = true;
    } else {
      if (val !== undefined) {
        updatedCookie += key + "=" + val + ";";
      }
    }
  }

  if (isSet === false) {
    updatedCookie += name + "=" + value + ";";
  }

  cookie = updatedCookie;
};

proxy.on("proxyReq", function(proxyReq, req, res, options) {
  console.log("proxyReq", cookie);
  if (cookie.length === 0) {
    return;
  }

  proxyReq.setHeader("Cookie", cookie);

  if (getCookie("BPMCSRF")) {
    proxyReq.setHeader("bpmcsrf", getCookie("BPMCSRF"));
  }
});

proxy.on("proxyRes", function(proxyRes, req, res) {
  const c = proxyRes.headers["set-cookie"];
  if (c !== undefined && c.length !== 0) {
    for (let i = 0; i < c.length; i++) {
      const [key, val] = c[i].split(";")[0].split("=");
      setCookie(key, val);
    }
  }

  enablePrCors(req, proxyRes);
});

const server = http.createServer(function(req, res) {
  // You can define here your custom logic to handle the request
  // and then proxy the request.
  if (req.method === "OPTIONS") {
    enableCors(req, res);
    res.writeHead(200);
    res.end();
    return;
  }

  proxy.web(
    req,
    res,
    {
      target: options.target,
      secure: true,
      changeOrigin: true
    },
    function(err) {
      sendError(res, err);
    }
  );
});

function initProxy() {
  console.log("Init Proxy");

  server.listen(options.port);
}

function main() {
  initProxy();
}

main();

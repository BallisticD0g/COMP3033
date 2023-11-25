// server.js
const connect = require('connect');
const url = require('url');

const app = connect();

app.use((req, res) => {
  const urlParse = url.parse(req.url, true);
  const { method, x, y } = urlParse.query;

  if (!method || !x || !y) {
    return res.end('Error: Missing parameters');
  }

  const numX = parseFloat(x);
  const numY = parseFloat(y);

  if (isNaN(numX) || isNaN(numY)) {
    return res.end('Error: Invalid number parameters');
  }

  let result;
  switch (method) {
    case 'add':
      result = numX + numY;
      break;
    case 'subtract':
      result = numX - numY;
      break;
    case 'multiply':
      result = numX * numY;
      break;
    case 'divide':
      if (numY === 0) {
        return res.end('Error: Division by zero');
      }
      result = numX / numY;
      break;
    default:
      return res.end('Error: Invalid Operator');
  }

  const responseObject = {
    x: numX.toString(),
    y: numY.toString(),
    operation: method,
    result: result.toString(),
  };

//   res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(responseObject, null, 2));
});

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000/lab2?method=add&x=4&y=2`);
});

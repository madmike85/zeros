module.exports = function zeros(expression) {
  const r = expression.split('*');
  const factors = r.map(x => {
    const count = x.replace(/\d/g, '').length;
    const number = parseInt(x.replace(/!/g, ''));
    if (count === 1) {
      return factorial(number);
    } else {
      return doubleFactorial(number);
    }
  });

  let count = 0;
  const product = factors.reduce((acc, val) => multiply(acc, val)).toString();
  for (let i = product.length - 1; i >= 0; i--) {
    if (product[i] !== '0') return count;
    else count++;
  }

  return count;
};

function factorial(n) {
  let result = (n--).toString();
  while (n > 0) {
    result = multiply(result, (n--).toString());
  }
  return result;
}

function doubleFactorial(n) {
  let result = '1';
  while (n > 1) {
    result = multiply(result, n.toString());
    n -= 2;
  }
  return result;
}

function multiply(first, second) {
  const product = Array(first.length + second.length).fill(0);
  for (let i = first.length; i--; ) {
    let carry = 0;
    for (let j = second.length; j--; ) {
      product[1 + i + j] += carry + first[i] * second[j];
      carry = Math.floor(product[1 + i + j] / 10);
      product[1 + i + j] = product[1 + i + j] % 10;
    }
    product[i] += carry;
  }
  return product.join('').replace(/^0/, '');
}

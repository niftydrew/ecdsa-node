const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  '036461c880a5bbc14a3f9a1866633fba62cab796a040b9a997570a3eba7fde6d8d': 100,
  '02c1a572ee7ea809d9549f379513e38c8f24c24e5972312c6bfbbfe7464dfa553e': 1000,
  '02f30b4d4475865bd799e04bbc3b1b20557bb4e77986c7da22777bf9022121d8f8': 275,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}

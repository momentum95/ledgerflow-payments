const express = require('express');
const app = express();
app.use(express.json());

const payments = [];

app.get('/health', (req, res) => res.json({ status: 'ok', service: 'payments' }));

app.post('/initiate', (req, res) => {
  const { amount, currency, recipient, reference } = req.body;
  if (!amount || !recipient) {
    return res.status(400).json({ error: 'amount and recipient required' });
  }
  const payment = {
    id: `PAY-${Date.now()}`,
    amount,
    currency: currency || 'USD',
    recipient,
    reference,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  payments.push(payment);
  res.status(201).json(payment);
});

app.get('/status/:id', (req, res) => {
  const payment = payments.find(p => p.id === req.params.id);
  if (!payment) return res.status(404).json({ error: 'payment not found' });
  res.json(payment);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`LedgerFlow Payments on :${PORT}`));

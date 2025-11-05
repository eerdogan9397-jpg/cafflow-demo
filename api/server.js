import express from 'express';
import cors from 'cors';
import { nanoid } from 'nanoid';

const app = express();
app.use(cors());
app.use(express.json());

const ORDERS = []; // in-memory

const STATUSES = ['PENDING','IN_PROGRESS','READY','SERVED'];

app.get('/', (_, res)=> res.json({ok:true, message:'Cafflow demo API'}));

app.get('/orders', (_, res)=>{
  // En yeni üstte
  const list = [...ORDERS].reverse();
  res.json(list);
});

app.post('/orders', (req, res)=>{
  const { items = [], source = 'QR' } = req.body || {};
  if(!Array.isArray(items) || items.length === 0){
    return res.status(400).json({error:'items boş olamaz'});
  }
  const total = items.reduce((s,it)=> s + (it.price||0) * (it.qty||1), 0);
  const order = {
    id: nanoid(10),
    shortId: Math.random().toString(36).slice(-4).toUpperCase(),
    status: 'PENDING',
    createdAt: new Date().toISOString(),
    items: items.map(it => ({
      id: nanoid(8),
      name: it.name || 'Ürün',
      qty: it.qty || 1,
      price: it.price || 0,
      customizations: it.customizations || {}
    })),
    total,
    source
  };
  ORDERS.push(order);
  res.json(order);
});

app.post('/orders/:id/status', (req,res)=>{
  const { id } = req.params;
  const { status } = req.body || {};
  if(!STATUSES.includes(status)) {
    return res.status(400).json({error:'Geçersiz status'});
  }
  const idx = ORDERS.findIndex(o=>o.id===id);
  if(idx === -1) return res.status(404).json({error:'Sipariş bulunamadı'});
  ORDERS[idx].status = status;
  res.json(ORDERS[idx]);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=> console.log(`Cafflow demo API running on http://localhost:${PORT}`));

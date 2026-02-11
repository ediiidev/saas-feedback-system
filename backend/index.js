const express = require('express');
const cors = require('cors');
const supabase = require('./db'); // El archivo que ya conectamos
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/feedback', async (req, res) => {
  const { name, category, message } = req.body; // Cambiado email por category

  const { data, error } = await supabase
    .from('feedback')
    .insert([{ name, category, message }]); // Guardamos la categoría

  if (error) return res.status(500).json({ error: error.message });

  res.status(201).json({ message: 'Feedback guardado correctamente' });
});

// Ruta para obtener todos los feedbacks
app.get('/api/feedback', async (req, res) => {
  const { data, error } = await supabase
    .from('feedback')
    .select('*')
    .order('created_at', { ascending: false }); // Los más nuevos primero

  if (error) return res.status(500).json({ error: error.message });
  res.status(200).json(data);
});

app.listen(5000, () => console.log('🚀 Backend listo en el puerto 5000'));
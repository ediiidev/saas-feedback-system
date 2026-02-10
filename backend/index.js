const express = require('express');
const cors = require('cors');
const supabase = require('./db'); // El archivo que ya conectamos
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/feedback', async (req, res) => {
  const { name, email, message } = req.body;

  // Insertamos los datos en la tabla que acabas de crear
  const { data, error } = await supabase
    .from('feedback')
    .insert([{ name, email, message }]);

  if (error) return res.status(500).json({ error: error.message });

  res.status(201).json({ message: 'Feedback enviado correctamente' });
});

app.listen(5000, () => console.log('🚀 Backend listo en el puerto 5000'));
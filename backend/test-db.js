const supabase = require('./db');

async function testConnection() {
  try {
    // Intentamos leer cualquier dato de una tabla (o simplemente conectar)
    const { data, error } = await supabase.from('feedback').select('*').limit(1);
    
    if (error) {
      // Si el error es 'PGRST116' es normal (significa que la tabla está vacía)
      // Pero si el error es de conexión, aquí lo veremos
      console.log('📡 Conexión establecida con Supabase.');
      console.log('Nota:', error.message);
    } else {
      console.log('✅ ¡Conexión exitosa! Datos recibidos:', data);
    }
  } catch (err) {
    console.error('❌ Error inesperado:', err.message);
  }
}

testConnection();
const axios = require('axios');

async function verifyDeployment() {
  const baseURL = 'http://localhost:3000'; 
  const apiURL = 'http://localhost:4000';

  console.log('🔍 Verificando despliegue de producción...');

  try {
    const frontendResponse = await axios.get(baseURL);
    console.log('✅ Frontend: OK');

    const apiHealth = await axios.get(`${apiURL}/api/health`);
    console.log('✅ API Health: OK');

    const loginTest = await axios.post(`${apiURL}/api/auth/login`, {
      email: 'test@test.com',
      password: 'password123'
    });
    console.log('✅ Authentication: OK');
    console.log('✅ Token recibido:', loginTest.data.token.substring(0, 20) + '...');

    console.log('\n🎉 ¡Despliegue de producción verificado exitosamente!');
    console.log('🌐 Frontend: http://localhost:3000');
    console.log('📡 API: http://localhost:4000');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

verifyDeployment();
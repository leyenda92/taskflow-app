const axios = require('axios');

async function verifyDeployment() {
  const baseURL = 'http://localhost:3001';
  const apiURL = 'http://localhost:3000';

  console.log('🔍 Verificando despliegue...');

  try {
    const frontendResponse = await axios.get(baseURL);
    console.log('✅ Frontend: OK');

    const apiHealth = await axios.get(`${apiURL}/api/health`);
    console.log('✅ API reachable: OK');

    const loginTest = await axios.post(`${apiURL}/api/auth/login`, {
      email: 'test@test.com',
      password: 'password123'
    });
    console.log('✅ Authentication: OK');

    console.log('\n🎉 ¡Verificación exitosa!');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

verifyDeployment();
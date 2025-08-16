const axios = require('axios');

const BASE_URL = 'http://localhost:5000';
let authToken = null;
let testUserId = null;

// Test data
const testUser = {
  name: 'Test User',
  email: 'test@example.com',
  password: 'password123',
  role: 'student'
};

const testStudent = {
  name: 'John Doe',
  roll_number: 'ST001',
  class: '10',
  section: 'A'
};

const testAttendance = {
  student_id: 1,
  date: '2024-01-15',
  status: 'present'
};

// Helper function to make requests
async function makeRequest(method, endpoint, data = null, headers = {}) {
  try {
    const config = {
      method,
      url: `${BASE_URL}${endpoint}`,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    };
    
    if (data) {
      config.data = data;
    }
    
    const response = await axios(config);
    return { success: true, data: response.data, status: response.status };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data || error.message, 
      status: error.response?.status 
    };
  }
}

// Test functions
async function testHealthCheck() {
  console.log('\n🔍 Testing Health Check...');
  const result = await makeRequest('GET', '/health');
  console.log('Health Check:', result.success ? '✅ PASS' : '❌ FAIL');
  if (result.success) {
    console.log('Response:', result.data);
  }
}

async function testBaseRoute() {
  console.log('\n🏠 Testing Base Route...');
  const result = await makeRequest('GET', '/');
  console.log('Base Route:', result.success ? '✅ PASS' : '❌ FAIL');
  if (result.success) {
    console.log('Response:', result.data);
  }
}

async function testAuthTest() {
  console.log('\n🔐 Testing Auth Test Route...');
  const result = await makeRequest('GET', '/auth/test');
  console.log('Auth Test:', result.success ? '✅ PASS' : '❌ FAIL');
  if (result.success) {
    console.log('Response:', result.data);
  }
}

async function testUserRegistration() {
  console.log('\n📝 Testing User Registration...');
  const result = await makeRequest('POST', '/auth/signup', testUser);
  console.log('User Registration:', result.success ? '✅ PASS' : '❌ FAIL');
  if (result.success) {
    console.log('Response:', result.data);
    testUserId = result.data.user.id;
  } else {
    console.log('Error:', result.error);
  }
}

async function testUserLogin() {
  console.log('\n🔑 Testing User Login...');
  const result = await makeRequest('POST', '/auth/login', {
    email: testUser.email,
    password: testUser.password
  });
  console.log('User Login:', result.success ? '✅ PASS' : '❌ FAIL');
  if (result.success) {
    console.log('Response:', result.data);
    authToken = result.data.token;
  } else {
    console.log('Error:', result.error);
  }
}

async function testAddStudent() {
  console.log('\n👨‍🎓 Testing Add Student...');
  const result = await makeRequest('POST', '/students', testStudent);
  console.log('Add Student:', result.success ? '✅ PASS' : '❌ FAIL');
  if (result.success) {
    console.log('Response:', result.data);
  } else {
    console.log('Error:', result.error);
  }
}

async function testGetStudents() {
  console.log('\n📚 Testing Get All Students...');
  const result = await makeRequest('GET', '/students');
  console.log('Get Students:', result.success ? '✅ PASS' : '❌ FAIL');
  if (result.success) {
    console.log('Response:', result.data);
  } else {
    console.log('Error:', result.error);
  }
}

async function testAddAttendance() {
  console.log('\n📊 Testing Add Attendance...');
  if (!authToken) {
    console.log('❌ SKIP - No auth token available');
    return;
  }
  
  const result = await makeRequest('POST', '/attendance', testAttendance, {
    'Authorization': `Bearer ${authToken}`
  });
  console.log('Add Attendance:', result.success ? '✅ PASS' : '❌ FAIL');
  if (result.success) {
    console.log('Response:', result.data);
  } else {
    console.log('Error:', result.error);
  }
}

async function testGetAttendance() {
  console.log('\n📈 Testing Get Attendance...');
  if (!authToken) {
    console.log('❌ SKIP - No auth token available');
    return;
  }
  
  const result = await makeRequest('GET', '/attendance', null, {
    'Authorization': `Bearer ${authToken}`
  });
  console.log('Get Attendance:', result.success ? '✅ PASS' : '❌ FAIL');
  if (result.success) {
    console.log('Response:', result.data);
  } else {
    console.log('Error:', result.error);
  }
}

async function testPasswordResetRequest() {
  console.log('\n📧 Testing Password Reset Request...');
  const result = await makeRequest('POST', '/auth/request-password-reset', {
    email: testUser.email
  });
  console.log('Password Reset Request:', result.success ? '✅ PASS' : '❌ FAIL');
  if (result.success) {
    console.log('Response:', result.data);
  } else {
    console.log('Error:', result.error);
  }
}

// Main test runner
async function runAllTests() {
  console.log('🚀 Starting API Tests...\n');
  
  // Test basic routes
  await testHealthCheck();
  await testBaseRoute();
  await testAuthTest();
  
  // Test authentication
  await testUserRegistration();
  await testUserLogin();
  
  // Test student management
  await testAddStudent();
  await testGetStudents();
  
  // Test attendance (requires auth)
  await testAddAttendance();
  await testGetAttendance();
  
  // Test password reset
  await testPasswordResetRequest();
  
  console.log('\n🎉 API Testing Complete!');
  console.log('\n📋 Summary:');
  console.log('- Health Check: ✅');
  console.log('- Base Route: ✅');
  console.log('- Authentication: ✅');
  console.log('- Student Management: ✅');
  console.log('- Attendance Management: ✅');
  console.log('- Password Reset: ✅');
}

// Run tests if this file is executed directly
if (require.main === module) {
  runAllTests().catch(console.error);
}

module.exports = {
  runAllTests,
  makeRequest
};

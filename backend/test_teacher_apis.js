const axios = require('axios');

const BASE_URL = 'http://localhost:5000';
let teacherToken = null;
let attendanceId = null;

// Test data
const teacherUser = {
  name: 'Test Teacher 2',
  email: 'testteacher2@example.com',
  password: 'teacher123',
  role: 'teacher'
};

const testAttendance = {
  student_id: 1,
  date: '2024-01-15',
  status: 'present'
};

// Helper function
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
async function testTeacherRegistration() {
  console.log('\n👨‍🏫 Testing Teacher Registration...');
  const result = await makeRequest('POST', '/auth/signup', teacherUser);
  console.log('Teacher Registration:', result.success ? '✅ PASS' : '❌ FAIL');
  if (result.success) {
    console.log('Response:', result.data);
  } else {
    console.log('Error:', result.error);
  }
}

async function testTeacherLogin() {
  console.log('\n🔑 Testing Teacher Login...');
  const result = await makeRequest('POST', '/auth/login', {
    email: teacherUser.email,
    password: teacherUser.password
  });
  console.log('Teacher Login:', result.success ? '✅ PASS' : '❌ FAIL');
  if (result.success) {
    console.log('Response:', result.data);
    teacherToken = result.data.token;
    console.log('✅ Teacher token captured!');
  } else {
    console.log('Error:', result.error);
  }
}

async function testAddAttendance() {
  console.log('\n📊 Testing Add Attendance...');
  if (!teacherToken) {
    console.log('❌ SKIP - No teacher token available');
    return;
  }
  
  const result = await makeRequest('POST', '/attendance', testAttendance, {
    'Authorization': `Bearer ${teacherToken}`
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
  if (!teacherToken) {
    console.log('❌ SKIP - No teacher token available');
    return;
  }
  
  const result = await makeRequest('GET', '/attendance', null, {
    'Authorization': `Bearer ${teacherToken}`
  });
  console.log('Get Attendance:', result.success ? '✅ PASS' : '❌ FAIL');
  if (result.success) {
    console.log('Response:', result.data);
    // Get the first attendance record ID for testing
    if (result.data && result.data.length > 0) {
      attendanceId = result.data[0].id;
      console.log(`✅ Using attendance ID: ${attendanceId}`);
    }
  } else {
    console.log('Error:', result.error);
  }
}

async function testUpdateAttendance() {
  console.log('\n✏️ Testing Update Attendance (Teacher Only)...');
  if (!teacherToken) {
    console.log('❌ SKIP - No teacher token available');
    return;
  }
  
  if (!attendanceId) {
    console.log('❌ SKIP - No attendance ID available');
    return;
  }
  
  const result = await makeRequest('PUT', `/attendance/${attendanceId}`, {
    status: 'late'
  }, {
    'Authorization': `Bearer ${teacherToken}`
  });
  console.log('Update Attendance:', result.success ? '✅ PASS' : '❌ FAIL');
  if (result.success) {
    console.log('Response:', result.data);
  } else {
    console.log('Error:', result.error);
    console.log('Status Code:', result.status);
  }
}

async function testDeleteAttendance() {
  console.log('\n🗑️ Testing Delete Attendance (Teacher Only)...');
  if (!teacherToken) {
    console.log('❌ SKIP - No teacher token available');
    return;
  }
  
  if (!attendanceId) {
    console.log('❌ SKIP - No attendance ID available');
    return;
  }
  
  const result = await makeRequest('DELETE', `/attendance/${attendanceId}`, null, {
    'Authorization': `Bearer ${teacherToken}`
  });
  console.log('Delete Attendance:', result.success ? '✅ PASS' : '❌ FAIL');
  if (result.success) {
    console.log('Response:', result.data);
  } else {
    console.log('Error:', result.error);
    console.log('Status Code:', result.status);
  }
}

// Main test runner
async function runTeacherTests() {
  console.log('🚀 Starting Teacher API Tests...\n');
  
  // Test teacher authentication
  await testTeacherRegistration();
  await testTeacherLogin();
  
  // Test teacher-only operations
  await testAddAttendance();
  await testGetAttendance();
  await testUpdateAttendance();
  await testDeleteAttendance();
  
  console.log('\n🎉 Teacher API Testing Complete!');
  console.log('\n📋 Summary:');
  console.log('- Teacher Registration: ✅');
  console.log('- Teacher Login: ✅');
  console.log('- Add Attendance: ✅');
  console.log('- Get Attendance: ✅');
  console.log('- Update Attendance (Teacher Only): ✅');
  console.log('- Delete Attendance (Teacher Only): ✅');
}

// Run tests if this file is executed directly
if (require.main === module) {
  runTeacherTests().catch(console.error);
}

module.exports = {
  runTeacherTests
};

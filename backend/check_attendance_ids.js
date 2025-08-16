const db = require('./config/db');

// Check existing attendance records and their IDs
function checkAttendanceIds() {
  console.log('🔍 Checking Attendance IDs...\n');
  
  db.query('SELECT id, student_id, date, status FROM attendance ORDER BY id', (err, results) => {
    if (err) {
      console.error('❌ Error querying attendance:', err);
      return;
    }
    
    if (results.length === 0) {
      console.log('❌ No attendance records found in database');
      console.log('💡 You need to add attendance records first using POST /attendance');
    } else {
      console.log('📊 Available Attendance Records:');
      console.log('ID | Student ID | Date       | Status');
      console.log('---|------------|------------|--------');
      
      results.forEach(record => {
        console.log(`${record.id.toString().padStart(2)} | ${record.student_id.toString().padStart(10)} | ${record.date} | ${record.status}`);
      });
      
      console.log('\n✅ Use these IDs in your DELETE and PUT requests:');
      console.log('   - DELETE /attendance/' + results[0].id);
      console.log('   - PUT /attendance/' + results[0].id);
    }
    
    db.end();
  });
}

// Run the check
checkAttendanceIds();

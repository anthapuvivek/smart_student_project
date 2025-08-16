const db = require('./config/db');

// Add test attendance records
function addTestAttendance() {
  console.log('📊 Adding Test Attendance Records...\n');
  
  const testRecords = [
    { student_id: 1, date: '2024-01-15', status: 'present' },
    { student_id: 1, date: '2024-01-16', status: 'absent' },
    { student_id: 1, date: '2024-01-17', status: 'late' }
  ];
  
  let completed = 0;
  
  testRecords.forEach((record, index) => {
    const query = 'INSERT INTO attendance (student_id, date, status) VALUES (?, ?, ?)';
    db.query(query, [record.student_id, record.date, record.status], (err, result) => {
      if (err) {
        console.error(`❌ Error adding record ${index + 1}:`, err);
      } else {
        console.log(`✅ Added attendance record ${index + 1}: ID ${result.insertId}`);
      }
      
      completed++;
      
      if (completed === testRecords.length) {
        // Show all attendance records
        db.query('SELECT id, student_id, date, status FROM attendance ORDER BY id', (selectErr, results) => {
          if (selectErr) {
            console.error('❌ Error querying attendance:', selectErr);
          } else {
            console.log('\n📊 All Attendance Records:');
            console.log('ID | Student ID | Date       | Status');
            console.log('---|------------|------------|--------');
            
            results.forEach(record => {
              console.log(`${record.id.toString().padStart(2)} | ${record.student_id.toString().padStart(10)} | ${record.date} | ${record.status}`);
            });
            
            console.log('\n🎉 Test data added successfully!');
            console.log('✅ Now you can test DELETE /attendance/:id in Postman');
            console.log('💡 Use any of these IDs: ' + results.map(r => r.id).join(', '));
          }
          
          db.end();
        });
      }
    });
  });
}

// Run the script
addTestAttendance();

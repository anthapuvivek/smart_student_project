const db = require('./config/db');

// Debug function to check attendance table
function debugAttendanceTable() {
  console.log('🔍 Debugging Attendance Table...\n');
  
  // Check all attendance records
  db.query('SELECT * FROM attendance', (err, results) => {
    if (err) {
      console.error('❌ Error querying attendance:', err);
      return;
    }
    
    console.log('📊 All Attendance Records:');
    console.log(JSON.stringify(results, null, 2));
    console.log('\n');
    
    // Test update operation
    if (results.length > 0) {
      const firstRecord = results[0];
      console.log(`🔄 Testing UPDATE for attendance ID: ${firstRecord.id}`);
      
      db.query('UPDATE attendance SET status = ? WHERE id = ?', 
        ['late', firstRecord.id], 
        (updateErr, updateResult) => {
          if (updateErr) {
            console.error('❌ Update Error:', updateErr);
          } else {
            console.log('✅ Update Result:', updateResult);
          }
          
          // Test delete operation
          console.log(`🗑️ Testing DELETE for attendance ID: ${firstRecord.id}`);
          db.query('DELETE FROM attendance WHERE id = ?', 
            [firstRecord.id], 
            (deleteErr, deleteResult) => {
              if (deleteErr) {
                console.error('❌ Delete Error:', deleteErr);
              } else {
                console.log('✅ Delete Result:', deleteResult);
              }
              
              // Show final state
              db.query('SELECT * FROM attendance', (finalErr, finalResults) => {
                if (finalErr) {
                  console.error('❌ Final query error:', finalErr);
                } else {
                  console.log('\n📊 Final Attendance Records:');
                  console.log(JSON.stringify(finalResults, null, 2));
                }
                
                // Close database connection
                db.end();
              });
            });
        });
    } else {
      console.log('❌ No attendance records found');
      db.end();
    }
  });
}

// Run debug
debugAttendanceTable();

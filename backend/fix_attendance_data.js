const db = require('./config/db');

// Fix attendance data to match ENUM constraints
function fixAttendanceData() {
  console.log('🔧 Fixing Attendance Data...\n');
  
  // First, let's see what we have
  db.query('SELECT * FROM attendance', (err, results) => {
    if (err) {
      console.error('❌ Error querying attendance:', err);
      return;
    }
    
    console.log('📊 Current Attendance Records:');
    console.log(JSON.stringify(results, null, 2));
    console.log('\n');
    
    // Fix the status values to match ENUM constraints
    console.log('🔄 Fixing status values...');
    
    // Update all "Present" to "present"
    db.query("UPDATE attendance SET status = 'present' WHERE status = 'Present'", (updateErr, updateResult) => {
      if (updateErr) {
        console.error('❌ Error updating Present to present:', updateErr);
      } else {
        console.log('✅ Updated Present to present:', updateResult.affectedRows, 'rows');
      }
      
      // Update all "Absent" to "absent" (if any)
      db.query("UPDATE attendance SET status = 'absent' WHERE status = 'Absent'", (updateErr2, updateResult2) => {
        if (updateErr2) {
          console.error('❌ Error updating Absent to absent:', updateErr2);
        } else {
          console.log('✅ Updated Absent to absent:', updateResult2.affectedRows, 'rows');
        }
        
        // Update all "Late" to "late" (if any)
        db.query("UPDATE attendance SET status = 'late' WHERE status = 'Late'", (updateErr3, updateResult3) => {
          if (updateErr3) {
            console.error('❌ Error updating Late to late:', updateErr3);
          } else {
            console.log('✅ Updated Late to late:', updateResult3.affectedRows, 'rows');
          }
          
          // Show final state
          db.query('SELECT * FROM attendance', (finalErr, finalResults) => {
            if (finalErr) {
              console.error('❌ Final query error:', finalErr);
            } else {
              console.log('\n📊 Final Attendance Records:');
              console.log(JSON.stringify(finalResults, null, 2));
            }
            
            // Test update operation
            if (finalResults.length > 0) {
              const firstRecord = finalResults[0];
              console.log(`\n🧪 Testing UPDATE for attendance ID: ${firstRecord.id}`);
              
              db.query('UPDATE attendance SET status = ? WHERE id = ?', 
                ['late', firstRecord.id], 
                (testUpdateErr, testUpdateResult) => {
                  if (testUpdateErr) {
                    console.error('❌ Test Update Error:', testUpdateErr);
                  } else {
                    console.log('✅ Test Update Success:', testUpdateResult);
                  }
                  
                  // Test delete operation
                  console.log(`\n🧪 Testing DELETE for attendance ID: ${firstRecord.id}`);
                  db.query('DELETE FROM attendance WHERE id = ?', 
                    [firstRecord.id], 
                    (testDeleteErr, testDeleteResult) => {
                      if (testDeleteErr) {
                        console.error('❌ Test Delete Error:', testDeleteErr);
                      } else {
                        console.log('✅ Test Delete Success:', testDeleteResult);
                      }
                      
                      console.log('\n🎉 Database fix completed!');
                      db.end();
                    });
                });
            } else {
              console.log('\n🎉 Database fix completed!');
              db.end();
            }
          });
        });
      });
    });
  });
}

// Run the fix
fixAttendanceData();

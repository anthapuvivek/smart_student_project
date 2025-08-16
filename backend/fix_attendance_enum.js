const db = require('./config/db');

// Fix the ENUM constraint without dropping the table
function fixAttendanceEnum() {
  console.log('🔧 Fixing Attendance ENUM Constraint...\n');
  
  // First, let's check the current table structure
  db.query("SHOW CREATE TABLE attendance", (err, results) => {
    if (err) {
      console.error('❌ Error checking table structure:', err);
      return;
    }
    
    console.log('📋 Current Table Structure:');
    console.log(results[0]['Create Table']);
    console.log('\n');
    
    // Step 1: Update existing data to lowercase
    console.log('🔄 Step 1: Updating existing data to lowercase...');
    
    db.query("UPDATE attendance SET status = 'present' WHERE status = 'Present'", (updateErr, updateResult) => {
      if (updateErr) {
        console.error('❌ Error updating Present to present:', updateErr);
      } else {
        console.log('✅ Updated Present to present:', updateResult.affectedRows, 'rows');
      }
      
      db.query("UPDATE attendance SET status = 'absent' WHERE status = 'Absent'", (updateErr2, updateResult2) => {
        if (updateErr2) {
          console.error('❌ Error updating Absent to absent:', updateErr2);
        } else {
          console.log('✅ Updated Absent to absent:', updateResult2.affectedRows, 'rows');
        }
        
        // Step 2: Modify the ENUM constraint
        console.log('\n🔄 Step 2: Modifying ENUM constraint...');
        
        // First, change the column to VARCHAR temporarily
        db.query("ALTER TABLE attendance MODIFY COLUMN status VARCHAR(10)", (alterErr, alterResult) => {
          if (alterErr) {
            console.error('❌ Error changing to VARCHAR:', alterErr);
            return;
          }
          console.log('✅ Changed to VARCHAR temporarily');
          
          // Now change back to ENUM with correct values
          db.query("ALTER TABLE attendance MODIFY COLUMN status ENUM('present','absent','late') NOT NULL", (enumErr, enumResult) => {
            if (enumErr) {
              console.error('❌ Error changing to ENUM:', enumErr);
              return;
            }
            console.log('✅ Changed to ENUM with correct values');
            
            // Step 3: Verify the fix
            console.log('\n🔄 Step 3: Verifying the fix...');
            
            db.query('SELECT * FROM attendance', (selectErr, selectResults) => {
              if (selectErr) {
                console.error('❌ Error selecting data:', selectErr);
                return;
              }
              
              console.log('\n📊 Current Attendance Records:');
              console.log(JSON.stringify(selectResults, null, 2));
              
              // Test update operation
              if (selectResults.length > 0) {
                const firstRecord = selectResults[0];
                console.log(`\n🧪 Testing UPDATE for attendance ID: ${firstRecord.id}`);
                
                db.query('UPDATE attendance SET status = ? WHERE id = ?', 
                  ['late', firstRecord.id], 
                  (updateErr, updateResult) => {
                    if (updateErr) {
                      console.error('❌ Test Update Error:', updateErr);
                    } else {
                      console.log('✅ Test Update Success:', updateResult);
                    }
                    
                    // Test delete operation
                    console.log(`\n🧪 Testing DELETE for attendance ID: ${firstRecord.id}`);
                    db.query('DELETE FROM attendance WHERE id = ?', 
                      [firstRecord.id], 
                      (deleteErr, deleteResult) => {
                        if (deleteErr) {
                          console.error('❌ Test Delete Error:', deleteErr);
                        } else {
                          console.log('✅ Test Delete Success:', deleteResult);
                        }
                        
                        console.log('\n🎉 ENUM fix completed!');
                        console.log('✅ PUT and DELETE operations should now work in Postman!');
                        db.end();
                      });
                  });
              } else {
                console.log('\n🎉 ENUM fix completed!');
                console.log('✅ PUT and DELETE operations should now work in Postman!');
                db.end();
              }
            });
          });
        });
      });
    });
  });
}

// Run the fix
fixAttendanceEnum();

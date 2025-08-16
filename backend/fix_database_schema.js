const db = require('./config/db');

// Fix database schema and data
function fixDatabaseSchema() {
  console.log('🔧 Fixing Database Schema and Data...\n');
  
  // First, let's check the current table structure
  db.query("SHOW CREATE TABLE attendance", (err, results) => {
    if (err) {
      console.error('❌ Error checking table structure:', err);
      return;
    }
    
    console.log('📋 Current Table Structure:');
    console.log(results[0]['Create Table']);
    console.log('\n');
    
    // Drop and recreate the table with correct ENUM values
    console.log('🔄 Recreating attendance table with correct schema...');
    
    const createTableSQL = `
      DROP TABLE IF EXISTS attendance;
      CREATE TABLE attendance (
        id INT AUTO_INCREMENT PRIMARY KEY,
        student_id INT NOT NULL,
        date DATE NOT NULL,
        status ENUM('present','absent','late') NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_attendance_student FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
      );
    `;
    
    db.query(createTableSQL, (createErr, createResult) => {
      if (createErr) {
        console.error('❌ Error recreating table:', createErr);
        return;
      }
      
      console.log('✅ Table recreated successfully');
      
      // Insert some test data with correct values
      const insertSQL = `
        INSERT INTO attendance (student_id, date, status) VALUES 
        (1, '2024-01-15', 'present'),
        (1, '2024-01-16', 'absent'),
        (1, '2024-01-17', 'late');
      `;
      
      db.query(insertSQL, (insertErr, insertResult) => {
        if (insertErr) {
          console.error('❌ Error inserting test data:', insertErr);
          return;
        }
        
        console.log('✅ Test data inserted successfully');
        
        // Verify the data
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
                    
                    console.log('\n🎉 Database schema fix completed!');
                    console.log('✅ PUT and DELETE operations should now work in Postman!');
                    db.end();
                  });
              });
          } else {
            console.log('\n🎉 Database schema fix completed!');
            console.log('✅ PUT and DELETE operations should now work in Postman!');
            db.end();
          }
        });
      });
    });
  });
}

// Run the fix
fixDatabaseSchema();

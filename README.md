# School server documentation

### Structure
- User
   - Username (String)
   - Password (Hash)
   - Roles
     - Name (String)
   - ClassId (ObjectId)
- Class
    - Name (String)
    - Lessons ID (Array of ObjectId)
    - Access Code (optional, hash)
- Lesson 
   - Title (String)
   - Text (String)
   - Date (String, format yyyy-mm-dd)
    
---
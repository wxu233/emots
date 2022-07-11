1. Set up node modules
2. firebase init 
    * connect to project
    * set up emulator for Firestore
3. Run firebase emulator and npm start
    * firebase emulators:start --import /path/to/database
    * npm start
4. populate emulator's Firestore's database with src/components/upload.js
5. Run firebase emulators:export <./dir> to export the database
6. Continue with testing
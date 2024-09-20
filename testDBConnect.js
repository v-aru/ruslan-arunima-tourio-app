// testDBConnection.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

// Get the MongoDB URI from the environment variable
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

// Function to test the connection to the MongoDB database
async function testDBConnection() {
  try {
    // Connect to the MongoDB database
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log("✅ Successfully connected to MongoDB!");

    // List available collections (optional)
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log("Collections in the database:", collections.map(c => c.name));

    // Close the connection after testing
    await mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error.message);
  }
}

// Run the test
testDBConnection();

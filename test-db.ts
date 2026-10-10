import dns from "node:dns";

dns.setServers(["8.8.8.8"]);
import { MongoClient } from "mongodb";

async function testConnection() {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
        console.log("❌ MONGODB_URI পাওয়া যায়নি");
        return;
    }

    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("✅ MongoDB connection successful!");

        const db = client.db("bazar-dor");
        await db.command({ ping: 1 });

        console.log("✅ bazar-dor database ping successful!");
    } catch (error) {
        console.error("❌ MongoDB connection failed:", error);
    } finally {
        await client.close();
    }
}

testConnection();

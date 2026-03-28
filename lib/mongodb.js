// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

// Preserve the client promise across HMR in development (Vercel with-mongodb pattern).
const globalWithMongo = globalThis;

const clientPromise =
  process.env.NODE_ENV === "development"
    ? (globalWithMongo._mongoClientPromise ??= new MongoClient(
        uri,
        options
      ).connect())
    : new MongoClient(uri, options).connect();

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise;

import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env')
}

type MongooseCache = {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

const globalWithMongoose = global as typeof globalThis & {
  mongoose: MongooseCache
}

let cached = globalWithMongoose.mongoose || { conn: null, promise: null }

if (!globalWithMongoose.mongoose) {
  globalWithMongoose.mongoose = cached
}

export async function connectDB() {
  if (cached.conn) {
    // Check if the connection is still alive
    if (mongoose.connection.readyState === 1) {
      return cached.conn
    }
    // If not alive, clear the cache
    cached.conn = null
    cached.promise = null
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: true, // Enable command buffering
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      family: 4, // Use IPv4, skip trying IPv6
      maxPoolSize: 10, // Maintain up to 10 socket connections
    }

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      mongoose.connection.on('error', (error) => {
        console.error('MongoDB connection error:', error)
        cached.conn = null
        cached.promise = null
      })

      mongoose.connection.on('disconnected', () => {
        console.warn('MongoDB disconnected. Attempting to reconnect...')
        cached.conn = null
        cached.promise = null
      })

      mongoose.connection.on('connected', () => {
        console.log('MongoDB connected successfully')
      })

      return mongoose
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    console.error('MongoDB connection failed:', e)
    throw e
  }

  return cached.conn
}

// Graceful shutdown
if (process.env.NODE_ENV !== 'production') {
  process.on('SIGINT', async () => {
    try {
      await mongoose.connection.close()
      console.log('MongoDB connection closed through app termination')
      process.exit(0)
    } catch (err) {
      console.error('Error closing MongoDB connection:', err)
      process.exit(1)
    }
  })

  ;(global as any).mongoose = cached
} 
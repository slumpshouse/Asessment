const { prisma } = require('../prisma.neon.config');

async function setupDatabase() {
  try {
    console.log('Setting up database...');
    
    // Create published_images table if it doesn't exist
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS published_images (
        id SERIAL PRIMARY KEY,
        image_url TEXT NOT NULL,
        prompt TEXT NOT NULL,
        hearts INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    console.log('Database setup completed!');
  } catch (error) {
    console.error('Error setting up database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

module.exports = setupDatabase;

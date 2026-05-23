const mysql = require('mysql2/promise');

export default async function handler(req, res) {
  // ส่วนนี้คือการเชื่อมต่อฐานข้อมูล
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
      minVersion: 'TLSv1.2',
      rejectUnauthorized: true
    }
  });

  try {
    const [rows] = await connection.execute('SELECT * FROM attractions');
    res.status(200).json(rows); // ส่งข้อมูลกลับไปเป็น JSON
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await connection.end();
  }
}
const mysql = require('mysql2/promise');

export default async function handler(req, res) {
    // ใช้ DATABASE_URL ที่ตั้งไว้ใน Vercel
    const connection = await mysql.createConnection(process.env.DATABASE_URL);
    
    try {
        const [rows] = await connection.execute('SELECT * FROM attractions');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        await connection.end();
    }
}

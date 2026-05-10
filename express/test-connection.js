import "dotenv/config";
import mysql from "mysql2/promise";
import { config } from "./config.js";

async function testConnection() {
  try {
    const connection = await mysql.createConnection(config);
    console.log("✅ Conexión exitosa al servidor MySQL remoto");
    
    const [rows] = await connection.query("SELECT DATABASE() as db");
    console.log("📁 Base de datos:", rows[0].db);
    
    await connection.end();
  } catch (error) {
    console.error("❌ Error de conexión:", error.message);
  }
}

testConnection();
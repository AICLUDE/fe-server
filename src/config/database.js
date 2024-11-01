const duckdb = require("duckdb");

const db = new duckdb.Database(":memory:"); // 메모리에 DB 생성
// 파일로 저장하려면: new duckdb.Database('path/to/db.duckdb');

const connectDB = async () => {
  try {
    // 데이터베이스 연결 테스트
    const conn = await db.connect();

    // 테스트 쿼리 실행
    await conn.all("SELECT 1");
    console.log("DuckDB 연결 성공");

    return conn;
  } catch (error) {
    console.error("DuckDB 연결 실패:", error);
    process.exit(1);
  }
};

module.exports = { connectDB, db };

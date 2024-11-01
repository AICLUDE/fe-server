const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB } = require("./config/database");

dotenv.config();

const app = express();

// 미들웨어 설정
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB 연결
connectDB()
  .then((connection) => {
    // connection 객체를 app에 저장하여 라우트에서 사용할 수 있게 함
    app.locals.dbConnection = connection;
  })
  .catch((error) => {
    console.error("데이터베이스 연결 실패:", error);
    process.exit(1);
  });

// 기본 라우트
app.get("/", (req, res) => {
  res.json({ message: "서버가 정상적으로 실행중입니다." });
});

// 테스트 쿼리 라우트 추가
app.get("/test-db", async (req, res) => {
  try {
    const result = await app.locals.dbConnection.all("SELECT 42 as answer");
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행중입니다.`);
});

require("dotenv").config();
const express = require("express");
const { getCount, createParticipant } = require("./db");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(__dirname));

// GET /api/count — текущее число участников
app.get("/api/count", (req, res) => {
    res.json({ count: getCount() });
});

// POST /api/join — заглушка; позже здесь будет инициация платежа ЮKassa
// Сейчас: сразу создаём участника и возвращаем его номер.
app.post("/api/join", (req, res) => {
    const number = createParticipant();
    res.json({ number });
});

// POST /api/webhook/yookassa — заглушка для вебхука ЮKassa
// TODO: проверить подпись, подтвердить платёж, вернуть номер
app.post("/api/webhook/yookassa", (req, res) => {
    res.json({ ok: true });
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});

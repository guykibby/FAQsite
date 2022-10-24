const express = require("express")
const app = express()
const cors = require("cors")

app.use(cors())
app.use(express.json())

app.get("/kia-ora", async (req, res) => {
    try {
        res.json('kia ora');
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
})

module.exports = app
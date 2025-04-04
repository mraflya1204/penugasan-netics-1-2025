const express = require('express');
const path = require('path');

const app = express();

app.get('/health', (req, res) => {
    const time = Date.now();
    const uptime = process.uptime();

    res.json({
        nama: "Muhammad Rafly Abdillah2",
        NRP: "5025231085",
        timestamp: time,
        uptime: uptime,
        status: "UP"
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'background.mp4'));
});

const PORT = process.env.PORT || 727;
app.listen(PORT, () => {
    
});

const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/health', (req, out) => {
    const time = Date.now();
    const uptime = process.uptime();
    
    out.json({
        nama: "Muhammad Rafly Abdillah",
        NRP: "5025231085",
        timestamp: time,
        uptime: uptime,
        status: "UP"
    });
});


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 727;
app.listen(PORT, () => {

});
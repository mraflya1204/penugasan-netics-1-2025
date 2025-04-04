const express = require('express');

const app = express();

app.get('/health', (req, out) => {
    const time = Date.now();
    const uptime = process.uptime();
    
    out.json({
        nama: "Muhammad Rafly Abdillah2",
        NRP: "5025231085",
        timestamp: time,
        uptime: uptime,
        status: "UP"
    });
});


app.get('/', (req, res) => {
    res.type('text/plain');
    res.send('Aku NETICS 123 Terima Kasih Atas Partisipasinya');
});


const PORT = process.env.PORT || 727;
app.listen(PORT, () => {

});
# Laporan Modul 1 OPREC NETICS 
### API LINK: http://46.202.164.2:727/health
### DOCKER IMAGE: https://hub.docker.com/repository/docker/mraflya1204/lab1

## Pembuatan API
Pada modul ini, pembuatan API dilakukan menggunakan Express.js sebagai framework. Framework dibentuk dalam file `interface.js` dengan detail sebagai berikut:
```js
const express = require('express');

const app = express();

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
    res.type('text/plain');
    res.send('Aku NETICS 123 Terima Kasih Atas Partisipasinya');
});


const PORT = process.env.PORT || 727;
app.listen(PORT, () => {

});
```
Pertama kita specify bahwa `express` memerlukan module `express` dari `node.js`. Setelah itu, kita deklarasikan `app` sebagai instance dari `express`. Setelah itu, kita deklarasi untuk GET request `/health` untuk mengeluarkan file `out.json`. File tersebut memiliki beberapa attribute seperti `nama`, `NRP`, `timestamp`, `uptime`, dan juga `status`. 

Sebelum mendeklarasikan `output.json` kita terlebih dahulu mendeklarasikan `time` dan juga `uptime` yang akan dipakai oleh `output.json`. 

Karena `timestamp` memerlukan timestamp berupa berapa detik yang telah berlalu sejak epoch, yaitu setelah 1 Januari 1970, kita dapat menggunakan inbuilt function `Date.now()` untuk mendapatkan timestamp yang diperlukan. Untuk `uptime` sendiri, kita dapat menggunakan `process.uptime` yang akan melacak seberapa lama process (dalam hal ini, server API) telah berjalan.

Selanjutnya, ketika host diakses tanpa memanggil API `/health`, kita akan return sebuah plaintext. Disini plaintext yang akan muncul adalah `Aku NETICS 123 Terima Kasih Atas Partisipasinya`.

Setelah semua deklarasi tersebut, PORT akan dibuka agar API dapat diakses melalui host. Untuk API ini, saya menggunakan port 727.

## Setup Dockerfile untuk Container
Untuk membuat Container, kita perlu untuk membuat sebuah `dockerfile` terlebih dahulu. Dockerfile ini akan menginstruksikan bagaimana Docker dapat wrap sebuah aplikasi (dalam hal ini, API kita). Disini saya menggunakan Docker Multi-Stage yang artinya Builder dan juga Runner image dipisah.
```dockerfile
#BUILDER
FROM node:23-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json interface.js ./
RUN npm ci --only=production

#RUNNER
FROM node:23-alpine AS runner

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/interface.js ./interface.js

EXPOSE 727

CMD ["node", "interface.js"]
```
Dalam proyek ini, saya menggunakan node:alpine-23 sebagai builder dan runner karena lightweight dan support untuk proyek `node.js`. 

Pada tahap builder, kita deklarasikan `WORKDIR` kita ke folder `app`. Lalu kita copy `package.json`, `package-lock.json` dan juga `interface.js` ke `WORKDIR`. Ketiga file tersebut penting agar ketika image dijalkan nanti, mereka bisa tau package apa saja yang diperlukan untuk menjalankan API yang telah kita buat dan `interface.js` yaitu API kita sendiri. Kemudian kita akan run `npm ci --only=production` yang akan install dependencies (jika mesin perlu) dan juga akan menggunakan yang perlu pada tahap production saja (package tahap dev akan diskip). 

Pada tahap runner, kita akan tranfer `node modules` dan juga `interface.js` yang telah terinstall agar bisa dijalankan oleh runner.  Setelah itu kita akan membuka PORT 727 untuk digunakan oleh API. Setelah itu kita akan jalankan comman `node interface.js` yang akan menjalankan API tersebut.

## Build Container Image
Ketika Dockerfile sudah siap, kita dapat menjalankan command `docker build` untuk membuat image dari aplikasi kita. Untuk ini, saya menggunakan command `docker build -t lab1 .` yang akan membuat image docker baru dengan nama `lab1`.

![{2E8D51C0-D1F0-4AC9-86C6-2ADE14794F85}](https://github.com/user-attachments/assets/309d7183-823f-4eb8-ae0d-4e90244c7577)

Untuk cek apakah image telah berhasil dibuat, kita dapat menggunakan command `docker images`

![{7A4B5EE5-CA5F-47A0-8192-0CE2628325B4}](https://github.com/user-attachments/assets/0f72b1f1-c944-4cc3-8197-c33ebce1377c)

Setelah docker image selesai dibuat, tahap selanjutnya adalah untuk melakukan push ke repository docker hub. Hal ini dilakukan agar nanti VPS tinggal pull image terbaru saja dari docker hub ketika sebuah aksi push di github dilakukan.

Untuk upload ke docker hub, kita harus mengganti tag image yang telah dibuat sesuai ke repository docker hub yang telah dibuat. Disini saya menamakan docker hub repository saya dengan `mraflya1204/lab1`. 

![{D22E57B4-1241-4F04-AE94-F5B36AED7DC7}](https://github.com/user-attachments/assets/2e10de46-0f20-44db-8d41-a05011afe8df)

Kita akan rename image `lab1` yang telah dibuat dengan menggunakan command `docker tag lab1 mraflya1204/lab1:latest`. Sekarang image tersebut akan direname menjadi `mraflya1204/lab1`

![{FB8FD3F4-6138-43DA-A362-C000CCF424FC}](https://github.com/user-attachments/assets/d97ed68d-f0ff-480b-bc74-598e735a92ed)

Setelah direname, kita akan melakukan push dengan command `docker push` dengan menyertakan tag yang telah kita buat sebelumnya. `docker push mraflya1204/lab1:latest`

![{1CBE1F55-9075-4381-8088-E2118434C292}](https://github.com/user-attachments/assets/f0ffafdf-7d29-4512-9ed5-1ed4d3e6bc84)

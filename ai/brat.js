const { createCanvas } = require("@napi-rs/canvas");

module.exports = (app) => {
    app.get("/brat", async (req, res) => {
        try {
            const { text = "Halo cantik 🤓" } = req.query;

            // Ukuran canvas sekarang 500x500
            const canvas = createCanvas(500, 500);
            const ctx = canvas.getContext("2d");

            // Background putih
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Teks hitam dengan ukuran font yang lebih kecil
            ctx.fillStyle = "#000000";
            ctx.font = "bold 30px Arial"; // Ukuran font disesuaikan
            ctx.textAlign = "center"; // Teks rata tengah
            ctx.textBaseline = "middle"; // Teks di tengah secara vertikal

            // Log untuk mengecek teks
            console.log("Text to render:", text);

            // Teks di tengah canvas
            ctx.fillText(text, canvas.width / 2, canvas.height / 2);

            // Convert ke gambar
            res.setHeader("Content-Type", "image/png");
            res.end(canvas.toBuffer("image/png"));
        } catch (error) {
            console.error("Error:", error);
            res.status(500).json({ error: "Terjadi kesalahan saat membuat gambar." });
        }
    });
};

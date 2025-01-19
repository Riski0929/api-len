const { createCanvas } = require("@napi-rs/canvas");

module.exports = (app) => {
    app.get("/brat", async (req, res) => {
        try {
            const { text = "Halo cantik 🤓" } = req.query;

            // Buat canvas ukuran 600x300
            const canvas = createCanvas(600, 300);
            const ctx = canvas.getContext("2d");

            // Background putih
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Teks hitam besar
            ctx.fillStyle = "#000000";
            ctx.font = "50px Arial";
            ctx.fillText(text, 50, 150);

            // Convert ke gambar
            res.setHeader("Content-Type", "image/png");
            res.end(canvas.toBuffer("image/png"));
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Terjadi kesalahan saat membuat gambar." });
        }
    });
};

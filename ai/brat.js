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

            // Teks hitam besar kaya di gambar
            ctx.fillStyle = "#000000";
            ctx.font = "bold 100px Arial"; // Ukuran tetap gede
            ctx.fillText(text, 50, 250);  // Penyesuaian posisi teks

            // Convert ke gambar
            res.setHeader("Content-Type", "image/png");
            res.end(canvas.toBuffer("image/png"));
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Terjadi kesalahan saat membuat gambar." });
        }
    });
};

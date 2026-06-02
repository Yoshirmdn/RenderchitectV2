import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const sections = [
  {
    title: "1. Kebijakan Umum",
    content: `ArchVault menjual produk digital berupa file desain arsitektur 3D (SKP, GLB, GLTF, DWG, PDF, dan format lainnya). Karena sifat produk yang digital dan dapat diunduh, refund hanya dapat diproses dalam kondisi tertentu yang diuraikan di bawah ini.

Dengan melakukan pembelian di ArchVault, pembeli dianggap telah membaca, memahami, dan menyetujui kebijakan ini.`,
  },
  {
    title: "2. Kondisi yang Memenuhi Syarat Refund",
    content: `Refund dapat diajukan dalam kondisi berikut:

- File yang diterima tidak dapat dibuka atau rusak (corrupt), dan seller tidak dapat menyediakan pengganti dalam 48 jam.
- Produk yang diterima secara material berbeda dari deskripsi atau preview yang ditampilkan di halaman produk.
- Terjadi duplicate charge (pembayaran ganda) akibat error sistem.
- Pembelian tidak berhasil namun biaya sudah terpotong.

Pengajuan refund wajib disertai bukti (screenshot error, perbandingan file, atau bukti transaksi ganda).`,
  },
  {
    title: "3. Kondisi yang TIDAK Memenuhi Syarat Refund",
    content: `Refund tidak dapat diproses dalam kondisi berikut:

- Pembeli sudah mengunduh file dan kemudian berubah pikiran (change of mind).
- Pembeli tidak memiliki software yang diperlukan untuk membuka file (misalnya: tidak punya SketchUp untuk membuka file .skp).
- Ketidakcocokkan estetika atau preferensi subjektif setelah file diunduh.
- Klaim diajukan lebih dari 24 jam setelah tanggal pembelian.
- File sudah digunakan dalam proyek komersial.`,
  },
  {
    title: "4. Prosedur Pengajuan Refund",
    content: `Untuk mengajukan refund, ikuti langkah berikut:

1. Hubungi tim support melalui halaman Contact dalam 24 jam sejak tanggal pembelian.
2. Sertakan Order ID (format: AV-XXXXXXXX) yang dapat ditemukan di halaman Check Order.
3. Jelaskan alasan pengajuan refund secara detail beserta bukti pendukung.
4. Tim ArchVault akan merespons dalam 1×24 jam kerja.
5. Jika refund disetujui, dana dikembalikan ke metode pembayaran asal dalam 3–7 hari kerja.`,
  },
  {
    title: "5. Refund untuk Layanan VR (EXE & APK)",
    content: `Layanan pembuatan VR Application (.exe dan .apk) adalah layanan custom berbasis jasa. Ketentuan refund berbeda:

- Sebelum pengerjaan dimulai: refund penuh (100%).
- Setelah pengerjaan dimulai (progres 1–50%): refund 50%.
- Setelah pengerjaan >50% selesai: tidak ada refund, namun kami wajib menyelesaikan deliverable sesuai scope.
- Jika ada keterlambatan signifikan dari pihak ArchVault (>2× estimasi deadline): refund penuh.`,
  },
  {
    title: "6. Sewa & Pembelian Perangkat Oculus",
    content: `• Sewa Oculus: Deposit dikembalikan setelah perangkat dikembalikan dalam kondisi baik. Kerusakan karena kelalaian pengguna menjadi tanggung jawab penyewa.
- Beli Putus: Perangkat baru resmi dengan garansi distributor 1 tahun. Garansi tidak mencakup kerusakan fisik atau air damage.
- Pembatalan pesanan sewa/beli yang belum dikirim: refund penuh dalam 24 jam.`,
  },
  {
    title: "7. Penyelesaian Sengketa",
    content: `Jika ada perselisihan antara pembeli dan seller, ArchVault bertindak sebagai mediator netral. Keputusan final dari tim ArchVault bersifat mengikat sesuai Terms of Service yang berlaku.

Untuk sengketa yang tidak dapat diselesaikan secara internal, para pihak setuju untuk menyelesaikan melalui jalur hukum yang berlaku di Republik Indonesia.`,
  },
  {
    title: "8. Perubahan Kebijakan",
    content: `ArchVault berhak mengubah kebijakan refund ini sewaktu-waktu. Perubahan akan diumumkan melalui halaman ini dan email ke pengguna terdaftar. Pembelian yang dilakukan sebelum tanggal perubahan tetap mengikuti kebijakan yang berlaku saat transaksi.

Kebijakan ini terakhir diperbarui pada: 30 Mei 2025.`,
  },
];

export default function RefundPolicy() {
  return (
    <div className="min-h-screen pt-24 pb-16" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-3xl mx-auto px-6">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <p className="font-mono text-sm tracking-widest uppercase mb-3" style={{ color: "var(--accent)" }}>Legal</p>
          <h1 className="font-display text-5xl sm:text-6xl mb-4" style={{ color: "var(--text-primary)" }}>REFUND<br />POLICY</h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Berlaku per 30 Mei 2025 · Versi 1.2
          </p>
        </motion.div>

        {/* Quick summary box */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="rounded-2xl p-6 mb-10"
          style={{ background: "rgba(200,169,110,0.07)", border: "1px solid rgba(200,169,110,0.25)" }}>
          <div className="font-heading font-bold mb-3" style={{ color: "var(--accent)" }}>📋 Ringkasan Singkat</div>
          <ul className="space-y-1.5 text-sm" style={{ color: "var(--text-secondary)" }}>
            <li>✅ Refund <strong style={{ color: "var(--text-primary)" }}>diproses</strong> jika file rusak atau sangat berbeda dari deskripsi</li>
            <li>✅ Refund <strong style={{ color: "var(--text-primary)" }}>diproses</strong> jika terjadi double payment</li>
            <li>❌ Refund <strong style={{ color: "var(--text-primary)" }}>tidak diproses</strong> jika file sudah diunduh dan sesuai deskripsi</li>
            <li>⏱️ Pengajuan wajib dilakukan dalam <strong style={{ color: "var(--text-primary)" }}>24 jam</strong> setelah pembelian</li>
            <li>📦 Dana kembali dalam <strong style={{ color: "var(--text-primary)" }}>3–7 hari kerja</strong></li>
          </ul>
        </motion.div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((sec, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <h2 className="font-heading font-bold text-lg mb-3" style={{ color: "var(--text-primary)" }}>{sec.title}</h2>
              <div className="rounded-xl p-5" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: "var(--text-secondary)" }}>
                  {sec.content}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="mt-12 text-center rounded-2xl p-8"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
          <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
            Ada pertanyaan tentang kebijakan ini?
          </p>
          <Link to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all"
            style={{ background: "var(--accent)", color: "#0a0a0a" }}>
            Hubungi Support
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
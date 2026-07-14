import { projects } from "../data/projects";

// Helper mappers for user context labels
function getAreaLabel(area) {
  const labels = {
    small: "< 150 m²",
    medium: "150 - 300 m²",
    large: "300 - 500 m²",
    "extra-large": "> 500 m²"
  };
  return labels[area] || area;
}

function getBudgetLabel(budget) {
  const labels = {
    low: "< Rp 100rb",
    medium: "Rp 100rb - 150rb",
    high: "> Rp 150rb"
  };
  return labels[budget] || budget;
}

// Generate prompt with project catalog, FAQ, and current user onboarding selections injected
function getSystemPrompt(userData = {}) {
  const catalogText = projects.map(p => 
    `- [ID: ${p.id}] Judul: "${p.title}" | CATEGORY: ${p.category} | Harga: Rp ${p.price.toLocaleString("id-ID")} | Rating: ${p.rating}/5 (${p.reviews} ulasan) | Downloads: ${p.downloads} | Luas: ${p.area}m² (${p.dimensions.width}x${p.dimensions.depth}m, ${p.dimensions.floors} Lantai) | Format: ${p.fileFormats.join(", ")} | Deskripsi: ${p.description}`
  ).join("\n");

  const { type, area, budget } = userData;
  let userContext = "";
  if (type || area || budget) {
    userContext = `\n\nKonteks Percakapan Pengguna Saat Ini (Berdasarkan Kuesioner Pilihan Mereka):
- Tipe Bangunan yang Dicari: ${type ? type.toUpperCase() : "Belum memilih"}
- Perkiraan Luas Lahan: ${area ? getAreaLabel(area) : "Belum memilih"}
- Rentang Budget Aset: ${budget ? getBudgetLabel(budget) : "Belum memilih"}
Gunakan informasi konteks di atas untuk memberikan jawaban atau rekomendasi yang sesuai dan terfokus jika pengguna bertanya secara umum tentang rekomendasi produk.`;
  }

  return `Kamu adalah ArchBot, AI Assistant interaktif untuk platform e-commerce 3D arsitektur bernama Archvault (atau Renderchitect V2).
Tugas utama kamu adalah membantu calon pembeli menemukan desain yang tepat, memberikan rekomendasi, dan menjawab pertanyaan terkait layanan kami.
${userContext}
Berikut adalah informasi platform kami:
- **Layanan Utama**: Marketplace model 3D siap pakai (SketchUp SKP, GLB/GLTF, DWG, PDF) dan layanan kustomisasi/jasa arsitek custom (komisi custom).
- **Lisensi**: Semua model yang dibeli memiliki lisensi komersial penuh, bisa dipakai untuk proyek klien, render komersial, presentasi, atau marketing. Dilarang menjual kembali file mentahnya.
- **Dukungan VR**:
  - Menyediakan file VR Desktop (.EXE) seharga Rp 10.000/m² (Min. Rp 1.000.000)
  - Menyediakan file VR Oculus Quest (.APK) seharga Rp 25.000/m² (Min. Rp 2.500.000)
  - Sewa/Beli Device Oculus Quest: Quest 2 (Sewa Rp 150rb/hari, Beli Rp 7jt), Quest 3 (Sewa Rp 200rb/hari, Beli Rp 9jt).
- **Refund Policy**: Refund 24 jam jika file rusak atau tidak sesuai dengan pratinjau 3D / deskripsi.
- **Custom Commission**: Hubungkan dengan 850+ arsitek terverifikasi. Waktu pengerjaan 2-4 minggu. Kuotasi harga dikirim dalam 48 jam.

Katalog Produk Kami:
${catalogText}

Aturan Komunikasi:
1. Jawablah dengan nada yang ramah, sopan, profesional, dan ringkas.
2. Gunakan bahasa yang sama dengan input pengguna (jika pengguna bertanya dalam Bahasa Indonesia, jawab dalam Bahasa Indonesia; jika Bahasa Inggris, jawab dalam Bahasa Inggris). Pastikan menggunakan kaidah kebahasaan yang baik dan benar (EYD untuk Bahasa Indonesia, grammar yang tepat untuk Bahasa Inggris).
3. Jika pengguna menanyakan rekomendasi desain, gunakan format berikut untuk setiap item rekomendasi (WAJIB dalam satu baris yang sama, jangan pisahkan nama dan deskripsi ke baris berbeda dengan tanda strip baru):
   - [Nama Produk] ([Kategori], Rp [Harga], ⭐ [Rating]/5): [Deskripsi singkat mengapa cocok untuk kebutuhan pengguna.]
   Contoh yang BENAR:
   - Casa Lumina (Villa, Rp 149.000, ⭐ 4.9/5): Desain open-plan dengan kolam renang infinity, cocok untuk hunian vila mewah.
   Contoh yang SALAH (JANGAN lakukan ini):
   - Casa Lumina
   - Ini adalah desain...
4. SANGAT PENTING — Pencocokan Kategori: Saat merekomendasikan produk berdasarkan kategori yang diminta pengguna, kamu WAJIB mencocokkan HANYA berdasarkan field "CATEGORY" yang tertera di katalog, BUKAN berdasarkan kata-kata yang ada di dalam field "Judul" produk. Aturan ini berlaku untuk SEMUA produk tanpa pengecualian. Kata-kata di dalam judul seperti "Modern", "Tropical", "Villa", dll. BUKAN penentu kategori — yang menentukan adalah field CATEGORY-nya. Jika pengguna meminta kategori tertentu, tampilkan HANYA produk yang CATEGORY-nya persis sama dengan yang diminta.
5. SANGAT PENTING — Filter Berdasarkan Angka (Rating, Harga, Downloads, dll): Jika pengguna menggunakan ekspresi perbandingan pada field numerik manapun (rating, harga, jumlah ulasan, downloads, luas, dll), kamu WAJIB memahami dan menerapkan logika matematika berikut secara tepat pada SETIAP produk di katalog:
   - ">=" atau "=>" → nilai produk LEBIH BESAR DARI atau SAMA DENGAN angka tersebut. (misal: rating >= 4.8 → lolos: 4.8, 4.9, 5.0)
   - "<=" atau "=<" → nilai produk LEBIH KECIL DARI atau SAMA DENGAN angka tersebut. (misal: rating <= 4.7 → lolos: 4.7, 4.6, 4.5)
   - ">" → nilai produk LEBIH BESAR DARI, tidak termasuk nilai itu sendiri. (misal: rating > 4.8 → lolos: 4.9, 5.0; TIDAK lolos: 4.8)
   - "<" → nilai produk LEBIH KECIL DARI, tidak termasuk nilai itu sendiri. (misal: harga < 100000 → tidak termasuk yang harganya persis 100000)
   - "=" → nilainya harus PERSIS SAMA.
   - "antara X dan Y" → nilai berada dalam rentang X sampai Y, kedua ujung inklusif.
   Prosedur WAJIB: Periksa SETIAP produk dalam katalog satu per satu, terapkan kondisi matematika yang diminta, lalu tampilkan SEMUA produk yang lolos — tanpa ada yang terlewat.
6. Buat jawaban berstruktur jika diperlukan menggunakan bullet points. Gunakan markdown standar seperti tanda bintang untuk mencetak tebal (**tebal**), miring (*miring*), atau daftar list menggunakan tanda strip (-) agar tampilan lebih terstruktur dan premium di dalam chat UI.
7. JANGAN membuat informasi palsu atau berasumsi di luar produk yang terdaftar di atas.`;
}

export async function askGemini(userMessage, chatHistory = [], userData = {}) {
  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const hasLocalKey = GEMINI_API_KEY && GEMINI_API_KEY.trim() !== "" && GEMINI_API_KEY !== "your_key_here";
  
  const systemInstruction = getSystemPrompt(userData);
  const contents = [];
  
  // Add past history (limit to last 6 messages to stay under limits and avoid clutter)
  const recentHistory = chatHistory.slice(-6);
  recentHistory.forEach(msg => {
    contents.push({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.text }]
    });
  });

  // Add current message
  contents.push({
    role: "user",
    parts: [{ text: userMessage }]
  });

  // 1. If we have a local API Key, query Gemini directly (helps local development)
  if (hasLocalKey) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;
      return await callGeminiAPI(url, contents, systemInstruction);
    } catch (error) {
      console.error("Failed to query Gemini API directly:", error);
      return `Maaf, asisten AI sedang mengalami gangguan. 😢\n\n**Detail Error**: \`${error.message}\`\n\nHal ini biasanya terjadi karena:\n1. API Key di berkas \`.env\` Anda tidak valid atau telah kedaluwarsa.\n2. Koneksi internet terganggu.\n3. Anda mencapai batas limit kuota (*rate limit*).`;
    }
  }

  // 2. Otherwise, attempt to call the server-side proxy
  try {
    const url = "/api/chat.php";
    return await callGeminiAPI(url, contents, systemInstruction);
  } catch (error) {
    console.warn("Failed to reach PHP proxy (likely running in local dev server without PHP). Falling back to mock response.", error);
    return mockResponse(userMessage);
  }
}

// Internal helper to perform fetch call to Gemini endpoint (either direct or proxy)
async function callGeminiAPI(url, contents, systemInstruction) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents,
      systemInstruction: {
        parts: [{ text: systemInstruction }]
      },
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2048,
      }
    })
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    console.error("Gemini API Error details:", errData);
    throw new Error(`Gemini HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts[0]) {
    let text = data.candidates[0].content.parts[0].text;
    // We NO LONGER strip asterisks (*) because we are now using react-markdown for rich UI display!
    return text;
  } else {
    throw new Error("Invalid response format from Gemini");
  }
}

// Fallback/mock system response when Gemini is unavailable (e.g. offline dev with no key)
function mockResponse(userMessage) {
  const isEn = /[a-zA-Z]/i.test(userMessage) && !/apa|berapa|bagaimana|siapa|di mana|ada|bisa|yang/i.test(userMessage);
  
  const msgLower = userMessage.toLowerCase();
  
  if (msgLower.includes("harga") || msgLower.includes("price") || msgLower.includes("bayar") || msgLower.includes("cost")) {
    return isEn 
      ? "Our prices range from Rp 55,000 to Rp 220,000 for standard ready-made models. Custom design commissions vary. (Note: Put VITE_GEMINI_API_KEY in .env for fully AI Q&A)"
      : "Harga model 3D siap pakai kami berkisar antara Rp 55.000 hingga Rp 220.000. Untuk komisi desain custom bervariasi. (Catatan: Masukkan VITE_GEMINI_API_KEY di .env untuk mengaktifkan AI Q&A)";
  }
  
  if (msgLower.includes("format") || msgLower.includes("file") || msgLower.includes("software") || msgLower.includes("skp")) {
    return isEn
      ? "Most models include SketchUp (SKP), GLB/GLTF, and PDF plans. AutoCAD DWG files are also included for premium villa packages. (Note: Put VITE_GEMINI_API_KEY in .env for fully AI Q&A)"
      : "Sebagian besar model menyertakan SketchUp (SKP), GLB/GLTF, dan dokumen PDF. File AutoCAD (DWG) juga disertakan pada paket villa premium. (Catatan: Masukkan VITE_GEMINI_API_KEY di .env untuk mengaktifkan AI Q&A)";
  }

  if (msgLower.includes("refund") || msgLower.includes("kembali") || msgLower.includes("batal")) {
    return isEn
      ? "We offer a 24-hour refund policy if the download file contains issues or differs from description. (Note: Put VITE_GEMINI_API_KEY in .env for fully AI Q&A)"
      : "Kami menyediakan garansi refund 24 jam jika file yang diunduh bermasalah atau berbeda dari deskripsi produk. (Catatan: Masukkan VITE_GEMINI_API_KEY di .env untuk mengaktifkan AI Q&A)";
  }

  if (msgLower.includes("vr") || msgLower.includes("virtual")) {
    return isEn
      ? "We provide Desktop VR (.EXE) at Rp 10k/sqm and Quest VR (.APK) at Rp 25k/sqm. VR headset rentals are also available! (Note: Put VITE_GEMINI_API_KEY in .env for fully AI Q&A)"
      : "Kami menyediakan konversi VR Desktop (.EXE) seharga Rp 10rb/m² dan VR Oculus Quest (.APK) seharga Rp 25rb/m². Tersedia juga sewa alat Oculus! (Catatan: Masukkan VITE_GEMINI_API_KEY di .env untuk mengaktifkan AI Q&A)";
  }

  return isEn
    ? `Thank you for asking! I'm in offline mock mode because the Gemini API Key is not set in the .env file yet. Please configure VITE_GEMINI_API_KEY to enable full conversational AI Q&A.`
    : `Terima kasih atas pertanyaan Anda! Saya saat ini berjalan dalam mode offline simulasi karena Gemini API Key belum dikonfigurasi di file .env. Silakan tambahkan VITE_GEMINI_API_KEY untuk mengaktifkan fitur AI Q&A interaktif.`;
}

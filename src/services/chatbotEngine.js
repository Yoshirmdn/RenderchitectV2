import { projects } from "../data/projects";

// Simple language detector
export function detectLanguage(text) {
  const englishWords = [
    /\bhi\b/i, /\bhello\b/i, /\bhey\b/i, /\bhow\b/i, /\bwhat\b/i, /\bwhere\b/i, /\bprice\b/i,
    /\bbudget\b/i, /\bsize\b/i, /\barea\b/i, /\brefund\b/i, /\bdesign\b/i, /\bcommercial\b/i,
    /\bcan\b/i, /\bhelp\b/i, /\byou\b/i, /\bminimalist\b/i, /\bmodern\b/i, /\btropical\b/i,
    /\bindustrial\b/i, /\bvilla\b/i, /\binterior\b/i, /\bcommercial\b/i
  ];
  
  let score = 0;
  englishWords.forEach(regex => {
    if (regex.test(text)) score++;
  });
  
  return score > 0 ? "en" : "id";
}

// Translations and responses
export const RESPONSES = {
  id: {
    greeting: "Halo! Saya ArchBot 🏗️ Asisten AI Anda untuk menemukan desain arsitektur 3D yang sempurna di Archvault.\n\nMari mulai dengan kebutuhan Anda. Tipe bangunan apa yang sedang Anda cari?",
    askArea: "Bagus! Untuk kategori {type}, berapa kira-kira ukuran luas lahan (m²) yang Anda miliki?",
    askBudget: "Terakhir, berapa rentang budget Anda untuk aset desain ini?",
    recommendSuccess: "Berdasarkan kriteria Anda (Tipe: {type}, Lahan: {area}, Budget: {budget}), berikut 3D aset yang paling pas untuk Anda! 🎉",
    recommendEmpty: "Kami tidak menemukan kecocokan persis untuk kriteria Anda, tetapi berikut adalah beberapa desain terpopuler kami yang mungkin Anda sukai! ✨",
    followUp: "Ada yang ingin ditanyakan lagi tentang produk ini atau layanan kami? Anda bisa mengetik pertanyaan langsung di sini (misal tentang format file, refund, atau custom project).",
    resetBtn: "Mulai Ulang Percakapan 🔄",
    backToFlow: "Kembali ke pemilihan desain 🏗️",
    continueFlowPrompt: "Apakah Anda ingin melanjutkan pemilihan desain?",
  },
  en: {
    greeting: "Hi! I'm ArchBot 🏗️ Your AI assistant for finding the perfect 3D architectural design on Archvault.\n\nLet's start with your needs. What type of building are you looking for?",
    askArea: "Great! For the {type} category, what is your estimated land area (sqm)?",
    askBudget: "Lastly, what is your budget range for this design asset?",
    recommendSuccess: "Based on your criteria (Type: {type}, Area: {area}, Budget: {budget}), here are the best matching 3D assets for you! 🎉",
    recommendEmpty: "We couldn't find an exact match for your criteria, but here are some of our most popular designs you might like! ✨",
    followUp: "Do you have any other questions about these designs or our platform? Feel free to ask directly (e.g., about file formats, refunds, or custom commissions).",
    resetBtn: "Reset Chat 🔄",
    backToFlow: "Back to design helper 🏗️",
    continueFlowPrompt: "Would you like to continue finding a design?",
  }
};

export const QUICK_REPLIES = {
  id: {
    type: [
      { label: "Modern", value: "modern" },
      { label: "Minimalis", value: "minimalist" },
      { label: "Villa", value: "villa" },
      { label: "Tropical", value: "tropical" },
      { label: "Industrial", value: "industrial" },
      { label: "Interior", value: "interior" },
      { label: "Commercial", value: "commercial" }
    ],
    area: [
      { label: "< 150 m²", value: "small" },
      { label: "150 - 300 m²", value: "medium" },
      { label: "300 - 500 m²", value: "large" },
      { label: "> 500 m²", value: "extra-large" }
    ],
    budget: [
      { label: "< Rp 100rb", value: "low" },
      { label: "Rp 100rb - 150rb", value: "medium" },
      { label: "> Rp 150rb", value: "high" }
    ]
  },
  en: {
    type: [
      { label: "Modern", value: "modern" },
      { label: "Minimalist", value: "minimalist" },
      { label: "Villa", value: "villa" },
      { label: "Tropical", value: "tropical" },
      { label: "Industrial", value: "industrial" },
      { label: "Interior", value: "interior" },
      { label: "Commercial", value: "commercial" }
    ],
    area: [
      { label: "< 150 sqm", value: "small" },
      { label: "150 - 300 sqm", value: "medium" },
      { label: "300 - 500 sqm", value: "large" },
      { label: "> 500 sqm", value: "extra-large" }
    ],
    budget: [
      { label: "< Rp 100k", value: "low" },
      { label: "Rp 100k - 150k", value: "medium" },
      { label: "> Rp 150k", value: "high" }
    ]
  }
};

// Main state processing engine
export function processBotResponse({ state, input, lang, userData }) {
  let nextState = state;
  let responseText = "";
  let currentReplies = [];
  let recommendations = [];
  const newUserData = { ...userData };

  const translations = RESPONSES[lang];
  const replies = QUICK_REPLIES[lang];

  switch (state) {
    case "GREET":
      // Greeting message
      responseText = translations.greeting;
      currentReplies = replies.type;
      nextState = "ASK_AREA";
      break;

    case "ASK_AREA":
      // User has selected type of building
      newUserData.type = input;
      responseText = translations.askArea.replace("{type}", input);
      currentReplies = replies.area;
      nextState = "ASK_BUDGET";
      break;

    case "ASK_BUDGET":
      // User has selected area size
      newUserData.area = input;
      responseText = translations.askBudget;
      currentReplies = replies.budget;
      nextState = "RECOMMEND";
      break;

    case "RECOMMEND":
      // User has selected budget range
      newUserData.budget = input;
      
      // Match products
      recommendations = matchProducts(newUserData);
      
      if (recommendations.length > 0) {
        responseText = translations.recommendSuccess
          .replace("{type}", newUserData.type)
          .replace("{area}", getAreaLabel(newUserData.area, lang))
          .replace("{budget}", getBudgetLabel(newUserData.budget, lang));
      } else {
        responseText = translations.recommendEmpty;
        // Fallback to top-rated or bestseller products
        recommendations = projects.filter(p => p.bestseller || p.featured).slice(0, 3);
      }

      responseText += "\n\n" + translations.followUp;
      currentReplies = [];
      nextState = "FREE_CHAT";
      break;

    case "FREE_CHAT":
    default:
      // In free chat mode, we rely on Gemini API, so this code should not be hit
      // unless Gemini fails, in which case we show a fallback.
      nextState = "FREE_CHAT";
      break;
  }

  return {
    nextState,
    responseText,
    quickReplies: currentReplies,
    recommendations,
    userData: newUserData
  };
}

// Helpers for human readable labels
function getAreaLabel(areaValue, lang) {
  const areaReplies = QUICK_REPLIES[lang].area;
  const match = areaReplies.find(r => r.value === areaValue);
  return match ? match.label : areaValue;
}

function getBudgetLabel(budgetValue, lang) {
  const budgetReplies = QUICK_REPLIES[lang].budget;
  const match = budgetReplies.find(r => r.value === budgetValue);
  return match ? match.label : budgetValue;
}

// Matching logic based on projects data
function matchProducts(criteria) {
  const { type, area, budget } = criteria;
  
  return projects.filter(p => {
    // 1. Match category
    // In projects data, categories are lowercase e.g. "villa", "minimalist", "industrial", "tropical", "modern", "interior", "commercial".
    // We map type value to category ID.
    const typeValueLower = type ? type.toLowerCase() : "";
    const categoryMatch = p.category === typeValueLower;

    // 2. Match area
    let areaMatch = true;
    if (area) {
      if (area === "small") areaMatch = p.area < 150;
      else if (area === "medium") areaMatch = p.area >= 150 && p.area <= 300;
      else if (area === "large") areaMatch = p.area > 300 && p.area <= 500;
      else if (area === "extra-large") areaMatch = p.area > 500;
    }

    // 3. Match budget (price in Rupiah)
    let budgetMatch = true;
    if (budget) {
      if (budget === "low") budgetMatch = p.price < 100000;
      else if (budget === "medium") budgetMatch = p.price >= 100000 && p.price <= 150000;
      else if (budget === "high") budgetMatch = p.price > 150000;
    }

    return categoryMatch && areaMatch && budgetMatch;
  });
}

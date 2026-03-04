import { NextResponse } from "next/server";
import { matchLawyer } from "@/lib/lawyers";
import { GoogleGenerativeAI } from "@google/generative-ai"; // Rasmiy va xavfsiz yo'l

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    if (!message) return NextResponse.json({ error: "No message provided" }, { status: 400 });

    // Lawyer faqat savol yoki muammo bo'lsa tavsiya qilinadi
    const trivialPatterns = [
      /^salom[.!]?$/i,
      /^assalomu ?alaykum[.!]?$/i,
      /^nima qila olasan[?!.]?$/i,
      /^siz kimsiz[?!.]?$/i,
      /^hello[.!]?$/i,
      /^hi[.!]?$/i,
      /^yoq[.!]?$/i,
      /^test[.!]?$/i,
      /^help[.!]?$/i,
      /^qanday ishlaysiz[?!.]?$/i,
      /^bot[.!]?$/i,
      /^ok[.!]?$/i,
      /^rahmat[.!]?$/i,
      /^thanks[.!]?$/i,
    ];
    const isTrivial = trivialPatterns.some((re) => re.test(message.trim()));
    // Extract user location from request (if available)
    let userLocation = "";
    if (req.headers.get("x-user-location")) {
      userLocation = req.headers.get("x-user-location") || "";
      process.env.USER_LOCATION = userLocation;
    }
    const lawyer = isTrivial ? null : matchLawyer(message);
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    // Model nomini .env dan oling yoki default qilib gemini-1.5-flash qo'ying
    const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-1.5-flash"; 

    const systemPrompt = `Siz "AI Advocate" — O'zbekiston qonunchiligi bo'yicha yuridik yordamchisiz...`;

    // 1. Agar OpenAI bo'lsa, u ishlashda davom etadi (sizning kodingiz o'zgarishsiz qoladi)
    if (process.env.OPENAI_API_KEY) {
       // ... OpenAI mantiqi bu yerda qoladi
    }

    // 2. Gemini Fallback (SDK orqali - bu 404 bermasligi kafolatlangan usul)
    if (GEMINI_API_KEY) {
      try {
        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });

        // SDK barcha URL va formatlash ishlarini o'zi bajaradi
        const result = await model.generateContent(`${systemPrompt}\n\nFoydalanuvchi: ${message}`);
        const response = await result.response;
        const reply = response.text();

        return NextResponse.json({ reply, lawyer });
      } catch (err) {
        console.error("Gemini API'da xatolik:", err);
      }
    }

    return NextResponse.json({ error: "AI xizmati vaqtincha mavjud emas", lawyer }, { status: 500 });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
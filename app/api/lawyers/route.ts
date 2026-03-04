import { NextResponse } from "next/server";
import { fetchLawyersFromDB } from "@/lib/lawyers";

export async function GET() {
  try {
    const lawyers = await fetchLawyersFromDB();
    return NextResponse.json({ lawyers });
  } catch (error) {
    console.error("Error fetching lawyers:", error);
    return NextResponse.json({ error: "Failed to fetch lawyers" }, { status: 500 });
  }
}

import dbConnect from "@/lib/dbConnect" ;
import Set from "@/models/LearningSet" ;
import { WordType } from "@/types/types";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server" ;

export async function GET() {
  await dbConnect() ;

  try {
    const sets = await Set.find({}) ;

    return NextResponse.json({ sets }) ;
  } catch (err: any) {
    return NextResponse.json({ error: err.message }) ;
  }
}

export async function POST(req: NextRequest) {
  await dbConnect() ;

  try {
    const reqBody = await req.json() ;
    reqBody.words.forEach((word: WordType) => {
      word._id = nanoid() ;
    }) ;
    const set = new Set(reqBody) ;

    await set.save() ;

    const sets = await Set.find({}) ;

    return NextResponse.json({ sets }) ;
  } catch (err: any) {
    return NextResponse.json({ error: err.message }) ;
  }
}
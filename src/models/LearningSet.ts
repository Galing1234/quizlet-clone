import mongoose, { Schema } from "mongoose" ;
import { LearningSetType, WordType } from "@/types/types" ;

const setSchema: Schema = new mongoose.Schema({
  title: String,
  description: String,
  words: Array<WordType>
}) ;
const Set = mongoose.models.Set || mongoose.model<LearningSetType>("Set", setSchema) ;

export default Set ;
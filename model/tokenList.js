import { Schema, models, model } from "mongoose";

const tokenListSchema = new Schema({
  id: String,
  symbol: String,
  name: String,
  platforms: String,
});

const TokenList = models.tokenList || model("tokenList", tokenListSchema);

export default TokenList;

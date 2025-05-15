import { ChromaClient } from "chromadb";
import dotenv from "dotenv";
import { OpenAIEmbeddingFunction } from 'chromadb';

dotenv.config();
const token = process.env.OPENAI;

const client = new ChromaClient();

const embedder = new OpenAIEmbeddingFunction({
	openai_api_key: token,
	openai_model: "text-embedding-3-small"
})

let collection;
try {
  collection = await client.createCollection({
		name: "test-my-vest",
		embeddingFunction: embedder,	
	});
} catch (error) {
  if (error.name === "ChromaUniqueError") {
    collection = await client.getCollection({
			name: "test-my-vest",
			embeddingFunction: embedder
		});
  } else {
    throw error;
  }
}

console.log(`...${collection.name.split("-").join(" ")}!`);
console.log(`Today, we have...`);
console.log(await collection.count());

await collection.add({
	documents: [
		"I have a string vest",
		"I have a linen vest",
		"I have a cotton vest",
		"I have a rubber vest",
	],
	ids: ["vestString", "vestLinen", "vestCotton", "vestRubber"],
});

console.log(await collection.count());
console.log(`...lovely vests`);

console.log(`Today's query is...`);
const queries = {
	bdsm: "I'm well into BDSM"
}
console.log(`"${queries.bdsm}"`);

const results = await collection.query({
    queryTexts: queries.bdsm,
    nResults: 4
});

console.log(results);

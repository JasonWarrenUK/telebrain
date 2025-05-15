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

console.log(`Welcome to ${collection.name.split("-").join(" ")}!`);

await collection.add({
	documents: [
		"I have a string vest",
		"I have a linen vest",
		"I have a cotton vest",
		"I have a rubber vest",
		"I have a vest with sleeves (aka a shirt)",
		"I have a vest for your legs (aka shorts)"
	],
	ids: [
		"vestString",
		"vestLinen",
		"vestCotton",
		"vestRubber",
		"shirt",
		"shorts"
	],
});

console.log(`Today, we have ${await collection.count()} lovely vests`);

const queries = [
	"I'm well into BDSM",
	"I have sensitive skin",
	"I am entirely made of legs",
	"I am obsessed with string",
	"Most vests are too heavy",
	"I am repulsed by the sight of bare arms"
]

function randomQuery() {
	const max = queries.length;
	const random = Math.floor(Math.random() * max);
	return queries[random];
};

const query = randomQuery();

console.log(`"Today's query is... ${query}"`);

const results = await collection.query({
	queryTexts: query,
	nResults: 1
});

console.log(`Luckily for you... ${results.documents[0]}`);

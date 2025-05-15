console.log("importing rag.js");
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

console.log("Collection loaded");

await collection.add({
	documents: [
		"I have a rubber vest",
		"I have a sandpaper vest",
		"I have a vest with sleeves (aka a shirt)",
		"I have a vest for your legs (aka shorts)",
		"I have a knitted vest",
		"I have a bulletproof vest",
		"I have a digital-LED vest",
		"I have a ceramic vest",
		"I have a tailored suit vest",
		"I have a flowery vest",
		"I have a reflective vest",
		"I have a high-vis safety vest",
		"I have a thermal heated vest",
		"I have a cosmic galaxy vest",
		"I have a waterproof rain vest",
		"I have an inflatable life vest",
		"I have a chainmail steel vest",
		"I have a poetry-engraved vest",
		"I have a neon glowing vest",
		"I have a reversible two-tone vest",
		"I have a GPS-tracking smart vest",
		"I have a dehydrated instant-vest (just add water)",
		"I have a vest of emojis",
		"I have a vest that doubles as a hammock"
	],
	ids: [
		"vestRubber",
		"vestSandpaper",
		"shirt",
		"shorts",
		"vestKnitted",
		"vestBulletproof",
		"vestLED",
		"vestCeramic",
		"vestTailored",
		"vestFlowery",
		"vestReflective",
		"vestHighVis",
		"vestThermal",
		"vestCosmic",
		"vestWaterproof",
		"vestInflatable",
		"vestChainmail",
		"vestPoetry",
		"vestNeon",
		"vestReversible",
		"vestGPS",
		"vestInstant",
		"vestEmojis",
		"vestHammock"
	],
});

console.log(await collection.count(), "entries");

export const queryList = [
	"I'm well into BDSM",
	"I have sensitive skin",
	"I am entirely made of legs",
	"I am obsessed with string",
	"Most vests are too heavy",
	"I am repulsed by the sight of bare arms",
	"I enjoy spontaneous combustion",
	"I am afraid of small spaces",
	"I have a magnetic personality",
	"I can't stop belching glitter",
	"I am allergic to happiness",
	"I speak fluent cheese",
	"I dream only in shades of blue",
	"I punctuate sentences with haiku",
	"I am a walking disco ball",
	"I prefer walking on my hands",
	"I only eat triangular foods",
	"I communicate via interpretive dance",
	"I have an existential dread of socks",
	"I collect dust bunnies",
	"I hum melodies backwards",
	"I am attracted to loud noises",
	"I crave eternal sunshine",
	"I measure time in pizza slices",
	"I bathe in neon paint",
	"I recite Shakespeare to plants",
];

export function randomQuery() {
	const max = queryList.length;
	const random = Math.floor(Math.random() * max);
	return queryList[random];
};

const query = randomQuery();

export async function getVest(input) {
	const results = await collection.query({
		queryTexts: input,
		nResults: 1
	});

	return results.documents[0];
}

console.log("rag.js loaded");

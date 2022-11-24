import supertest from "supertest";
import server from "../src";
import { prisma } from "../src/database/db";

const api = supertest(server);

beforeAll(async () => {
	const newRestaurant = await prisma.restaurants.create({
		data: {
			name: "Famiglia Mancini",
			categoryId: 1,
			creatorId: 1,
		},
	});
	prisma.ratings.create({
		data: {
			userId: 1,
			restaurantId: newRestaurant.id,
			rating: 5,
		},
	});
});

afterAll(async () => {
	await prisma.ratings.deleteMany();
	await prisma.restaurants.deleteMany();
});

describe("GET /restaurants", () => {
	it("Should respond with status code 200", async () => {
		const result = await api.get("/restaurants");
		expect(result.status).toBe(200);
	});

	it("Should respond with valid object", async () => {
		const result = await api.get("/restaurants");
		expect(result.body).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					id: expect.any(Number),
					name: expect.any(String),
					category: expect.any(String),
					averageRating: expect.any(String),
					totalAvaliations: expect.any(Number),
				}),
			])
		);
	});

	it("Should respond with an empty array when have no restaurants", async () => {
		await prisma.ratings.deleteMany();
		await prisma.restaurants.deleteMany();
		const result = await api.get("/restaurants");
		expect(result.status).toBe(200);
		expect(result.body).toEqual([]);
	});
});

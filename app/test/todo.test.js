const request = require("supertest");
const app = require("../../app");

const TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGQyNWFkZTgzNTBmNTdhYjc5YjViMzAiLCJpYXQiOjE2OTE1NjMyMzAsImV4cCI6MTY5MTgyMjQzMH0.bYg89cqTf6Tx3WP77KgcqVRshO5B2GeYOF_v8jkPeUk";

describe("GET /api/todos", () => {
    describe("fetch list of todos", () => {
        test("should return list of todos", async () => {
            const response = await request(app)
                .get("/api/todos")
                .set("Authorization", `Bearer ${TOKEN}`);
            expect(response.statusCode).toBe(200);
        });
    });
});

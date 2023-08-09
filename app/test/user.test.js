const request = require("supertest");
const randomstring = require("randomstring");
const app = require("../../app");

const TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGQzNGQwY2ViMDAxZWNhNDI0YWVhZjMiLCJpYXQiOjE2OTE1NzA4MDcsImV4cCI6MTY5MTgzMDAwN30.OA7cUm0_ZZMobFTv3fTP1OEPX1g6Rzp8rBKPgqPXURE";

describe("POST /api/users", () => {
    describe("Create new user", () => {
        test("should return status code 200", async () => {
            const body = {
                firstname: randomstring.generate({
                    length: 9,
                    charset: "alphabetic",
                }),
                lastname: randomstring.generate({
                    length: 7,
                    charset: "alphabetic",
                }),
                email: `${randomstring.generate({
                    length: 10,
                    charset: "alphabetic",
                })}@gmail.com`,
                password: randomstring.generate({
                    length: 8,
                    charset: "alphabetic",
                }),
            };
            const response = await request(app)
                .post("/api/users")
                .set("Authorization", `Bearer ${TOKEN}`)
                .send(body);
            expect(response.statusCode).toBe(200);
        });
        test("should return status code 400 when email already exist", async () => {
            const body = {
                firstname: "Jane",
                lastname: "Doe",
                email: "janedoe@gmail.com",
                password: "janejane",
            };
            const response = await request(app)
                .post("/api/users")
                .set("Authorization", `Bearer ${TOKEN}`)
                .send(body);
            expect(response.statusCode).toBe(400);
            expect(response.body).toHaveProperty("message");
            expect(response.body).toHaveProperty("data");
            expect(response.body.message).toBe("Email already exist");
            expect(response.body.data).toBe(null);
        });
    });
});
describe("POST /api/users/login", () => {
    describe("Login user", () => {
        test("should return status code 200", async () => {
            const body = {
                email: "janedoe@gmail.com",
                password: "janejane",
            };
            const response = await request(app)
                .post("/api/users/login")
                .set("Authorization", `Bearer ${TOKEN}`)
                .send(body);
            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty("access_token");
            expect(response.body.access_token).not.toBe(null);
        });
        test("should return status code 400 when email or password is incorrect", async () => {
            const body = {
                email: "janedoe@gmail.com",
                password: "janejanes",
            };
            const response = await request(app)
                .post("/api/users/login")
                .set("Authorization", `Bearer ${TOKEN}`)
                .send(body);
            expect(response.statusCode).toBe(400);
            expect(response.body).toHaveProperty("access_token");
            expect(response.body).toHaveProperty("message");
            expect(response.body.access_token).toBe(null);
            expect(response.body.message).toBe("Invalid email or password");
        });
    });
});

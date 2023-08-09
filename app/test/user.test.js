const request = require("supertest");
const randomstring = require("randomstring");
const app = require("../../app");

const TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGQyN2E2ZDFhMDk2ZTEwNGU5NTYxMjgiLCJpYXQiOjE2OTE1NzUyMjJ9.kbdFANkTw26RHLpanBKeRdjLBnUVYU74mvSB50DBNYE";

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

describe("PUT /api/users/:id", () => {
    describe("Update user", () => {
        test("should return status code 200", async () => {
            const body = {
                password: "janejane",
            };

            const response = await request(app)
                .put("/api/users/64d27a6d1a096e104e956128")
                .set("Authorization", `Bearer ${TOKEN}`)
                .send(body);

            expect(response.statusCode).toBe(200);
        });
    });
});

describe("DELETE /api/users/:id", () => {
    describe("Delete user", () => {
        test("should return status code 200", async () => {
            const users = await request(app)
                .get("/api/users")
                .set("Authorization", `Bearer ${TOKEN}`);
            const userList = users.body;
            const toBeDeleted = userList[userList.length - 1]._id;
            console.log(toBeDeleted);
            const response = await request(app)
                .delete(`/api/users/${toBeDeleted}`)
                .set("Authorization", `Bearer ${TOKEN}`);

            expect(response.statusCode).toBe(200);
        });
    });
});

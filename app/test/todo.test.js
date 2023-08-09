const request = require("supertest");
const app = require("../../app");

const TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGQyN2E2ZDFhMDk2ZTEwNGU5NTYxMjgiLCJpYXQiOjE2OTE1NzUyMjJ9.kbdFANkTw26RHLpanBKeRdjLBnUVYU74mvSB50DBNYE";

describe("POST /api/todos", () => {
    describe("Create todos", () => {
        test("should return status code 200", async () => {
            const body = {
                owner: "64d27a6d1a096e104e956128",
                title: "This is a title of a todo",
                description: "This is the description of todo",
                deadline: "2023-08-12T15:32:03.824+00:00",
            };
            const response = await request(app)
                .post("/api/todos")
                .set("Authorization", `Bearer ${TOKEN}`)
                .send(body);
            expect(response.statusCode).toBe(200);
        });
    });
});

describe("PUT /api/todos", () => {
    describe("Update todos", () => {
        test("should return status code 200", async () => {
            const body = {
                title: "This is a title of a updated todo",
                description: "This is the description of updated todo",
            };

            const response = await request(app)
                .put("/api/todos/64d33f4bf92f2f660544b366")
                .set("Authorization", `Bearer ${TOKEN}`)
                .send(body);
            expect(response.statusCode).toBe(200);
        });
    });
});

describe("DELETE /api/todos/:id", () => {
    describe("Delete todos", () => {
        test("should return status code 200", async () => {
            const todos = await request(app)
                .get("/api/todos")
                .set("Authorization", `Bearer ${TOKEN}`);
            const todoList = todos.body.list;
            const toBeDeleted = todoList[todoList.length - 1]._id;

            const response = await request(app)
                .delete(`/api/todos/${toBeDeleted}`)
                .set("Authorization", `Bearer ${TOKEN}`);
            expect(response.statusCode).toBe(200);
        });
    });
});

describe("GET /api/todos", () => {
    describe("fetch list of all todos", () => {
        test("should return status code 200", async () => {
            const response = await request(app)
                .get("/api/todos?pageNumber=1&pageLength=10")
                .set("Authorization", `Bearer ${TOKEN}`);
            expect(response.statusCode).toBe(200);
        });
        test("should validate properties to be defined", async () => {
            const response = await request(app)
                .get("/api/todos?pageNumber=1&pageLength=10")
                .set("Authorization", `Bearer ${TOKEN}`);
            expect(response.body.list).toBeDefined();
            expect(response.body.numberOfPages).toBeDefined();
            expect(response.body.currentPage).toBeDefined();
        });
        test("should return list of todos", async () => {
            const response = await request(app)
                .get("/api/todos?pageNumber=1&pageLength=10")
                .set("Authorization", `Bearer ${TOKEN}`);
            const list = response.body.list;
            expect(list).toBeDefined();
            expect(list.length).toBeGreaterThan(0);
        });
        test("should return list of todos with status pending", async () => {
            const response = await request(app)
                .get("/api/todos?pageNumber=1&pageLength=10&status=pending")
                .set("Authorization", `Bearer ${TOKEN}`);
            const list = response.body.list;
            expect(list).toBeDefined();
            expect(list[list.length - 1].status).toBe("pending");
        });
        test("should return list of todos with status done", async () => {
            const response = await request(app)
                .get("/api/todos?pageNumber=1&pageLength=10&status=done")
                .set("Authorization", `Bearer ${TOKEN}`);
            const list = response.body.list;
            expect(list).toBeDefined();
            expect(list[list.length - 1].status).toBe("done");
        });
    });
});

describe("GET /api/todos/owner/:id", () => {
    describe("fetch list of all todos created by owner", () => {
        test("should return status code 200", async () => {
            const response = await request(app)
                .get(
                    "/api/todos/owner/64d27a6d1a096e104e956128?pageNumber=1&pageLength=10"
                )
                .set("Authorization", `Bearer ${TOKEN}`);
            expect(response.statusCode).toBe(200);
        });
        test("should validate properties to be defined", async () => {
            const response = await request(app)
                .get(
                    "/api/todos/owner/64d27a6d1a096e104e956128?pageNumber=1&pageLength=10"
                )
                .set("Authorization", `Bearer ${TOKEN}`);
            expect(response.body.list).toBeDefined();
            expect(response.body.numberOfPages).toBeDefined();
            expect(response.body.currentPage).toBeDefined();
        });
        test("should return list of todos", async () => {
            const response = await request(app)
                .get(
                    "/api/todos/owner/64d27a6d1a096e104e956128?pageNumber=1&pageLength=10"
                )
                .set("Authorization", `Bearer ${TOKEN}`);
            const list = response.body.list;
            expect(list).toBeDefined();
            expect(list.length).toBeGreaterThan(0);
        });
        test("should return list of todos with status pending", async () => {
            const response = await request(app)
                .get(
                    "/api/todos/owner/64d27a6d1a096e104e956128?pageNumber=1&pageLength=10&status=pending"
                )
                .set("Authorization", `Bearer ${TOKEN}`);
            const list = response.body.list;
            expect(list).toBeDefined();
            expect(list[list.length - 1].status).toBe("pending");
        });
        test("should return list of todos with status done", async () => {
            const response = await request(app)
                .get(
                    "/api/todos/owner/64d27a6d1a096e104e956128?pageNumber=1&pageLength=10&status=done"
                )
                .set("Authorization", `Bearer ${TOKEN}`);
            const list = response.body.list;
            expect(list).toBeDefined();
            expect(list[list.length - 1].status).toBe("done");
        });
    });
});

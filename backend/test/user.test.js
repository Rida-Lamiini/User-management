const request = require("supertest");
const app = require("../index"); // Assuming this is where your Express app is defined
const db = require("../config/db");

jest.spyOn(console, "log").mockImplementation(() => {}); // Mock console.log to prevent log errors

describe("User API", () => {
  beforeAll(async () => {
    // Clear the users table before running tests
    await db.query("TRUNCATE TABLE users");

    // Insert a test user before tests
    await db.query("INSERT INTO users (name, email) VALUES (?, ?)", [
      "Test User",
      "test@example.com",
    ]);

    // Ensure server and DB are initialized before running tests
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Small delay to ensure DB is ready
  });

  describe("GET /api/users", () => {
    it("should get all users", async () => {
      const res = await request(app).get("/api/users");

      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body.length).toBeGreaterThan(0); // Ensure there is at least one user
    });
  });

  afterAll(async () => {
    // Close DB connection after tests (if necessary)
    await db.end();
  });
});

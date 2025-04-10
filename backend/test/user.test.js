const request = require("supertest");
const app = require("../index");
const db = require("../config/db");

const { expect } = require("chai");

describe("User API", () => {
  before((done) => {
    // Clear users table before tests
    db.query("TRUNCATE TABLE users", () => {
      done();
    });
  });

  describe("POST /api/users", () => {
    it("should create a new user", (done) => {
      const user = {
        name: "Test User",
        email: "test@example.com",
      };

      request(app)
        .post("/api/users")
        .send(user)
        .then((res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("id");
          expect(res.body.name).to.equal(user.name);
          expect(res.body.email).to.equal(user.email);
          done();
        })
        .catch((err) => done(err));
    });

    it("should return 400 if name or email is missing", (done) => {
      const user = {
        name: "Incomplete User",
      };

      request(app)
        .post("/api/users")
        .send(user)
        .then((res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property("error");
          done();
        })
        .catch((err) => done(err));
    });
  });

  describe("GET /api/users", () => {
    it("should get all users", (done) => {
      request(app)
        .get("/api/users")
        .then((res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an("array");
          expect(res.body.length).to.be.at.least(1);
          done();
        })
        .catch((err) => done(err));
    });
  });
});

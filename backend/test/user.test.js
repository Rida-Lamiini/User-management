const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server");
const db = require("../config/db");

chai.use(chaiHttp);
const expect = chai.expect;

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

      chai
        .request(app)
        .post("/api/users")
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("id");
          expect(res.body.name).to.equal(user.name);
          expect(res.body.email).to.equal(user.email);
          done();
        });
    });

    it("should return 400 if name or email is missing", (done) => {
      const user = {
        name: "Incomplete User",
      };

      chai
        .request(app)
        .post("/api/users")
        .send(user)
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property("error");
          done();
        });
    });
  });

  describe("GET /api/users", () => {
    it("should get all users", (done) => {
      chai
        .request(app)
        .get("/api/users")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("array");
          expect(res.body.length).to.be.at.least(1);
          done();
        });
    });
  });
});

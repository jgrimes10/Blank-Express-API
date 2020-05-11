// import dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const User = require('../models/user.model');

// configure Chai
chai.use(chaiHttp);
chai.should();

const users = require('./dummy/users');

describe('Students', () => {
  beforeEach(done => {
    User.deleteMany({}, err => {
    });

    User.insertMany(users, err => {
      done();
    });
  });

  describe('POST /', () => {
    it('should not POST a user without username field', done => {
      const user = {
        _id: 'b01fdd56c86ac7a3624d9a31'
      };

      chai
        .request(app)
        .post('/users')
        .send(user)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('username');
          res.body.errors.username.should.have.property('kind').eql('required');
          done();
        });
    });

    it('should POST a user', done => {
      let user = {
        _id: 'b3ff75ce27892b9fc3d516c5',
        username: 'JaneDoe'
      };

      chai
        .request(app)
        .post('/users')
        .send(user)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('_id').eql('b3ff75ce27892b9fc3d516c5');
          res.body.should.have.property('username').eql('JaneDoe');
          done();
        });
    });

    it('should not POST a duplicate username', done => {
      let user = {
        username: 'JohnDoe'
      };

      chai
        .request(app)
        .post('/users')
        .send(user)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.be.a('object');
          res.body.should.have.property('errmsg').contain('dup key');
          done();
        });
    });
  });

  describe('GET /', () => {
    // test to get all users
    it('should get all users', done => {
      chai
        .request(app)
        .get('/users')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(2);
          done();
        });
    });

    // test to get a single user
    it('should get a single user', done => {
      const id = '9b51f799ce14f9be20ee70b0';
      chai
        .request(app)
        .get(`/users/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });

    it('should return a 404 getting a single user using an unknown id', done => {
      const id = '6b94ed4bfb7b4110f64a565d';
      chai
        .request(app)
        .get(`/users/${id}`)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });
});

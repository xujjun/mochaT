const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const app = require('./getEnvInfo');
// const app = 'http://preview.airwallex.com:30001';

console.log("env is: " + app);
// POST /bank
const testPostBank = function(postBody, expectBody, expectStatus, done) {
    request(app)
    .post('/bank')
    .send(postBody)
    .end(function(err, res) {
      if (err) throw err;
      expect(res.status).to.equal(expectStatus);  
      expect(res.body).to.eql(expectBody); 
      done();
    });
};
module.exports = testPostBank;
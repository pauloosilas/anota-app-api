var request = require('supertest');
var api = require('../server.js');
var host = process.env.API_TEST_HOST || api;

request = request(host);

describe('Coleção de Notas [/notas]', function() {

  describe('POST', function() {
    it('deveria criar uma nota', function(done) {
      var data = {
        "nota": {
          "title": "Iniciano uma nova nota",
          "description": "Testando a nota",
          "type": "js",
          "body": "O json"
        }
      };

      request
        .post('/notas')
        .set('Accept', 'application/json')
        .send(data)
        .expect(201)
        .expect('Content-Type', /application\/json/)
        .end(function(err, res) {
          var nota;

          var body = res.body;
          console.log('body', body);

          // Nota existe
          expect(body).to.have.property('nota');
          nota = body.nota;

          // Propiedades
          expect(nota).to.have.property('title', '');
          expect(nota).to.have.property('description', 'Iniciano uma nova nota');
          expect(nota).to.have.property('type', 'js');
          expect(nota).to.have.property('body', 'O json');
          expect(nota).to.have.property('id');

          done(err);
        });
    });
  });

});
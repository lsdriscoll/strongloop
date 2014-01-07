'use strict';

var assert = require('assert');
var fs = require('fs');

var sandbox = require('./helpers/sandbox.js');
var spawnCliInSandbox = require('./helpers/runner.js').spawnCliInSandbox;

function assertMatch(actual, pattern, message) {
  if (!pattern.test(actual)) {
    assert.fail(actual, pattern, message, 'matches');
  }
}

function assertContains(actual, needle, message) {
  if (actual.indexOf(needle) === -1) {
    message = message || ('Expected "' + actual + '" to contain "' + needle + '"');
    assert.fail(actual, needle, message, 'contains');
  }
}

describe('version', function() {
  before(function() {
    sandbox.reset();
  });

  it('should print slc and node versions', function(done) {
    spawnCliInSandbox(['version'])
      .run(function (er, stdout, status) {
        if (er) return done(er);

        assert.equal(status, 0);
        assert.equal(stdout.length, 1);
        var line0 = stdout[0];
        assertMatch(line0, /^slc v[.0-9]* .node v.+$/);
        assertContains(line0, process.version);
        return done();
      });
  });
});
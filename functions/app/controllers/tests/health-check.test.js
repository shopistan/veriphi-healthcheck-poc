const chai = require('chai');
const { expect } = chai;
chai.use(require('chai-as-promised'));

const HealthCheckController = require('../health-check');

describe('Health Check', () => {
  it('should return a boolean', async () => {
    const result = await HealthCheckController.fetchSiteResponse();
    expect(typeof result).to.equal('boolean');
  });
});

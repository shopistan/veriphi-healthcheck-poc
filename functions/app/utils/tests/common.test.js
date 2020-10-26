const chai = require('chai');
const { expect } = chai;
chai.use(require('chai-as-promised'));

const CommonUtil = require('../common');

describe('Common utils', () => {
  it('should return a timestamp as an int', () => {
    const result = CommonUtil.timestamp();
    expect(typeof result).to.equal('number');
  });
});

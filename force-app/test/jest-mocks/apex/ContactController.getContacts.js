const { createApexTestWireAdapter } = require('@salesforce/wire-service-jest-util');
const adapter = createApexTestWireAdapter(jest.fn());
module.exports = adapter;
module.exports.default = adapter;

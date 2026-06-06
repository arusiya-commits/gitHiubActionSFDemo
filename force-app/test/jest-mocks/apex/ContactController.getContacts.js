import { createApexTestWireAdapter } from '@salesforce/wire-service-jest-util';

const adapter = createApexTestWireAdapter(jest.fn());
export default adapter;

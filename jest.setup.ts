import '@testing-library/jest-dom';

/**
 * TextEncoder is part of the Node.js global API only in Node v11+ or available in browser-like environments,
 * and Jest may not provide it by default. Fix this using a polyfill TextEncoder for Jest
 */
import { TextEncoder, TextDecoder } from 'util';

Object.assign(global, {
  TextEncoder,
  TextDecoder,
});

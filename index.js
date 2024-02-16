import { build } from './app.js';

const app = await build();
const addr = await app.listen({ port: 8080 });
console.log(`Server listening at ${addr}`)
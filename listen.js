import { server } from './server.js';

const PORT = 9090;

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});

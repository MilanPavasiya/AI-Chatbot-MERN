import { connect, disconnect } from 'mongoose';
async function connectToDatabase() {
    try {
        await connect(process.env.MONGODB_URL);
    }
    catch (error) {
        throw new Error('Connection error:: MongoDb');
    }
}
async function disconnectFromDatabase() {
    try {
        await disconnect();
    }
    catch (error) {
        console.log(error);
        throw new Error('Disconnect error:: MongoDB');
    }
}
export { connectToDatabase, disconnectFromDatabase };
//# sourceMappingURL=connections.js.map
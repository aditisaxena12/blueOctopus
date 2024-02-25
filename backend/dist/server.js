"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = 8080;
// Define the directory where your frontend build files are located
const staticDir = path_1.default.join(__dirname, '..', '..', 'frontend', 'build');
// Serve static files from the 'build' directory
app.use(express_1.default.static(staticDir));
// Serve index.html for all routes
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '..', '..', 'frontend', 'build', 'index.html'));
});
app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

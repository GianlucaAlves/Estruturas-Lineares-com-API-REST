"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queue = void 0;
const LinearStructure_1 = __importDefault(require("./LinearStructure"));
class Queue extends LinearStructure_1.default {
    constructor(name = "Fila") {
        super(name);
    }
    remove() {
        return this.items.shift();
    }
    peek() {
        return this.items[0];
    }
}
exports.Queue = Queue;
//# sourceMappingURL=Queue.js.map
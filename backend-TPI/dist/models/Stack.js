"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stack = void 0;
const LinearStructure_1 = __importDefault(require("./LinearStructure"));
class Stack extends LinearStructure_1.default {
    constructor(name = "Pilha") {
        super(name);
    }
    remove() {
        return this.items.pop();
    }
    peek() {
        return this.items[this.items.length - 1];
    }
}
exports.Stack = Stack;
//# sourceMappingURL=Stack.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListStructure = void 0;
const LinearStructure_1 = __importDefault(require("./LinearStructure"));
class ListStructure extends LinearStructure_1.default {
    constructor(name = "Lista") {
        super(name);
    }
    remove() {
        return this.items.pop();
    }
    peek() {
        return this.items[this.items.length - 1];
    }
    getAt(index) {
        return this.items[index];
    }
    removeAt(index) {
        if (index < 0 || index >= this.items.length)
            return undefined;
        const [removed] = this.items.splice(index, 1);
        return removed;
    }
}
exports.ListStructure = ListStructure;
//# sourceMappingURL=ListStructure.js.map
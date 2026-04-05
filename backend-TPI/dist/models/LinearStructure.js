"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LinearStructure {
    constructor(name) {
        this.items = [];
        this.name = name;
        this.id = String(LinearStructure.createdStructures + 1);
        LinearStructure.createdStructures++;
    }
    add(item) {
        this.items.push(item);
    }
    clear() {
        this.items = [];
    }
    getSize() {
        return this.items.length;
    }
    getItems() {
        return [...this.items];
    }
    getId() {
        return this.id;
    }
    static getCreatedStructures() {
        return LinearStructure.createdStructures;
    }
}
LinearStructure.createdStructures = 0;
exports.default = LinearStructure;
//# sourceMappingURL=LinearStructure.js.map
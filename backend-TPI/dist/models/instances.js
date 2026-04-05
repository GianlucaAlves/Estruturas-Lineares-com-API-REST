"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listStructure = exports.queueInstance = exports.stackInstance = void 0;
const ListStructure_1 = require("./ListStructure");
const Queue_1 = require("./Queue");
const Stack_1 = require("./Stack");
const stackInstance = new Stack_1.Stack();
exports.stackInstance = stackInstance;
const queueInstance = new Queue_1.Queue();
exports.queueInstance = queueInstance;
const listStructure = new ListStructure_1.ListStructure();
exports.listStructure = listStructure;
//# sourceMappingURL=instances.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const StackController_1 = require("../controllers/StackController");
const router = (0, express_1.Router)();
router.post("/api/pilha", StackController_1.addToStack);
router.delete("/api/pilha", StackController_1.removeFromStack);
router.get("/api/pilha/topo", StackController_1.getStackTop);
router.get("/api/pilha", StackController_1.getAllStack);
router.delete("/api/pilha/limpar", StackController_1.clearStack);
exports.default = router;
//# sourceMappingURL=stackRoutes.js.map
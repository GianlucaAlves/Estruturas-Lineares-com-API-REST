"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ListController_1 = require("../controllers/ListController");
const router = (0, express_1.Router)();
router.post('/api/lista', ListController_1.addToList);
router.delete('/api/lista', ListController_1.removeFromList);
router.get('/api/lista/ultimo', ListController_1.getListLast);
router.get('/api/lista', ListController_1.getAllList);
router.get('/api/lista/:index', ListController_1.getListAt);
router.delete('/api/lista/limpar', ListController_1.clearList);
router.delete('/api/lista/:index', ListController_1.removeListAt);
exports.default = router;
//# sourceMappingURL=listRoutes.js.map
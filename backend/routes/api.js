const express = require("express");
const router = express.Router();

const besoin = require("../besoin_service");
const don = require("../don_service");
const dispatch = require("../dispatch_service");

router.get("/besoins", besoin.getAllBesoins);
router.post("/besoins", besoin.addBesoin);

router.get("/dons", don.getDons);
router.post("/dons", don.addDon);

router.post("/dispatch", dispatch.dispatch);

module.exports = router;

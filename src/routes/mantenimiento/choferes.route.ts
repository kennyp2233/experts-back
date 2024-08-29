import express from "express";
import { getChoferes,createChofer,updateChofer,deleteChoferes } from "@services/mantenimiento/choferes.servicio";
import { Chofer } from "@typesApp/entities/mantenimiento/ChoferTypes";

const router = express.Router();

router.get("/choferes", async (req, res) => {
    try {
        res.send(await getChoferes());
    } catch (error: any) {
        res.status(400).json({ ok: false, msg: error.message });
    }
});

router.post("/choferes", async (req, res) => {
    try {
        await createChofer(req.body as Chofer);
        res.status(201).json({
            ok: true,
            msg: "Creando chofer",
        });
    } catch (error: any) {
        res.status(400).json({ ok: false, msg: error.message });
    }
});

router.put("/choferes", async (req, res) => {
    try {
        await updateChofer(req.body as Chofer);
        res.status(201).json({
            ok: true,
            msg: "Actualizando chofer",
        });
    } catch (error: any) {
        res.status(400).json({ ok: false, msg: error.message });
    }
});

router.delete("/choferes", async (req, res) => {
    try {
        await deleteChoferes(req.body);
        res.status(200).json({
            ok: true,
            msg: "Borrando choferes",
        });
    } catch (error: any) {
        res.status(400).json({ ok: false, msg: error.message });
    }
});

export default router;
import express from 'express';
import { createAcuerdoArancelario, deleteAcuerdoArancelario, getAcuerdoArancelario, getAcuerdosArancelarios, updateAcuerdoArancelario } from '@services/mantenimiento/acuerdos_arancelarios.servicio';
import { AcuerdoArancelarioCreationAttributes } from '@typesApp/entities/mantenimiento/AcuerdosArancelariosTypes';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/acuerdos_arancelarios', async (req, res) => {
    // es bearer + token
    const auth = req.headers.authorization;
    const token = auth?.split(' ')[1];
    const decoded = jwt.decode(token as string) as any;
    if (decoded.admin) {
        console.log('es admin');
        try {
            if (req.query.id) {
                res.send(await getAcuerdoArancelario(Number.parseInt(req.query.id as string)));
            } else {
                res.send(await getAcuerdosArancelarios());
            }
        }
        catch (error: any) {
            res.status(400).json({ ok: false, msg: error.message });
        }
    }
});

router.post('/acuerdos_arancelarios', async (req, res) => {
    try {
        await createAcuerdoArancelario(req.body as AcuerdoArancelarioCreationAttributes);
        res.status(201).json({
            ok: true,
            msg: 'Creando acuerdo arancelario',
        });
    }
    catch (error: any) {
        res.status(400).json({ ok: false, msg: error.message });
    }
});

router.put('/acuerdos_arancelarios', (_, res) => {
    res.send('Creando acuerdo arancelario');
});

router.delete('/acuerdos_arancelarios', (_, res) => {
    res.send('Creando acuerdo arancelario');
});

export default router;
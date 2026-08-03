import { Router } from "express";
import * as libroController from "../controllers/libro.controller";

const router = Router();

router.get("/", libroController.getAll);
router.get("/:id", libroController.getById);

export default router;


/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Dashboard analytics and summary
 */

/**
 * @swagger
 * /api/dashboard/summary:
 *   get:
 *     summary: Get dashboard summary
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Dashboard summary
 */
import { Router } from "express";
import { getSummary } from "../controllers/dashboard.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

const router = Router();

router.get(
  "/summary",
  authMiddleware,
  authorizeRoles("admin", "analyst"),
  getSummary
);

export default router;

const express = require("express");
const router = express.Router();

const { downloadEC } = require("../controllers/ecController");

/**
 * @swagger
 * /api/ec/download:
 *   post:
 *     summary: Download EC PDF
 *     description: Automates EC search and downloads the EC PDF from the Bhu Bharati portal.
 *     tags:
 *       - EC Automation
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - district
 *               - mandal
 *               - village
 *               - surveyNo
 *               - khataNo
 *             properties:
 *               district:
 *                 type: string
 *                 example: Bhadradri Kothagudem
 *               mandal:
 *                 type: string
 *                 example: Burgampadu
 *               village:
 *                 type: string
 *                 example: Mothepattinagar
 *               surveyNo:
 *                 type: string
 *                 example: 6/1
 *               khataNo:
 *                 type: string
 *                 example: "248"
 *     responses:
 *       200:
 *         description: EC PDF downloaded successfully.
 *       400:
 *         description: Invalid request.
 *       500:
 *         description: Internal server error.
 */
router.post("/download", downloadEC);

module.exports = router;
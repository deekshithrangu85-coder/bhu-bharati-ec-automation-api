const { automateEC } = require("../services/playwrightService");

exports.downloadEC = async (req, res) => {
    try {

        console.log("downloadEC called");

        const pdfPath = await automateEC(req.body);

        return res.download(pdfPath);

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
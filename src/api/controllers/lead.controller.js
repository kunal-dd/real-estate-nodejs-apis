const leadService = require('./../services/lead.service')

exports.getLeads = (req, res, next) => {
    try {
        leadService.getLeads(req.user.parent_id, req.user.id, (err, data) => {
            if (err) {
                return res.status(500).send({ success: false, error: err });
            } else {
                return res.json({ success: true, data });
            }
        });
    } catch (error) {
        return next(error);
    }
};

exports.getLeadById = (req, res, next) => {
    try {
        let lead_id = req.params.id;

        leadService.getLeadById(lead_id, req.user.parent_id, (err, data) => {
            if (err) {
                return res.status(500).send({ success: false, error: err });
            } else {
                return res.json({ success: true, data });
            }
        });

    } catch (error) {
        return next(error);
    }
};

exports.addLead = (req, res, next) => {
    try {

        leadService.addLead(req.body, req.user.parent_id, req.user.id, (err, data) => {
            if (err) {
                return res.status(500).send({ success: false, error: err });
            } else {
                return res.json({ success: true, data });
            }
        });

    } catch (error) {
        return next(error);
    }
};

exports.updateLead = (req, res, next) => {
    try {
        let lead_id = req.params.id;

        leadService.updateLead(lead_id, req.user.parent_id, req.body, (err, data) => {
            if (err) {
                return res.status(500).send({ success: false, error: err });
            } else {
                return res.json({ success: true, data });
            }
        });

    } catch (error) {
        return next(error);
    }
};

exports.deleteLead = (req, res, next) => {
    try {
        let lead_id = req.params.id;

        leadService.deleteLead(lead_id, req.user.parent_id, req.user.id, (err, data) => {
            if (err) {
                return res.status(500).send({ success: false, error: err });
            } else {
                return res.json({ success: true, data });
            }
        });
    } catch (error) {
        return next(error);
    }
};

exports.leadStageChange = (req, res, next) => {
    try {
        let lead_id = req.params.id;

        leadService.leadStageChange(lead_id, req.user.parent_id, req.user.id, req.body, (err, data) => {
            if (err) {
                return res.status(500).send({ success: false, error: err });
            } else {
                return res.json({ success: true, data });
            }
        });

    } catch (error) {
        return next(error);
    }
};

exports.getLeadByStage = (req, res, next) => {
    try {
        let lead_stage = req.params.stage;

        leadService.getLeadByStage(lead_stage, req.user.parent_id, req.user.id, req.body, (err, data) => {
            if (err) {
                return res.status(500).send({ success: false, error: err });
            } else {
                return res.json({ success: true, data });
            }
        });

    } catch (error) {
        return next(error);
    }
};
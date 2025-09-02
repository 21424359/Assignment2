const db = require("../models");
const Company = db.company; // match with index.js
const Op = db.Sequelize.Op;

// Create (POST) company
exports.create = (req, res) => {
    // Get all the required data
    const company = {
        company_name: req.body.company_name,
        company_address: req.body.company_address,
        contactId: parseInt(req.params.contactId)
    };

    // Now create the company
    Company.create(company)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred"
            });
        });        
};

// Read (GET) company
// Assuming that a person can only be part of 1 company
exports.findOne = (req, res) => {
    Company.findOne({
        where: {
            company_id: req.params.companyId,
            contactId: req.params.contactId
        }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred"
            });
        });
};

// Updated (PUT) company
exports.update = (req, res) => {
    const id = req.params.companyId;

    Company.update(req.body, {
        where: { company_id: id, contactId: req.params.contactId }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Company was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Company`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Company with id=" + id
            });
        });
};

// Delete (DELETE) company
exports.delete = (req, res) => {
    const id = req.params.company_id;

    Company.destroy({
        where: { company_id: id, contactId: req.params.contactId }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Company was destroyed successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Company`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Company with id=" + id
            });
        });
}

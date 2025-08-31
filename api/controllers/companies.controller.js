const db = require("../models");
const Companies = db.companies;
const Op = db.Sequelize.Op;

// Create (POST) company
exports.create = (req, res) => {
    // Get all the required data
    const company = {
        company_name: req.body.company_name,
        company_address: req.body.company_address,
        contactId: parseInt(req.params.contactId)
    };

    // TODO: check if the company name and address combination 
    // already exists. If so, don't create.

    // Now create the company
    Companies.create(company)
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
    Companies.findOne({
        where: {
            contactId: req.params.contactId,
            id: req.params.companyId
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

    Companies.update(req.body, {
        where: { id: id, contactId: req.params.contactId }
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
    const id = req.params.companyId;

    Companies.update(req.body, {
        where: { id: id, contactId: req.params.contactId }
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
}

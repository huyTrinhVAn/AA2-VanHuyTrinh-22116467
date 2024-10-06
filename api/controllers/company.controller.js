const { where } = require("sequelize");
const db = require("../models");

const companies = db.companies;

const Op = db.Sequelize.Op;

// Create company 

exports.create = (req, res) => {
    // validate request
    const company = {
        company_name: req.body.company_name,
        company_address: req.body.company_address,
        contact_id: parseInt(req.params.contactId)
    };
    //  Save compay in the database

    companies.create(company)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Company"
            });
        });
};
// GEt all companies for a contact

exports.findAll = (req, res) => {
    companies.findAll({
        where: {
            contact_id: parseInt(req.params.contactId)
        }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured"
            })
        })
}
// Get a specific company for a contact

exports.findOne = (req, res) => {
    companies.findOne({
        where: {
            contact_id: req.params.contactId,
            company_id: req.params.companyId
        }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred with" + req.params.company_id
            })
        })
}
// Update a specific company for a contact

exports.update = async (req, res) => {
    const company_id = req.params.companyId;
    const contact_id = req.params.contactId;

    try {
        // Update the company details in the database
        const [num] = await companies.update(req.body, {
            where: { company_id: company_id, contact_id: contact_id }
        });
        if (num === 1) {
            // Fetch the updated company to return it to the frontend
            const updatedCompany = await companies.findOne({
                where: { company_id: company_id, contact_id: contact_id }
            });

            if (updatedCompany) {
                return res.status(200).json(updatedCompany); // Send the updated company data
            } else {
                return res.status(404).json({ message: "Company not found after update" });
            }
        } else {
            return res.status(400).json({ message: `Cannot update Company with id=${company_id}. Company not found or request body is empty.` });
        }
    } catch (err) {
        return res.status(500).json({ message: "Error updating company with id=" + company_id });
    }
};


//  Delete a company for a contact


exports.delete = (req, res) => {
    const company_id = req.params.companyId;

    companies.destroy({
        where: { company_id: company_id, contact_id: req.params.contactId } // Ensuring deletion by both IDs
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Company was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Company with id=${company_id}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete company with id=" + company_id
            });
        });
};

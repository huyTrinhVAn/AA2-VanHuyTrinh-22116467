const db = require("../models");
const Phones = db.phones;
const Op = db.Sequelize.Op;

// Create phone
exports.create = (req, res) => {
    const phone = {
        phone_type: req.body.phone_type,
        phone_number: req.body.phone_number,
        contactId: parseInt(req.params.contactId)
    };

    Phones.create(phone)
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

// Get all phones
exports.findAll = (req, res) => {

    Phones.findAll({
        where: {
            contactId: parseInt(req.params.contactId)
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

// Get one phone by id
exports.findOne = (req, res) => {
    Phones.findOne({
        where: {
            contactId: req.params.contactId,
            id: req.params.phoneId
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

// Update one phone by id
exports.update = async (req, res) => {
    const phoneId = req.params.phoneId;
    const contactId = req.params.contactId;

    try {
        // Update the phone details in the database
        const [num] = await Phones.update(req.body, {
            where: { id: phoneId, contactId: contactId }
        });

        if (num === 1) {
            // Fetch the updated phone to return it to the frontend
            const updatedPhone = await Phones.findOne({
                where: { id: phoneId, contactId: contactId }
            });

            if (updatedPhone) {
                return res.status(200).json(updatedPhone); // Send the updated phone data
            } else {
                return res.status(404).json({ message: "Phone not found after update" });
            }
        } else {
            return res.status(400).json({ message: `Cannot update Phone with id=${phoneId}. Phone not found or request body is empty.` });
        }
    } catch (err) {
        return res.status(500).json({ message: "Error updating phone with id=" + phoneId });
    }
};

// Delete one phone by id
exports.delete = (req, res) => {
    const id = req.params.phoneId;

    Phones.destroy({
        where: { id: id, contactId: req.params.contactId }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Phone was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Phone`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Phone with id=" + id
            });
        });
};
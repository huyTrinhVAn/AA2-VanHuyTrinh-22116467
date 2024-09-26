module.exports = (app) => {
    const companies = require("../controllers/company.controller.js");
    const router = require("express").Router();

    // Create a company for a contact
    router.post("/contacts/:contactId/companies", companies.create);

    // Get all companies for a contact
    router.get("/contacts/:contactId/companies", companies.findAll);

    // Get a specific company for a contact
    router.get("/contacts/:contactId/companies/:companyId", companies.findOne);

    // Update a specific company for a contact
    router.put("/contacts/:contactId/companies/:companyId", companies.update);

    // Delete a company for a contact
    router.delete("/contacts/:contactId/companies/:companyId", companies.delete);

    // Register the routes under the /api prefix
    app.use('/api', router);
};

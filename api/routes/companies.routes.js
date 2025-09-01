module.exports = app => {
    const company = require("../controllers/companies.controller.js");
  
    var router = require("express").Router();
  
    router.post("/contacts/:contactId/company", company.create);
  
    router.get("/contacts/:contactId/company", company.findOne);
  
    router.put("/contacts/:contactId/company/:company_id", company.update);
  
    router.delete("/contacts/:contactId/company/:company_id", company.delete);
  
    app.use('/api', router);
};

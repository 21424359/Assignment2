// This is created under the thought that there is a 1:1 relationship between company and contact
module.exports = app => {
    const company = require("../controllers/companies.controller.js");
  
    var router = require("express").Router();
  
    router.post("/contacts/:contactId/company", company.create);
  
    router.get("/contacts/:contactId/company", company.findOne);
  
    router.put("/contacts/:contactId/company/", company.update);
  
    router.delete("/contacts/:contactId/company/", company.delete);
  
    app.use('/api', router);
};

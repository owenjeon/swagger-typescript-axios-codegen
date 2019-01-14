// generate api files using swagger spec file
var fs = require('fs');
var CodeGen = require('../lib/codegen').CodeGen;

var invoice = JSON.parse(fs.readFileSync("./axiosTest/invoice.json", 'UTF-8').replace(/«/g,"").replace(/»/g,"").replace(/string,Link/g,"StringLink"));
var kyc = JSON.parse(fs.readFileSync("./axiosTest/kyc.json", 'UTF-8').replace(/«/g,"").replace(/»/g,"").replace(/string,Link/g,"StringLink"));

var tsSourceCode = CodeGen.getCustomCode({
    moduleName: 'Test',
    className: 'Test',
    swagger: invoice,
    tslintFix: true,
    beautify: false,
    template: {
        class: fs.readFileSync('templates/axios/class.mustache', 'utf-8'),
        method: fs.readFileSync('templates/axios/method.mustache', 'utf-8'),
        type: fs.readFileSync('templates/axios/type.mustache', 'utf-8')
    }
});

var tsSourceCode2 = CodeGen.getCustomCode({
    moduleName: 'Test',
    className: 'Test',
    swagger: kyc,
    tslintFix: true,
    beautify: false,
    template: {
        class: fs.readFileSync('templates/axios/class.mustache', 'utf-8'),
        method: fs.readFileSync('templates/axios/method.mustache', 'utf-8'),
        type: fs.readFileSync('templates/axios/type.mustache', 'utf-8')
    }
});



fs.writeFile("./axiosTest/invoice.ts", tsSourceCode, function(err) {
    if (err) {
        return console.log(err);
    }
    console.log("The file was saved!");
});

fs.writeFile("./axiosTest/kyc.ts", tsSourceCode2, function(err) {
    if (err) {
        return console.log(err);
    }
    console.log("The file was saved!");
});

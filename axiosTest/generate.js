// generate api files using swagger spec file
var fs = require('fs');
var CodeGen = require('../lib/codegen').CodeGen;

var file = "./axiosTest/invoice.json"

var swagger = JSON.parse(fs.readFileSync(file, 'UTF-8'));
var tsSourceCode = CodeGen.getCustomCode({
    moduleName: 'Test',
    className: 'Test',
    swagger: swagger,
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

const context = require("./context.template");
const component = require("./component.template");

module.exports = {
    contextTemplate: async (name) => context.replace(/TEMP_NAME/g, name),
    componentTemplate: async (name) => component.replace(/TEMP_NAME/g, name),
};
"use strict";
Parse.Cloud.define("Hello", () => {
    // return `Hello! Cloud functions are cool!`;
});
Parse.Cloud.define("SayMyName", (request) => {
    return `Hello ${request.params.name}! Cloud functions are cool!`;
});
//# sourceMappingURL=cloud.js.map
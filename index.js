"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ImageModule_1 = require("./ImageModule");
const hello = "hello";
const addWorldToString = (input) => {
    return (input + " world!");
};
console.log(addWorldToString(hello));
(0, ImageModule_1.testBasicImageGen)();

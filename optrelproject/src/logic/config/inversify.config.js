"use strict";
var inversify_1 = require("inversify");
var identifiers_1 = require("../constants/identifiers");
var War_1 = require("../entities/War");
/**
 * This is the only place in which there is some coupling.
 * In the rest of your application your classes should be free of references to other classes.
 */
var container = new inversify_1.Container();
container.bind(identifiers_1.default.Warrior).to(War_1.Ninja);
container.bind(identifiers_1.default.Weapon).to(War_1.Katana);
container.bind(identifiers_1.default.ThrowableWeapon).to(War_1.Shuriken);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = container;

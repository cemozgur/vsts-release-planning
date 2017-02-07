import { Container } from "inversify";
import TYPES from "../constants/identifiers";
import { Ninja, Katana, Shuriken } from "../entities/War";
import Warrior from "../interfaces/Warrior";
import ThrowableWeapon from "../interfaces/ThrowableWeapon";
import Weapon from "../interfaces/Weapon";

/**
 * This is the only place in which there is some coupling.
 * In the rest of your application your classes should be free of references to other classes.
 */
var container = new Container();
container.bind<Warrior>(TYPES.Warrior).to(Ninja);
container.bind<Weapon>(TYPES.Weapon).to(Katana);
container.bind<ThrowableWeapon>(TYPES.ThrowableWeapon).to(Shuriken);

export default container;
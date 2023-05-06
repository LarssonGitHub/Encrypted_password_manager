import { v4 as uuidv4 } from "uuid";

console.log("You shouldn't see this in frontend");

const generateId = () => uuidv4();

const isString = <T>(value: T): boolean =>
  typeof value === "string" ? true : false;

export { isString, generateId };

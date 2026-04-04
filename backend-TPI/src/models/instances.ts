import {ListStructure,} from "./ListStructure";
import {Queue} from './Queue';
import {Stack} from './Stack';

const stackInstance = new Stack<any>();
const queueInstance = new Queue<any>();
const listStructure = new ListStructure<any>();

export {stackInstance, queueInstance, listStructure};
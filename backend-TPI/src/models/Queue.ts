import LinearStructure from './LinearStructure';

export class Queue<T> extends LinearStructure<T>{
    constructor(name:string = "Fila"){
        super(name);
    }

    remove(): T | undefined{
        return this.items.shift();
    }

    peek(): T | undefined {
        return this.items[0];
    }
}
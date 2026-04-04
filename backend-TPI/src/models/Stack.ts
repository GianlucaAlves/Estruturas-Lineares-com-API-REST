import LinearStructure from './LinearStructure'

export class Stack<T> extends LinearStructure<T> {
    constructor(name:string = "Pilha"){
        super(name);
    }

    remove(): T | undefined{
        return this.items.pop();
    }

    peek(): T | undefined {
        return this.items[this.items.length-1];
    }
}
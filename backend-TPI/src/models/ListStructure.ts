import LinearStructure from "./LinearStructure";

export class ListStructure<T> extends LinearStructure<T>{
    constructor(name:string = "Lista"){
        super(name);
    }

    remove(): T | undefined {
        return this.items.pop();
    }

    peek(): T | undefined {
        return this.items[this.items.length - 1];
    }

    getAt(index: number): T | undefined {
       return this.items[index];
    }

    removeAt(index: number): T | undefined {
        if(index < 0  || index >= this.items.length) return undefined;

        const [removed] = this.items.splice(index, 1);
        return removed;
    }
}
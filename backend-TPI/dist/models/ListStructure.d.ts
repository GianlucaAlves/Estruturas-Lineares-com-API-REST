import LinearStructure from "./LinearStructure";
export declare class ListStructure<T> extends LinearStructure<T> {
    constructor(name?: string);
    remove(): T | undefined;
    peek(): T | undefined;
    getAt(index: number): T | undefined;
    removeAt(index: number): T | undefined;
}
//# sourceMappingURL=ListStructure.d.ts.map
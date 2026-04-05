export interface ILinearStructure<T> {
    readonly name: string;
    add(item: T): void;
    remove(): T | undefined;
    peek(): T | undefined;
    clear(): void;
    getItems(): T[];
    getSize(): number;
    getId(): string;
}
//# sourceMappingURL=ILinearStructure.d.ts.map
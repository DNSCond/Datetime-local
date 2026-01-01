export type ConcreteClass = new (...args: any) => object;
export type HasStaticWithoutNew<C extends ConcreteClass> = {
    withoutNew(this: C, ...args: any[]): InstanceType<C> | unknown;
};
export type CallableConstructor<C extends ConcreteClass & HasStaticWithoutNew<C>> = C & ((...args: Parameters<C['withoutNew']>) => ReturnType<C['withoutNew']>);
export declare function CallableClass<C extends ConcreteClass & HasStaticWithoutNew<C>>(classObject: C): CallableConstructor<C>;
//# sourceMappingURL=proxy.d.ts.map
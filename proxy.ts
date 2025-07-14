// pryxo
export type ConcreteClass = new (...args: any) => object;

export type HasStaticWithoutNew<C extends ConcreteClass> = {
    withoutNew(this: C, ...args: any[]): InstanceType<C> | unknown;
};
export type CallableConstructor<C extends ConcreteClass & HasStaticWithoutNew<C>,
> = C & ((...args: Parameters<C['withoutNew']>) => ReturnType<C['withoutNew']>);

export function CallableClass<C extends ConcreteClass & HasStaticWithoutNew<C>, >(classObject: C): CallableConstructor<C> {
    if (new.target) throw new TypeError('Cannot instantiate CallableClass with new');
    return new Proxy(classObject, {
        apply(target: C, _thisContext: unknown, args: any[]) {
            return target.withoutNew?.apply(target, args);
        },
    }) as unknown as CallableConstructor<C>;
}

export function CallableClass(classObject) {
    if (new.target)
        throw new TypeError('Cannot instantiate CallableClass with new');
    return new Proxy(classObject, {
        apply(target, _thisContext, args) {
            // return target.withoutNew?.apply(target, args);
            const withoutNew = target.withoutNew;
            if (withoutNew === undefined)
                return undefined;
            return Reflect.apply(withoutNew, target, args);
        },
    });
}
//# sourceMappingURL=proxy.js.map
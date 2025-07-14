export function CallableClass(classObject) {
    if (new.target)
        throw new TypeError('Cannot instantiate CallableClass with new');
    return new Proxy(classObject, {
        apply(target, _thisContext, args) {
            return target.withoutNew?.apply(target, args);
        },
    });
}

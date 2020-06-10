const filterPrivateFields = <
    T extends Record<string, unknown>,
    R extends Record<string, unknown> = T
>(
    obj: T
): R => {
    return Object.fromEntries(
        Object.entries(obj).filter(
            ([fieldName]) => fieldName.startsWith('_') === false
        )
    ) as R;
};

export {filterPrivateFields};

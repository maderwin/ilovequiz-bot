class AppError<Details = Record<string, unknown>> extends Error {
    details: Details;

    /* eslint-disable @typescript-eslint/explicit-module-boundary-types */
    constructor(message: string);
    constructor(details: Details, message: string);
    /* eslint-enable */
    constructor(arg1: string | Details, arg2?: string) {
        let message: string;
        let details: Details;

        if (typeof arg1 === 'string') {
            message = arg1;
            details = {} as Details;
        } else if (typeof arg1 === 'object' && typeof arg2 === 'string') {
            message = arg2;
            details = arg1;
        } else {
            throw new Error(`Unable to create ${new.target.name}`);
        }

        super(message);

        // Явное выставление прототипа из-за особенностей
        // работы встроенного класса Error в TS/ES6
        Object.setPrototypeOf(this, AppError.prototype);

        this.name = new.target.name;
        this.details = details;
    }
}

export {AppError};

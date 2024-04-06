export const validateRequiredFields = (data: Record<string, unknown>, fields: string[]) => {
    const missingFields = fields.filter(field => data[field] === undefined);
    if(missingFields.length) {
        throw new Error(`Missing fields: ${missingFields.join(', ')}`);
    }
}

export const extractFields = <T extends Record<string, unknown>, K extends keyof T>(data: T, fields: K[]): Pick<T, K> => {
    return fields.reduce((acc, field) => {
        acc[field] = data[field];
        return acc;
    }, {} as Pick<T, K>);
}
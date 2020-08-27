export const fieldRequired = (value: string) => {
    if (value) {
        return undefined;
    }
    return "Field is required";
};
export const minLength = (minLength: number) => (value: string) => {
    if (value && value.length < minLength) {
        return 'Password length must be 8 symbols or more.'
    } else if (value && value.length >= minLength) {
        return undefined;
    } else {
        return 'Field is required.'
    }
}
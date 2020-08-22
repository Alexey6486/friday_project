export const fieldRequired = (value: string) => {
    if (value) {
        return undefined;
    }
    return "Field is required";
};
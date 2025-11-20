export function capitalize(value: string, separator?: string): string {
    const _capitalize = (value: string) => {
        return value.charAt(0).toUpperCase() + value.slice(1);
    }

    if (!value) return value;
    if (separator === undefined) return _capitalize(value);

    return value
        .split(separator)
        .map(word => {
            if (!word) return word;
            return _capitalize(word);
        })
        .join(separator);
}

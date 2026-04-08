// navbar.types.ts
export interface Page {
    name: string;
    path: string;
}

// Support for multiple category structures
export type CategoryValue = string | string[];
export type Category = {
    [key: string]: CategoryValue | { [key: string]: CategoryValue };
};
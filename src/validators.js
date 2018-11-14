export const required = value => (value ? undefined : 'Required');

export const nonEmpty = value =>
    value.trim() !== '' ? undefined : 'Cannot be empty';

export const isTrimmed = value =>
    value.trim() === value ? undefined : 'Cannot start or end with whitespace';

export const userLength = value => 
    (value.length >= 3 && value.length <= 30)
        ? undefined
        : `Use between 3 and 30 characters for your username`;

export const passLength = value => 
    (value.length >= 10 && value.length <= 72)
        ? undefined
        : `Use between 10 and 72 characters for your password`;

export const matches = field => (value, allValues) =>
    field in allValues && value.trim() === allValues[field].trim()
        ? undefined
        : 'Passwords do not match';

export const email = value =>
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value) ? undefined : "Please enter a valid email address";

export const username = value =>
    /^[a-zA-Z0-9_]+$/.test(value) ? undefined : "Sorry, only letters (a-z), numbers (0-9), and underscores ( _ ) are allowed";

export const loadAuthToken = () => {
    return localStorage.getItem('(╯°Д°)╯ ┻━┻');
};

export const saveAuthToken = authToken => {
    try {
        localStorage.setItem('(╯°Д°)╯ ┻━┻', authToken);
    } catch (e) {}
};

export const clearAuthToken = () => {
    try {
        localStorage.removeItem('(╯°Д°)╯ ┻━┻');
    } catch (e) {}
};

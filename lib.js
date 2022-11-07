function isExist ( variable ) {
    if (typeof variable === 'undefined' || variable === null) {
        // variable is undefined or null
        return false;
    }
    return true;
}
class DuplicatedRowException extends Error{
    constructor(message) {
        super(message);
    }
}
module.exports = DuplicatedRowException;

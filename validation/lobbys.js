const Validator = require('validator');
const validText = require('./valid-text');


module.exports = function validateLobbyInput(data) {
    let errors = {};

    data.name = validText(data.name) ? data.name : "";
    data.playerCount = validText(data.playerCount) ? data.playerCount : "";

    if(!Validator.isLength(data.name, {min: 1, max: 100})){
        errors.name = 'Lobby name must be between 1 and 100 characters'
    }

    if (Validator.isEmpty(data.name)) {
        errors.name = 'Lobby name is required';
    }

    return {
        errors,
        isValid: Object.keys(errors).legnth === 0
    };

};
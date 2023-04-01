/** @module data/error-messages */

/**
 * Contains the messages for the possible types of errors that IconeJz can throw.
 * @type {Map<String, String>}
*/
const errorMessages = new Map();

errorMessages.set(
  'iconDoesNotExist',
  'Sorry, the "#{{iconName}}" icon doesn\'t exist :\'(',
);

errorMessages.set(
  'badlyFormattedIcon',
  'The extra icon "#{{iconName}}" does not meet the requirements, the name must end with "--e".',
);

export default errorMessages;

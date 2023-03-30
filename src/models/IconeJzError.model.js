/**
 * @module models/IconeJzError
 * @requires module:data/error-messages
*/

import errorMessages from '../data/error-messages.data.js';

/**
 * It is the generic class of an error that IconeJz can throw.
 * @extends Error
*/
const IconeJzError = class extends Error {
  /**
   * Set the name of the error and the message it will have.
   * @param {Object} options
   * @param {String} options.iconName - the name of the icon that is trying to render.
   * @param {String} options.type - The "type" of error to throw.
  */
  constructor ({ iconName, type }) {
    super();
    this.name = this.constructor.name;
    this.message = errorMessages.get(type).replace('#{{iconName}}', iconName);
  }
};

export default IconeJzError;

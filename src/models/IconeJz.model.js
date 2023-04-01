/**
 * @author OWLjz18 <owl.jz18@gmail.com>
 * @gratitude GOD | My Family | Leandro | FR | Jaspe.
 * @license MIT
 * @see https://owljz18.github.io/IconeJzDoc
 *
 * @module models/IconeJz
 * @requires module:data/version
 * @requires module:data/icon-list
 * @requires module:models/IconeJzError
 */

import version from '../data/version.data.js';
import iconList from '../data/icon-list.data.js';
import IconeJzError from './IconeJzError.model.js';

/**
 * It is simply the base of the icons, here the methods are created and the necessary style are applicated for the correct operation of IconeJz.
 * @extends HTMLElement
 */
const IconeJz = class extends HTMLElement {
  /**
   * These are the attributes available for styling an icon.
   * @memberof IconeJz
   */
  static styleAttributes = ['bg', 'c', 's', 'bd', 'm', 'p', 'o', 't'];

  /**
   * Added a new icon to "iconList".
   * @param {String} name - It is the name that the icon will have.
   * @param {String} content - Is the content of the icon.
   * @example
   *
   * IconeJz.addIcon('ship',
   *  `<div part="jz flexjz">
   *     <div part="jz jz-ship-sg"></div>
   *   </div>`
   * );
   */
  static addIcon (name, content) {
    iconList.set(name, content);
  }

  /**
   * Returns an array of all available icons, not including "extras".
   * @returns {String[]}
   */
  static getIconNames () {
    const iconNames = [...iconList.keys()];
    const availableIcons = iconNames.filter((iconName) => !iconName.endsWith('--e'));

    return availableIcons;
  }

  /**
   * Observe the attributes that the icon could have.
   * @method
   * @returns {String[]}
   */
  static get observedAttributes () {
    return ['is', ...IconeJz.styleAttributes, 'version'];
  }

  /**
   * Import data and styles to create custom icons.
   * @fires iconejz-imported-extra-icons
   * @throws {module:models/IconeJzError}
   */
  static async import () {
    try {
      /**
       * This event will only be fired if all the "extra icons" are successfully imported.
       * @event iconejz-imported-extra-icons
       */
      const IconeJzImportExtraIconsEvent = new CustomEvent('iconejz-imported-extra-icons');
      // eslint-disable-next-line import/no-unresolved,import/no-absolute-path
      const iconejzExtrasModule = await import(`${window.location.origin}/iconejz-extras/iconejz.extras.js`);
      const iconsData = iconejzExtrasModule.default;
      const iconejzExtrasStyleSheet = document.createElement('style');
      const importCSSRule = `@import url('${window.location.origin}/iconejz-extras/iconejz.extras.css');`;
      iconejzExtrasStyleSheet.textContent = importCSSRule;

      iconsData.forEach((iconObj) => {
        const { name, content } = iconObj;

        if (!name.endsWith('--e')) {
          throw new IconeJzError({ iconName: name, type: 'badlyFormattedIcon' });
        }

        IconeJz.addIcon(name, content);
      });

      document.head.append(iconejzExtrasStyleSheet);

      window.dispatchEvent(IconeJzImportExtraIconsEvent);
    } catch (err) {
      if (err instanceof IconeJzError) {
        throw err;
      }
    }
  }

  /**
   * Sets the shadow DOM path to "closed", renders the icon content, and applies the default styles.
   */
  constructor () {
    super();

    this._rootjz = this.attachShadow({ mode: 'closed' });

    this._baseStyles = document.createElement('style');
    this._baseStyles.textContent = `:host {
      width: var(--iconejz-s);
      height: var(--iconejz-s);
      margin: var(--iconejz-m);
      padding: var(--iconejz-p);
      opacity: var(--iconejz-o);
      border-radius: var(--iconejz-bd);
      background-color: var(--iconejz-bg);
      box-sizing: border-box;
      display: inline-block;
      overflow: hidden;
      cursor: var(--iconejz-cursor);
    }`;

    this._render();
    this._changeStyle();
  }

  /**
   * Add the icon content to the Shadow DOM (render the icon).
   * @protected
   * @param {String} [name='default'] - Is the name of the icon to render.
   * @throws {module:models/IconeJzError}
   */
  _render (name = 'default') {
    this._contentName = name;
    let contentToRender = iconList.get(name);
    const defaultContent = '<div part="jz jz-default">?</div>';

    if (name.endsWith('--e')) {
      return this._waitForImportExtraIcons()
        .then(() => {
          contentToRender = iconList.get(name);

          if (!contentToRender) {
            throw new IconeJzError({ iconName: name, type: 'iconDoesNotExist' });
          }

          this._rootjz.innerHTML = contentToRender;
          this._rootjz.append(this._baseStyles);
          this._automaticExportParts();
        });
    }

    this._rootjz.innerHTML = contentToRender || defaultContent;
    this._rootjz.append(this._baseStyles);
    this._automaticExportParts();

    if (name !== 'default' && !contentToRender) {
      throw new IconeJzError({ iconName: name, type: 'iconDoesNotExist' });
    }
  }

  /**
   * Recalculate the border width for icons that need it, this will allow some icons to look good at various sizes.
   * @protected
   */
  async _recalculateBorderWidth () {
    setTimeout(() => {
      const size = parseFloat(this.getAttribute('s') ?? 50);
      let currentBorderWidth = getComputedStyle(this).getPropertyValue('--iconejz-bdw');

      if (this.getRootNode() instanceof ShadowRoot) {
        const clone = this.cloneNode();

        document.body.append(clone);
        currentBorderWidth = getComputedStyle(clone).getPropertyValue('--iconejz-bdw');
        document.body.removeChild(clone);
      }

      if (currentBorderWidth) {
        const percentage = (parseFloat(currentBorderWidth) / size) * 100;
        const newBorderWidth = `${(size * percentage) / 100}px`;

        this.style.setProperty('--iconejz-bdw', newBorderWidth);
      }
    });
  }

  /**
   * Select the icon's attributes and apply their value to the corresponding CSS variable to change their styles.
   * @protected
   */
  _changeStyle () {
    IconeJz.styleAttributes.forEach((attribute) => {
      const CSSVariable = `--iconejz-${attribute}`;
      const attributeValue = this.getAttribute(attribute);

      if (attributeValue) {
        this.style.setProperty(CSSVariable, attributeValue);
      }
    });

    this._recalculateBorderWidth();
  }

  /**
   * It reads all the parts of the elements that make up the content of the icon, saves them in a 'Set' and returns in an Array.
   * @protected
   * @returns {String[]}
   */
  _readParts () {
    const parts = new Set();
    const elementsWithParts = this._rootjz.querySelectorAll('[part]');

    elementsWithParts.forEach((elementWithPart) => {
      const elementParts = elementWithPart.getAttribute('part').split(' ');

      elementParts.forEach((part) => parts.add(part));
    });

    return [...parts.keys()];
  }

  /**
   * Analyzes the parent element to see if it has a ShadowRoot and if true exports the icon parts.
   * @protected
   * @param {HTMLElement} parent - Is the parent element of the icon.
   * @param {String[]} iconParts - Are the icon parts, which will be added to the "exportparts" attribute of the parent element.
   */
  _parseParentElement (parent, iconParts) {
    if (parent.getRootNode() instanceof ShadowRoot) {
      const currentParentElementParts = parent.getAttribute('exportparts') ?? '';
      const nextParent = parent.parentNode.host;

      parent.setAttribute('exportparts', currentParentElementParts + iconParts);

      if (nextParent) {
        this._parseParentElement(nextParent, iconParts);
      }
    }
  }

  /**
   * Check if the icon is in a ShadowDOM and if true, export its parts.
   * @protected
   */
  async _automaticExportParts () {
    setTimeout(() => {
      if (this.getRootNode() instanceof ShadowRoot) {
        const parts = this._readParts();
        const parent = this.parentNode.host;

        this.setAttribute('exportparts', parts);

        if (parent && parent instanceof HTMLElement) {
          this._parseParentElement(parent, parts);
        }
      }
    });
  }

  /**
   * Changes the content of the icon (not its "is" attribute) to the content of the icon specified in the parameter.
   * @param {String} iconName - It is the name of the icon that will be the new content.
   * @param {Object} [options] - Contains the possible settings for the method.
   * @param {Boolean} [options.asyncMode=false] - Specifies whether the method should return a promise.
   * @returns {(Null|Promise)}
   */
  changeContentFor (iconName, { asyncMode = false } = {}) {
    if (iconName === this.contentName) return;

    if (asyncMode === true) {
      return this._waitForImportExtraIcons()
        .then(() => this.changeContentFor(iconName));
    }

    const newContent = iconList.get(iconName);

    if (!newContent) {
      throw new IconeJzError({ iconName, type: 'iconDoesNotExist' });
    }

    this._previousContentName = this._contentName;
    this._contentName = iconName;
    this._previousContent = this._rootjz.querySelector('div');

    this._rootjz.removeChild(this._previousContent);
    this._rootjz.innerHTML += newContent;

    this._recalculateBorderWidth();

    if (this.hasAttribute('exportparts')) {
      this._automaticExportParts();
    }
  }

  /**
   * Change the content of the icon to the one it had previously (undoes what was done by "changeContentFor").
   */
  undoContentChange () {
    const currentContent = this._rootjz.querySelector('div');

    if (currentContent === null || !this._previousContent) {
      return;
    }

    currentContent.replaceWith(this._previousContent);
    this._contentName = this._previousContentName;

    this._recalculateBorderWidth();

    if (this.hasAttribute('exportparts')) {
      this._automaticExportParts();
    }
  }

  /**
   * Alternates the content of the icon with the one specified when calling the method.
   * @param {String} name - Name of the icon by which the current content will toggle.
   * @param {Object} [options] - Contains the possible settings for the method.
   * @param {Boolean} [options.asyncMode=false] - Specifies whether the method should return a promise.
   * @returns {(Null|Promise)}
   */
  toggleContent (name, { asyncMode = false } = {}) {
    if (asyncMode === true) {
      return this._waitForImportExtraIcons()
        .then(() => this.toggleContent(name));
    }

    this.isToggled = !this.isToggled;

    (this.isToggled)
      ? this.changeContentFor(name)
      : this.undoContentChange();
  }

  /**
   * It comes from the extension of the "HTMLElement" class and is executed by connecting the element to the document.
   */
  // eslint-disable-next-line class-methods-use-this
  connectedCallback () {}

  /**
   * It is executed every time an attribute (specified in the previous method) is added, changed or removed to the icon.
   * @param {String} name - Is the name of the attribute.
   * @param {String} oldValue - It is the old (or ancient) value of the attribute.
   * @param {String} newValue - Is the new value of the attribute.
   */
  attributeChangedCallback (name, oldValue, newValue) {
    if (name === 'is') {
      (newValue !== null)
        ? this._render(newValue)
        : this.undoContentChange();
    }

    if (IconeJz.styleAttributes.includes(name) && newValue !== null) {
      this._changeStyle();
    }

    if (name === 'version') {
      // eslint-disable-next-line no-console
      console.log(`IconeJz v${version}`);
    }
  }

  /**
   * Returns a promise when event "iconejz-imported-extra-icons" is fired.
   * @protected
   * @listens iconejz-imported-extra-icons
   * @return {Promise}
   */
  async _waitForImportExtraIcons () {
    return new Promise((res) => {
      if (this._isImportedExtraIcons) {
        res();
      }

      window.addEventListener('iconejz-imported-extra-icons', () => {
        this._isImportedExtraIcons = true;
        res();
      });
    });
  }

  /**
   * Returns the name of the icon that is rendered. It is not the same as doing "icon.getAttribute('is');".
   * @readonly
   * @returns {String}
   *
   * @example
   *
   * • HTML:
   * <icone-jz is="menu"></icone-jz>
   *
   * • JS:
   * const icon = document.querySelector('[is="menu"]');
   * console.log(icon.contentName); // menu
   *
   * icon.changeContentFor('x');
   * console.log(icon.contentName); // x
   */
  get contentName () {
    return this._contentName;
  }
};

export default IconeJz;

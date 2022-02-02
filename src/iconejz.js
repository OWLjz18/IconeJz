/**
 * @author OWLjz18 <owl.jz18@gmail.com> 
 * @gratitude My Family | Leandro | FR | Jaspe.
 * @license MIT > https://github.com/OWLjz18/IconeJz/blob/main/LICENSE.md
 * @see https://owljz18.github.io/IconeJzDoc
*/

'use strict';

/**
 * Seleciona la hoja de estilos con la cuál se conecta el archivo 'IconeJz/src/iconejz.css', para obtener su 'href' y crear una nueva hoja de estilos que se le agregará al shadowRoot de cada icono.
 * @type {HTMLLinkElement}
*/
const IconeJzStyleSheet = document.querySelector('link[href$="IconeJz/src/iconejz.css"]'); 

/**
 * Con esta clase creamos un customElement por cada llamada al metodo 'createIcon', al mismo tiempo que observa sus atributos y permite aplicarles estilos mediante ellos, además de poder cambiar un ícono por otro.
 * @extends HTMLElement
*/
const IconeJz = class extends HTMLElement {
  
  /**
   * Crea un elemento 'link' y le asigna un 'href' que será igual a 'IconeJzStyleSheet.href', al crear ese elemento 'link' se lo agrega al principio del shadowRoot de cada ícono, luego válida si el nombre del ícono es diferente a 'jz-icone' (el cuál es un mensaje de bienvenida) y de ser verdadero, aplica unos estilos por defecto al ícono. Por último establece a 'this._statusChangeStyle', 'this._statusBackgroundTransparent' y 'this._objChangeIconejz.status' en 'false'.
  */
  constructor() {
    super();
    
    const stylejz = document.createElement('link');
    stylejz.setAttribute('rel', 'stylesheet');
    stylejz.setAttribute('href', IconeJzStyleSheet.href);
    
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(stylejz);
    
    this.nameIcon = this.tagName.toLowerCase();
    
    if (this.nameIcon != 'jz-icone') {
      const styleDefault = document.createElement('style');
      styleDefault.textContent = `
      :host(${this.nameIcon}) {
        width: var(--size-iconejz);
        height: var(--size-iconejz);
        border-radius: var(--border-radius-iconejz);
        background-color: var(--background-iconejz);
        margin: var(--margin-iconejz);
        padding: var(--padding-iconejz);
        opacity: var(--opacity-iconejz);
        overflow: hidden;
        
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        display: inline-block;
      }
      `;
     
      this.shadowRoot.appendChild(styleDefault);
    }
    
    this._statusChangeStyle = false;
    this._statusBackgroundTransparent = false;
    
    this._objChangeIconejz = { status: false };
    
    Object.defineProperty(this, 'version', {
      value: 'IconeJz v1.0.0',
      writable: false,
      configurable: false
    });
    
  }
  
  /**
   * Agrega el contenido del ícono a su shadowDOM.
  */
  _render() {
    
    this.shadowRoot.innerHTML += '<p>¡Gracias por usar IconeJz. Esperamos que disfrute de nuestro servicio!</p>';
    
  }
  
  /**
   * Selecciona los atributos del ícono y aplica su valor a la variable correspondiente de CSS para cambiarle los estilos. Además sí el ícono es 'jz-ig' o 'jz-mg' calcula en base a su tamaño el ancho de la línea que estos tendrán.
  */
  _changeStyle() {
    
    if (this.nameIcon != 'jz-icone'){
      
      this.style.setProperty('--background-iconejz', this.getAttribute('f'));
      this.style.setProperty('--color-iconejz', this.getAttribute('c'));  
      this.style.setProperty('--size-iconejz', this.getAttribute('s'));
      this.style.setProperty('--border-radius-iconejz', this.getAttribute('b'));
      this.style.setProperty('--margin-iconejz', this.getAttribute('m'));
      this.style.setProperty('--padding-iconejz', this.getAttribute('p'));
      this.style.setProperty('--opacity-iconejz', this.getAttribute('o'));
      
    } 
    
    if (this.nameIcon == 'jz-ig') {
      
      const borderWidth = `${parseFloat(this.getAttribute('s') ?? 50) / 20}px`;
      this.style.setProperty('--border-width-instagram-iconejz', borderWidth);
      
    }
    
    if (this.nameIcon == 'jz-mg') {
      
      const borderWidth = `${parseFloat(this.getAttribute('s') ?? 50) / 50}px`;
      this.style.setProperty('--border-width-magnifyingGlass-iconejz', borderWidth);
      
    }
    
  }
  
  /**
   * Selecciona a todos los elementos que tiene el ícono en su shadowDOM con el atributo 'data-background_transparent' siendo su valor igual a 'false'.
   * @param {String} value - Es el valor del atributo 't'.
  */
  _backgroundTransparent(value) {
    
    this.shadowRoot.querySelectorAll('[data-background_transparent="false"]').forEach( childElementWithoutBackgroundTransparent => childElementWithoutBackgroundTransparent.style.setProperty('--background-iconejz', value));
    
  }
  
  /**
   * Crea un nuevo elemento siendo este el espeficado en 'nameNewIcon' y reemplaza el contenido anterior del ícono por este nuevo elemento creado, manteniendo lo que tenía anteriormente, atributos, eventos, etc.
   * @param {String} nameNewIcon - Es el nombre del elemento que se creará para luego reemplazar el contenido anterior del ícono por este.
  */
  _changeIconejz(nameNewIcon) {
    
    const iconsWithoutBackgroundTransparent = ['jz-lc', 'jz-stt', 'jz-wng', 'jz-sms', 'jz-cam'];
    
    let oldContentIcon = this.shadowRoot.querySelector('.contentIconejz');
    
    const newIcon = document.createElement(nameNewIcon);
    newIcon.classList.add('contentIconejz');
    
    if (this.hasAttribute('t') && iconsWithoutBackgroundTransparent.includes(nameNewIcon)) {
      
      newIcon.setAttribute('t', this.getAttribute('t'));
      
    }
    
    if (nameNewIcon == 'jz-ig') {
      
      const borderWidth = `${parseFloat(this.getAttribute('s') ?? 50) / 20}px`;
      newIcon.style.setProperty('--border-width-instagram-iconejz', borderWidth);
      
    }
    
    if (nameNewIcon == 'jz-mg') {
      
      const borderWidth = `${parseFloat(this.getAttribute('s') ?? 50) / 50}px`;
      this.style.setProperty('--border-width-magnifyingGlass-iconejz', borderWidth);
      
    }
    
    this.shadowRoot.replaceChild(newIcon, oldContentIcon);
    
    /**
     * Deshace lo hecho por 'this._changeIconejz' y cambia el contenido del ícono por el que tuvo inicialmente.
    */
    this._changeIconejz.undo = () => { 
      
      this.shadowRoot.replaceChild(this._initialContentIcon, newIcon);
      
    };
    
  }
  
  /**
   * Crea un nuevo ícono generando un 'customElement'.
   * @param {String} iconTag - Es la etiqueta (nombre) que tendrá el ícono.
   * @param {String} iconContent - Es el contenido del ícono.
  */
  static createIcon(iconTag, iconContent) {
    
    customElements.define(iconTag, class extends IconeJz {
      
      _render() { 
        
        this.shadowRoot.innerHTML += iconContent; 
        
      }
      
    });
    
  }
  
  /**
   * Al conectar el ícono al HTML este metodo se encarga de dibujar su contenido, guardar una "copia" de su contenido inicial y validar si debe o no hacer uso de 'this._statusChangeStyle', 'this._changeIconejz' y 'this._backgroundTransparent'.
  */
  connectedCallback() {
    
    this._render();
    this._initialContentIcon = this.shadowRoot.querySelector('.contentIconejz');
    
    if (this._statusChangeStyle) {
      
      this._changeStyle();
      
    }
   
    if (this._objChangeIconejz.status) {
      
      this._changeIconejz(this._objChangeIconejz.nameNewIcon);
      
    }
    
    if (this._statusBackgroundTransparent){
      
      this._backgroundTransparent(this.getAttribute('t'));
      
    }
    
  }
  
  /**
   * Observa los atributos que podrá tener el icono.
  */
  static get observedAttributes() {
    return ['f', 'c', 's', 'b', 't', 'm', 'p', 'o', 'change-iconejz'];
  }
  
  /**
   * Se ejecuta cada que un atributo (especificado en el metodo anterior) se agrega, cambia o elimina al elemento y establece a 'this._statusChangeStyle' en 'true' y hace ciertas validaciones para saber si invoca a un metodo o no.
   * @param {String} name - Es el nombre del atributo.
   * @param {String} oldValue - Es el valor viejo (o antiguo) del atributo.
   * @param {String} newValue - Es el nuevo valor del atributo.
  */
  attributeChangedCallback(name, oldValue, newValue) {
    
    this._statusChangeStyle = true;
    
    if (name != 'change-iconejz' && newValue !== '') {
      
      this._changeStyle();
      
    }
    
    if (name == 'change-iconejz' && newValue !== null && newValue.startsWith('jz-') && newValue.length >= 4){
      
      this._objChangeIconejz.status = true;
      this._objChangeIconejz.nameNewIcon = newValue;
      
      if (this.parentElement !== null) {
        
        this._changeIconejz(this._objChangeIconejz.nameNewIcon);
        
      }
      
    }
    
    if (name == 'change-iconejz' && newValue === null){
      
      this._changeIconejz.undo();
      
    }
    
    if (name == 't') {
      
      this._statusBackgroundTransparent = true;
      this._backgroundTransparent(this.getAttribute('t'));
      
    }
    
  }
  
};
customElements.define('jz-icone', IconeJz);


// Arrows:  


// • Icon "Arrow Up" (jz-a-u): //
IconeJz.createIcon('jz-a-u', 
  `<div class="jz flexjz jz-a-u--content contentIconejz">
    <div class="jz jz-a-u-sg"></div>
  </div>`
);

// • Icon "Arrow Right" (jz-a-rg): //
IconeJz.createIcon('jz-a-rg', 
  `<div class="jz flexjz jz-a-rg--content contentIconejz">
    <div class="jz jz-a-rg-sg"></div>
  </div>`
);

// • Icon "Arrow Down" (jz-a-d): //
IconeJz.createIcon('jz-a-d', 
  `<div class="jz flexjz jz-a-d--content contentIconejz">
    <div class="jz jz-a-d-sg"></div>
  </div>`
);

// • Icon "Arrow Left" (jz-a-lf): //
IconeJz.createIcon('jz-a-lf', 
  `<div class="jz flexjz jz-a-lf--content contentIconejz">
    <div class="jz jz-a-lf-sg"></div>
  </div>`
);


// Others:


// • Icon "Youtube" (jz-yt): //
IconeJz.createIcon('jz-yt', 
  `<div class="jz flexjz jz-yt--content contentIconejz">
    <div class="jz jz-yt-sg"></div>
  </div>`
);

// • Icon "Instagram" (jz-ig): //
IconeJz.createIcon('jz-ig', 
  `<div class="jz flexjz jz-ig--content contentIconejz">
    <div class="jz jz-ig-cb">
      <div class="jz jz-ig-c"></div>
      <div class="jz jz-ig-p"></div>
    </div>
  </div>`
);

// • Icon "Menu" (jz-m): //
IconeJz.createIcon('jz-m', 
  `<div class="jz flexjz jz-m--content contentIconejz">
    <div class="jz jz-m-l"></div>
    <div class="jz jz-m-l"></div>
    <div class="jz jz-m-l"></div>
  </div>`
);

// • Icon "Magnifying Glass" (jz-mg): //
IconeJz.createIcon('jz-mg', 
  `<div class="jz jz-mg--content contentIconejz">
    <div class="jz jz-mg-c"></div>
    <div class="jz jz-mg-l"></div>
  </div>`
);

// • Icon "Check" (jz-ck): //
IconeJz.createIcon('jz-ck', 
  `<div class="jz flexjz jz-ck--content contentIconejz">
    <div class="jz jz-ck-sg"></div>
  </div>`
);

// • Icon "X" (jz-x): //
IconeJz.createIcon('jz-x', 
  `<div class="jz flexjz jz-x--content contentIconejz">
    <div class="jz jz-x-sg"></div>
  </div>`
);

// • Icon "Three Vertical Points" (jz-tvp): //
IconeJz.createIcon('jz-tvp',
  `<div class="jz flexjz jz-tvp--content contentIconejz">
    <div class="jz jz-tvp-c"></div>
    <div class="jz jz-tvp-c"></div>
    <div class="jz jz-tvp-c"></div>
  </div>`
);

// • Icon "Three Horizontal Points" (jz-thp): //
IconeJz.createIcon('jz-thp', 
  `<div class="jz flexjz jz-thp--content contentIconejz">
    <div class="jz jz-thp-c"></div>
    <div class="jz jz-thp-c"></div>
    <div class="jz jz-thp-c"></div>
  </div>`
);

// • Icon "Padlock" (jz-plk): //
IconeJz.createIcon('jz-plk', 
  `<div class="jz flexjz jz-plk--content contentIconejz">
    <div class="jz jz-plk-cb">
      <div class="jz jz-plk-l"></div>
    </div>
  </div>`
);
;
// • Icon "Open Lock" (jz-oplk): //
IconeJz.createIcon('jz-oplk', 
  `<div class="jz flexjz jz-oplk--content contentIconejz">
    <div class="jz jz-oplk-cb">
      <div class="jz jz-oplk-l"></div>
    </div>
  </div>`
);

// • Icon "Store Car" (jz-sc): //
IconeJz.createIcon('jz-sc', 
  `<div class="jz flexjz jz-sc--content contentIconejz">
    <div class="jz jz-sc-c"></div>
    <div class="jz jz-sc-p-content">
      <div class="jz jz-sc-p"></div>
      <div class="jz jz-sc-p"></div>
    </div>
  </div>`
);

// • Icon "Location" (jz-lc): //
IconeJz.createIcon('jz-lc', 
  `<div class="jz flexjz jz-lc--content contentIconejz">
    <div class="jz jz-lc-c">
      <div class="jz jz-lc-tr"></div>
      <div class="jz jz-lc-p" data-background_transparent="false"></div>
    </div>
  </div>`
);

// • Icon "User" (jz-us): //
IconeJz.createIcon('jz-us', 
  `<div class="jz flexjz jz-us--content contentIconejz">
    <div class="jz jz-us-b">
      <div class="jz jz-us-c1"></div>
      <div class="jz jz-us-c2"></div>
    </div>
  </div>`
);

// • Icon "User New" (jz-usn): //
IconeJz.createIcon('jz-usn', 
  `<div class="jz flexjz jz-usn--content contentIconejz">
    <div class="jz jz-usn-b">
      <div class="jz jz-usn-c1"></div>
      <div class="jz jz-usn-c2"></div>
      <div class="jz jz-usn-ps">
        <div class="jz jz-usn-psl"></div>
      </div>
    </div>
  </div>`
);

// • Icon "Settings" (jz-stt): //
IconeJz.createIcon('jz-stt', 
  `<div class="jz flexjz jz-stt--content contentIconejz">
    <div class="jz jz-stt-c">
      <div class="jz jz-stt-sbc" data-background_transparent="false"></div>
      <div class="jz jz-stt-cb1"></div>
      <div class="jz jz-stt-cb2"></div>
      <div class="jz jz-stt-cb3"></div>
      <div class="jz jz-stt-cb4"></div>
      <div class="jz jz-stt-cb5"></div>
      <div class="jz jz-stt-cb6"></div>
    </div>
  </div>`
);

// • Icon "Share" (jz-shr): //
IconeJz.createIcon('jz-shr', 
  `<div class="jz flexjz jz-shr--content contentIconejz">
    <div class="jz jz-shr-c1"></div>
    <div class="jz jz-shr-c2"></div>
    <div class="jz jz-shr-c3"></div>      
    <div class="jz jz-shr-l1"></div>
    <div class="jz jz-shr-l2"></div>
  </div>`
);

// • Icon "Home" (jz-hm): //
IconeJz.createIcon('jz-hm', 
  `<div class="jz flexjz jz-hm--content contentIconejz">
    <div class="jz jz-hm-l1"></div>
    <div class="jz jz-hm-l2"></div>
    <div class="jz jz-hm-l3"></div>
    <div class="jz jz-hm-l4"></div>
    <div class="jz jz-hm-l5"></div>
  </div>`
);

// • Icon "Star" (jz-str): //
IconeJz.createIcon('jz-str', 
  `<div class="jz flexjz jz-str--content contentIconejz">
    <div class="jz jz-str-st"></div>
  </div>`
);

// • Icon "Warning" (jz-wng): //
IconeJz.createIcon('jz-wng', 
  `<div class="jz flexjz jz-wng--content contentIconejz">
    <div class="jz jz-wng-tr">
      <div class="jz jz-wng-l" data-background_transparent="false"></div>
      <div class="jz jz-wng-l" data-background_transparent="false"></div>
    </div>
  </div>`
);

// • Icon "SMS" (jz-sms): //
IconeJz.createIcon('jz-sms', 
  `<div class="jz flexjz jz-sms--content contentIconejz">
    <div class="jz jz-sms-rc">
      <div class="jz jz-sms-l" data-background_transparent="false"></div>
      <div class="jz jz-sms-l" data-background_transparent="false"></div>
    </div>
  </div>`
);

// • Icon "Camera" (jz-cam): //
IconeJz.createIcon('jz-cam', 
  `<div class="jz flexjz jz-cam--content contentIconejz">
    <div class="jz jz-cam-l"></div>
    <div class="jz jz-cam-cb">
      <div class="jz jz-cam-c" data-background_transparent="false">
        <div class="jz jz-cam-sbc"></div>
      </div>
    </div>
  </div>`
);

// • Icon "Plus" (jz-plus): //
IconeJz.createIcon('jz-plus', 
  `<div class="jz flexjz jz-plus--content contentIconejz">
    <div class="jz jz-plus-sg"></div>
  </div>`
);

// • Icon "Minus" (jz-minus): //
IconeJz.createIcon('jz-minus', 
  `<div class="jz flexjz jz-minus--content contentIconejz">
    <div class="jz jz-minus-l"></div>
  </div>`
);

// • Icon "Download Complete" (jz-dwl-c): //
IconeJz.createIcon('jz-dwl-c', 
  `<div class="jz flexjz jz-dwl-c--content contentIconejz">
    <div class="jz jz-dwl-c-ck"></div>
    <div class="jz jz-dwl-c-l"></div>
  </div>`
);

// • Icon "Pause" (jz-pause): //
IconeJz.createIcon('jz-pause', 
  `<div class="jz flexjz jz-pause--content contentIconejz">
    <div class="jz jz-pause-l"></div>
    <div class="jz jz-pause-l"></div>
  </div>`
);

// • Icon "Play" (jz-play): //
IconeJz.createIcon('jz-play', 
  `<div class="jz flexjz jz-play--content contentIconejz">
    <div class="jz jz-play-sg"></div>
  </div>`
);

// • Icon "Information" (jz-info): //
IconeJz.createIcon('jz-info', 
  `<div class="jz flexjz jz-info--content contentIconejz">
    <div class="jz jz-info-c">
      <div class="jz jz-info-l1"></div>
      <div class="jz jz-info-l2"></div>
    </div>
  </div>`
);

// • Icon "Double Check" (jz-dbl-ck): //
IconeJz.createIcon('jz-dbl-ck', 
  `<div class="jz flexjz jz-dbl-ck--content contentIconejz">
    <div class="jz jz-dbl-ck-sg"></div>
    <div class="jz jz-dbl-ck-sg"></div>  
  </div>`
);

// • Icon "Copy" (jz-copy): //
IconeJz.createIcon('jz-copy', 
  `<div class="jz flexjz jz-copy--content contentIconejz">
    <div class="jz jz-copy-sg"></div>
  </div>`
);

// • Icon "Clipboard" (jz-clipboard): //
IconeJz.createIcon('jz-clipboard', 
  `<div class="jz flexjz jz-clipboard--content contentIconejz">
    <div class="jz jz-clipboard-bx">
      <div class="jz jz-clipboard-rc"></div>
      <div class="jz jz-clipboard-rc2"></div>
      <div class="jz jz-clipboard-l"></div>
      <div class="jz jz-clipboard-l"></div>
      <div class="jz jz-clipboard-l"></div>
    </div>
  </div>`
);

// • Icon "Previous" (jz-prev): //
IconeJz.createIcon('jz-prev', 
  `<div class="jz flexjz jz-prev--content contentIconejz">
    <div class="jz jz-prev-l"></div>
    <div class="jz jz-prev-sg"></div>
  </div>`
);

// • Icon "Next" (jz-next): //
IconeJz.createIcon('jz-next', 
  `<div class="jz flexjz jz-next--content contentIconejz">
    <div class="jz jz-next-sg"></div>
    <div class="jz jz-next-l"></div>
  </div>`
);

// • Icon "Download" (jz-dwl): //
IconeJz.createIcon('jz-dwl', 
  `<div class="jz flexjz jz-dwl--content contentIconejz">
    <div class="jz jz-dwl-arrow"></div>
    <div class="jz jz-dwl-l"></div>    
  </div>`
);

// • Icon "Pencil" (jz-pcl): //
IconeJz.createIcon('jz-pcl', 
 `<div class="jz flexjz jz-pcl--content contentIconejz">
    <div class="jz jz-pcl-l"></div>
    <div class="jz jz-pcl-c"></div>
  </div>`
);

// • Icon "Tack" (jz-tack): //
IconeJz.createIcon('jz-tack', 
`<div class="jz flexjz jz-tack--content contentIconejz">
  <div class="jz jz-tack-c"></div>
  <div class="jz jz-tack-p"></div>
  </div>`
);

// • Icon "Paper Bin" (jz-ppb): //
IconeJz.createIcon('jz-ppb', 
`<div class="jz flexjz jz-ppb--content contentIconejz">
  <div class="jz jz-ppb-lt"></div>
  <div class="jz jz-ppb-lm"></div>
  <div class="jz jz-ppb-c"></div>      
  <div class="jz jz-ppb-l-content">
    <div class="jz jz-ppb-l"></div>
    <div class="jz jz-ppb-l"></div>
    <div class="jz jz-ppb-l"></div> 
  </div>
</div>`
);

// • Icon "Github" (jz-github): //
IconeJz.createIcon('jz-github', 
`<div class="jz flexjz jz-github--content contentIconejz">
  <div class="jz flexjz jz-github-cc">
    <div class="jz jz-github-o" data-background_transparent="false"></div>
    <div class="jz jz-github-o" data-background_transparent="false"></div>
    <div class="jz jz-github-cb" data-background_transparent="false"></div>
    <div class="jz jz-github-cp" data-background_transparent="false"></div>
    <div class="jz jz-github-cl1" data-background_transparent="false"></div>
    <div class="jz jz-github-cl2" data-background_transparent="false"></div>
    <div class="jz jz-github-cl3"></div>
    <div class="jz jz-github-cl4" data-background_transparent="false"></div>
    <div class="jz jz-github-cf"></div>
  </div>
</div>`
);

// • Icon "Git" (jz-git): //
IconeJz.createIcon('jz-git',
`<div class="jz flexjz jz-git--content contentIconejz">
  <div class="jz flexjz jz-git-box">
    <div class="jz jz-git-ln1" data-background_transparent="false"></div>
    <div class="jz jz-git-ln2" data-background_transparent="false"></div>
    <div class="jz jz-git-c1" data-background_transparent="false"></div>
    <div class="jz jz-git-c2" data-background_transparent="false"></div>
    <div class="jz jz-git-c3" data-background_transparent="false"></div>
  </div>
</div>`
);

// • Icon "Shell" (jz-sh): //
IconeJz.createIcon('jz-sh', 
`<div class="jz flexjz jz-sh--content contentIconejz">
  <div class="jz jz-sh-a-rg"></div>
  <div class="jz jz-sh-ln"></div>
</div>`
);

// • Icon "HTML" (jz-html): //
IconeJz.createIcon('jz-html', 
`<div class="jz flexjz jz-html--content contentIconejz">
  <div class="jz flexjz jz-html-box">
    <div class="jz jz-html-sg" data-background_transparent="false">
  </div>
</div>`
);

// • Icon "CSS" (jz-css): //
IconeJz.createIcon('jz-css', 
`<div class="jz flexjz jz-css--content contentIconejz">
  <div class="jz flexjz jz-css-box">
    <div class="jz jz-css-sg" data-background_transparent="false">
  </div>
</div>`
);

// • Icon "JS" (jz-js): //
IconeJz.createIcon('jz-js', 
`<div class="jz flexjz jz-js--content contentIconejz">
  <div class="jz flexjz jz-js-box">
    <div class="jz jz-js-j" data-background_transparent="false"></div>
    <div class="jz jz-js-s" data-background_transparent="false"></div>
  </div>
</div>`
);

// • Icon "Markdown" (jz-md): //
IconeJz.createIcon('jz-md', 
`<div class="jz flexjz jz-md--content contentIconejz">
  <div class="jz flexjz jz-md-box">
    <div class="jz jz-md-m" data-background_transparent="false"></div>
    <div class="jz jz-md-a-d" data-background_transparent="false"></div>
  </div>
</div>`
);

// • Icon "Text" (jz-txt): //
IconeJz.createIcon('jz-txt', 
`<div class="jz flexjz jz-txt--content contentIconejz">
  <div class="jz jz-txt-box">
    <div class="jz jz-txt-l"></div>
    <div class="jz jz-txt-l"></div>
    <div class="jz jz-txt-l"></div>
    <div class="jz jz-txt-l"></div>
  </div>
</div>`
);

// • Icon "Heart" (jz-heart): //
IconeJz.createIcon('jz-heart', 
`<div class="jz flexjz jz-heart--content contentIconejz">
  <div class="jz jz-heart">
    <div class="jz jz-heart-sc"></div>
    <div class="jz jz-heart-sc"></div>
  </div>
</div>`
);

// • Icon "Email" (jz-email): //
IconeJz.createIcon('jz-email', 
`<div class="jz flexjz jz-email--content contentIconejz">
  <div class="jz jz-email">
    <div class="jz jz-email-p" data-background_transparent="false">
      <div class="jz jz-email-p-c"></div>
    </div>
    <div class="jz jz-email-p2" data-background_transparent="false">
      <div class="jz jz-email-p-c2"></div>
    </div>
  </div>
</div>`
);

/*  End.  */
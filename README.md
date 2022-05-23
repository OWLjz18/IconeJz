<h1 align="center">IconeJz</h1>

Soy un sistema de íconos basado puramente en **_HTML, CSS y Javascript_**, cuento con la funcionalidad de poder darle estilos a mis íconos mediante algunos atributos en específico, además de también poder cambiar un ícono por otro. Por favor vean la sección de ["Uso"](#uso) para obtener más detalles.

- - -

### 💌 Agradecimientos ###

Primeramente quiero darle las gracias a mi familia por apoyarme y motivarme al decidir estudiar esta carrera. 💚

También quiero agradecer a _"FR"_ por el gran apoyo y motivación que me dió en los momentos en que pensaba que por no tener PC no podria continuar, además de contestar las más de 20 preguntas que le hacía todos los días jajaja 😅. A _"Leandro"_ por recomendarme en una publicación de Facebook el editor de texto que sigo usando al día de hoy para programar en el móvil y luego, con el paso del tiempo, apoyarme con este proyecto desde el primer momento en que le comenté la idea que tenía para crear este sistema de íconos 🌠. Y por último pero no menos importante, quiero agradecerle a _"Jaspe"_ mi querido profesor de inglés por ayudarme con varias de las traducciones que fueron necesarias para los nombres de los íconos. 🎉

**_Atte:_ OWLjz18.🦉**

- - -

### 📝 Pre-Requisitos ### 

No son necesarios todos los pre-requisitos acá mencionados, solamente con el que escojan instalarme.

  * [git](https://git-scm.com/) Para clonar el repositorio mediante git.
  * [gh](https://cli.github.com) Para clonar el repositorio mediante gh (cli de github).
  * [npm](https://npmjs.com) Para clonar el repositorio mediante npm.


- - -

### 🔧 Instalación ### 

Diríjase al proyecto en que desea implementarme, abra su terminal y ejecute el comando correspondiente a la opcion que haya escogido en la seccion anterior:

#### Git

``` sh
git clone 'https://github.com/OWLjz18/IconeJz.git'
```

O me pueden agregar como un submodulo a su proyecto.

``` sh
git submodule add 'https://github.com/OWLjz18/IconeJz.git'
```

#### Github CLI (gh)

``` sh
gh repo clone 'OWLjz18/IconeJz'
```

#### NPM

``` sh
npm install iconejz
```

- - -

### 🔎 Uso ### 

Para comenzar deben enlazar una hoja de estilos y un script al archivo _HTML_ dónde me vayan a implementar, suponiendo que su archivo _HTML_ y yo estemos en la raíz de su proyecto, la ruta de los archivos a enlazar se verían de la siguiente forma:

``` html
<link rel="stylesheet" href="./IconeJz/src/iconejz.css">

<script src="./IconeJz/src/iconejz.js"></script>
```

O en caso de instalarme mediante **npm** deberan enlazarlos así:

``` html
<link rel="stylesheet" href="/node_modules/iconejz/src/iconejz.css">

<script src="/node_modules/iconejz/src/iconejz.js"></script>
```

**_Nota:_** El script puede ser enlazado sin problemas en el **HEAD** ya que este no necesita esperar a que se cargue por completo el **DOM**. (si me preguntan, esa sería mi recomendación, además de agregarle el atributo _"async"_)

Luego de tener ambos archivos enlazados proseguimos a escoger el ícono de nuestra elección que esté disponible en el archivo ["iconejz.txt"](./src/iconejz.txt) que se encuentra dentro de la carpeta **src** que contengo, ya que en él tendrán una lista con el nombre de todos los íconos disponibles y su respectivo código para que puedan copiar y pegar en su **HTML**, para el ejemplo escojamos el ícono de un menú hamburguesa, en este caso, el siguiente sería su código:

``` html
<jz-m></jz-m>
```

Y este sería el resultado:

<img width="100px" height="100px" alt="Ejemplo del ícono 'jz-m'" src="https://raw.githubusercontent.com/OWLjz18/Imagenes/main/IconeJz/ejemplo-0.png" />

Acá les dejo una lista con todos los atributos disponibles para darle estilos a mis íconos o si así lo desea, cambiar un icono por otro:

  * **f** => Establece el color de fondo del ícono.
  * **c** => Establece el color para el contenido del ícono.
  * **s** => Establece el tamaño del ícono.
  * **b** => Establece el border-radius que tendrá el ícono.
  * **t** => Establece un color de fondo para los íconos que no pueden tener completamente un fondo transparente, por favor lea la siguiente sección para tener más detalles.
  * **m** => Establece el margin del ícono.
  * **p** => Establece el padding del ícono.
  * **o** => Establece la opacidad del ícono.
  * **change-iconejz** => Permite cambiar un ícono por otro.

- - - 

### 👀 Advertencias ###

Deben tener en cuenta que algunos íconos como "jz-wng" no pueden tener un fondo totalmente transparente, ya que dichos íconos tienen elementos dentro que simulan ser un "hueco".

Veamos un ejemplo con el ícono mencionado anteriormente para entenderlo mejor, a primera vista notamos que el ícono "jz-wng" tiene un signo de exclamación en medio, el cuál simula ser un "hueco" en el interior del mismo, pero supongamos que tenemos un contenedor con fondo verde, por lo que si le damos un `f="transparent"` sucederá esto:

<img width="110px" height="110px" alt="Ejemplo del ícono 'jz-wng' sin el atributo 't'" src="https://raw.githubusercontent.com/OWLjz18/Imagenes/main/IconeJz/ejemplo-1.png" />

Pero si le agregamos el atributo **"t"** con el valor del color de fondo, si se vería como esperamos, acá un ejemplo con el atributo `t="green"`

<img width="110px" height="110px" alt="Ejemplo del ícono 'jz-wng' con el atributo 't'" src="https://raw.githubusercontent.com/OWLjz18/Imagenes/main/IconeJz/ejemplo-2.png" />

Algo que deben tener en cuenta es que si deciden modificar el nombre de mi carpeta luego de instalarla, deberán dirigirse al archivo _**"iconejz.js"**_ y modificar el selector que tiene la constante **"IconeJzStyleSheet"** así evitarán un posible error de que no puede seleccionarse un elemento con esa ruta.   _**!important**_

- - -

### 📚 Documentación ###

Pueden obtener una información más extensa y con mayor cantidad de ejemplos visitando mí [documentación](https://owljz18.github.io/IconeJzDoc).

- - -

### 📌 Versión ### 

Si desean saber que versión están usando, pueden seleccionar con Javascript cualquier ícono que tengan en su DOM y ver su propiedad **_'version'_**, de la siguiente forma:

``` html
<jz-m class="icono"></jz-m>
```

``` javascript
const icono = document.querySelector('.icono');

console.log(icono.version);
```

- - - 

### 🦉 Autor ###

  * *__José Zambrano__* ([OWLjz18](https://github.com/OWLjz18)) => Creador del proyecto.
    * Correo electrónico => <owl.jz18@gmail.com>
    * Instagram => [@owljz18](https://instagram.com/owljz18)

- - -

### 🤝 Apoyo ###

Si te gusta el proyecto puedes comentarle a otros sobre él y regalarnos una 🌟.

Y si desea realizar una donación para aportar monetariamente su granito de arena, puede hacerlo vía Paypal pulsando [aquí](https://www.paypal.me/IconeJz). 💰

- - -

### 📃 Licencia ###

Este proyecto esta bajo una licencia MIT, visite el archivo [LICENSE.md](./LICENSE.md) para obtener más información al respecto.

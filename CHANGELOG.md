<i><h1 align="center">👻 IconeJz Changelog 👻</h1></i>

## v2.0.1 - (2023-04-01) ✨

  * **_<[a46e5d8][a46e5d8]>_** fix: fixed CDN issue with importing extra icons
  * **_<[3062fda][3062fda]>_** Merge pull request #1 from OWLjz18/pre-main
  * **_<[54875e6][54875e6]>_** docs: added "CHANGELOG.md" file

[a46e5d8]: https://github.com/OWLjz18/IconeJz/commit/a46e5d8
[3062fda]: https://github.com/OWLjz18/IconeJz/commit/3062fda
[54875e6]: https://github.com/OWLjz18/IconeJz/commit/54875e6

## v2.0.0 - (2023-03-31) ✨

  * **_<[ead9836][ead9836]>_** refactor!: all code was improved, creating v2
    * 🔥 Breaking Changes:
      * The icon format changed. For example: `<jz-m></jz-m>` becomes `<icone-jz is="menu"></icone-jz>`.
      * Now it is necessary to specify that my script is a module, by adding the `type="module"` attribute.
      * The format of the CSS variables changed, now they will have the same name as the attributes, for example: `--size-iconejz` becomes `--iconejz-s`.
    * 🌱 Features:
      * Added the following methods for use in JS: [`changeContentFor`][changeContentFor], [`undoContentChange`][undoContentChange] and [`toggleContent`][toggleContent].
      * Added [`contentName`][contentName] getter.
      * The `is` attribute was added, which will be the new one in charge of rendering the content of the icons.
      * Added new CSS variable `--iconejz-t` and `--iconejz-cursor`.
    * 🌪️ Deprecated:
      * The `change-iconejz` attribute was removed, use the [`changeContentFor`][changeContentFor] method or the `is` attribute instead.
      * The `version` getter has been removed, in its place is the new [`version`][versionAttribute] attribute.
      * The `f` attribute that set a background color for the icon is now called `bg`. And the `b` attribute that modified the border-radius is now called `bd`.

[ead9836]: https://github.com/OWLjz18/IconeJz/commit/ead9836
[changeContentFor]: https://github.com/OWLjz18/IconeJz#changeContentFor
[undoContentChange]: https://github.com/OWLjz18/IconeJz#undoContentChange
[toggleContent]: https://github.com/OWLjz18/IconeJz#toggleContent
[contentName]: https://github.com/OWLjz18/IconeJz#contentName
[versionAttribute]: https://github.com/OWLjz18/IconeJz#version

## v1.0.1 - (2023-05-22) ✨

  * **_<[ee1c025][ee1c025]>_** Se modificó el selector de de la variable "IconeJzStyleSheet" y se actualizó el README.md

[v1.0.1]: https://github.com/OWLjz18/IconeJz/compare/v1.0.1...v1.0.0
[ee1c025]: https://github.com/OWLjz18/IconeJz/commit/ee1c025

## v1.0.0 - (2022-04-06) ✨

  * **_<[ee18292][ee18292]>_** Se agregó el "packcage.json"
  * **_<[39ced42][39ced42]>_** Commit inicial

[ee18292]: https://github.com/OWLjz18/IconeJz/commit/ee18292
[39ced42]: https://github.com/OWLjz18/IconeJz/commit/39ced42

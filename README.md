<section id="head" data-note="AUTO-GENERATED CONTENT, DO NOT EDIT DIRECTLY!">

# @sheetbase/server-scripts

**Scripts for Sheetbase server modules and apps.**

</section>

<section id="header">

[![Build Status](https://travis-ci.com/sheetbase/server-scripts.svg?branch=master)](https://travis-ci.com/sheetbase/server-scripts) [![Coverage Status](https://coveralls.io/repos/github/sheetbase/server-scripts/badge.svg?branch=master)](https://coveralls.io/github/sheetbase/server-scripts?branch=master) [![NPM](https://img.shields.io/npm/v/@sheetbase/server-scripts.svg)](https://www.npmjs.com/package/@sheetbase/server-scripts) [![License][license_badge]][license_url] [![Support me on Patreon][patreon_badge]][patreon_url] [![PayPal][paypal_donate_badge]][paypal_donate_url] [![Ask me anything][ask_me_badge]][ask_me_url]

[license_badge]: https://img.shields.io/github/license/mashape/apistatus.svg
[license_url]: https://github.com/sheetbase/server-scripts/blob/master/LICENSE
[patreon_badge]: https://lamnhan.github.io/assets/images/badges/patreon.svg
[patreon_url]: https://www.patreon.com/lamnhan
[paypal_donate_badge]: https://lamnhan.github.io/assets/images/badges/paypal_donate.svg
[paypal_donate_url]: https://www.paypal.me/lamnhan
[ask_me_badge]: https://img.shields.io/badge/ask/me-anything-1abc9c.svg
[ask_me_url]: https://m.me/sheetbase

</section>

<section id="tocx" data-note="AUTO-GENERATED CONTENT, DO NOT EDIT DIRECTLY!">

- [Install](#install)
  - [Global](#global)
  - [Local](#local)
- [Ayedocs plugins](#ayedocs-plugins)
  - [Sheetbase template](#sheetbase-template)
  - [Sheetbase installation template](#sheetbase-installation-template)
  - [Sheetbase routing template](#sheetbase-routing-template)
- [Command overview](#command-overview)
- [Command reference](#command-reference)
  - [`build`](#command-build)
  - [`deploy`](#command-deploy)
  - [`help`](#command-help)
- [Detail API reference](https://sheetbase.github.io/server-scripts)


</section>

<section id="installation">

## Install

### Global

`$ npm install -g @sheetbase/server-scripts`

Command: `sheetbase-server-scripts`

### Local

`$ npm install --save-dev @sheetbase/server-scripts`

Add these lines to the project `package.json`.

```json
{
  "scripts": {
    "build": "sheetbase-server-scripts build"
  }
}
```

</section>

<section id="ayedocs-plugins">

## Ayedocs plugins

This package provides Ayedocs templates and converts for conviniently document generation for Sheetbase server modules.

### Sheetbase template

Included all sections:

- Installation
- Options
- Main properties & methods
- Routing

```js
const sheetbaseTemplate = require("@sheetbase/server-scripts/ayedocs-plugins/sheetbase.template");

module.exports = {
  fileRender: {
    "sheetbase.md": sheetbaseTemplate(),
    "sheetbase-full.md": sheetbaseTemplate(true),
  },
};
```

### Sheetbase installation template

Common installation & basic usage section.

```js
const sheetbaseInstallationTemplate = require("@sheetbase/server-scripts/ayedocs-plugins/sheetbase-installation.template");

module.exports = {
  fileRender: {
    "sheetbase-installation.md": sheetbaseInstallationTemplate(),
    "sheetbase-installation-full.md": sheetbaseInstallationTemplate(true),
  },
};
```

### Sheetbase routing template

Showing **endpoint**, **default disabled routes**, **routing errors** and **the list of routes**.

```js
const sheetbaseRoutingTemplate = require("@sheetbase/server-scripts/ayedocs-plugins/sheetbase-routing.template");

module.exports = {
  fileRender: {
    "sheetbase-routing.md": sheetbaseRoutingTemplate(),
    "sheetbase-routing-full.md": sheetbaseRoutingTemplate(true),
  },
};
```

</section>

<section id="cli" data-note="AUTO-GENERATED CONTENT, DO NOT EDIT DIRECTLY!">

<h2><a name="command-overview"><p>Command overview</p>
</a></h2>

Scripts for Sheetbase server modules and apps.

- [`sheetbase-server-scripts build`](#command-build)
- [`sheetbase-server-scripts deploy --dry-run --copy [value] --vendor [value]`](#command-deploy)
- [`sheetbase-server-scripts help`](#command-help)

<h2><a name="command-reference"><p>Command reference</p>
</a></h2>

<h3><a name="command-build"><p><code>build</code></p>
</a></h3>

Build distribution package.

<h3><a name="command-deploy"><p><code>deploy</code></p>
</a></h3>

Push to the Apps Script server.

**Options**

- `-d, --dry-run`: Staging only.
- `--copy [value]`: Copied resources, comma-seperated.
- `--vendor [value]`: Files for @vendor.js, comma-seperated.

<h3><a name="command-help"><p><code>help</code></p>
</a></h3>

Display help.

</section>

<section id="license" data-note="AUTO-GENERATED CONTENT, DO NOT EDIT DIRECTLY!">

## License

**@sheetbase/server-scripts** is released under the [MIT](https://github.com/sheetbase/server-scripts/blob/master/LICENSE) license.

</section>

<section id="attr">

---

⚡️ This document is generated automatically using [@lamnhan/ayedocs](https://github.com/lamnhan/ayedocs).

</section>

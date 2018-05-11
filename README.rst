#######
LTD 404
#######

.. image:: https://img.shields.io/travis/lsst-sqre/ltd-404.svg
   :alt: Travis build status

**Error page for LSST the Docs, served at the edge by the Fastly CDN.**

This page is shown by the Fastly_ CDN when a user requests a page that doesn't exist on the backend (S3).

Getting started with development
================================

Get the repo::

   git clone https://github.com/lsst-sqre/ltd-404
   cd ltd-404

Install JavaScript dependencies::

   npm install -g gulp-cli
   npm install

Compile the page and start a development server with Browsersync_::

   gulp

This default Gulp_ task watches for changes to the HTML, CSS, and JavaScript, recompiles the page, and reloads the browser as necessary.
You'll want to leave a terminal running this Gulp_ task while you develop the site to see you changes rendered live.

When you're ready to deploy, follow the steps in `deployment <#deployment>`__.

.. _codebase:

Codebase orientation
====================

There are three files you'll edit to make 404 page:

- ``404.html``. This is rendered into ``_build/404.html``, with all CSS and JavaScript inlined.
- ``styles.scss``. This Sass file is rendered into ``styles.css``.
- ``app.js``. The JavaScript is developed in ES6, and compiled into ES5 as the file ``app.bundle.js``.
  The role of this JavaScript is primarily to look at the current URL (using the ``location`` API) and suggest other URLs lower down in the tree (like the site's homepage, or the ``/v/`` version dashboard of LSST the Docs sites).

.. _gulp-commands:

Gulp commands
=============

This project uses Gulp_ to run its build pipelines.
This section describes the gulp commands you can run.

gulp
----

Use this default command for development.
It does the following:

- `js <#gulp-js>`__ (compile JavaScript)
- `sass <#gulp-sass>`__ (compile Sass)
- `watch <#gulp-watch>`__ (run Browsersync_ and reload whenever the files change)

.. _gulp-build:

gulp build
----------

Compile the fully-packaged 404 page for deployment on Fastly.
See: `deployment <#deployment>`__.

.. _gulp-sass:

gulp sass
---------

Compile Sass into CSS (``styles.css``).
We use the following features

- Compile Sass.
- Add prefixes to CSS using Autoprefixer_ (via PostCSS_).
- Clean and compress the CSS using gulp-clean-css.

You can run this task alone, but usually through either ``gulp`` or ``gulp build``.

.. _gulp-js:

gulp js
-------

Packages the JavaScript with Webpack_ into ``app.bundle.js``.
Most importantly, Webpack_ runs Babel_ to compile the ES6 JavaScript into ES5 that most browsers can run.
The ``webpack.config.js`` describes how Webpack_ and Babel_ are set up.

You can run this task alone, but usually through either ``gulp`` or ``gulp build``.

gulp html
---------

This task creates the production-ready HTML by inlining all assets into the page.
It uses gulp-inline-source to do this.

Normally you'll never run this task on its own, but instead through ``gulp build``.
Inlining isn't part of the development working with the default ``gulp`` command.

.. _gulp-watch:

gulp watch
----------

This command does two things:

1. Starts up Browsersync_ to server your page locally and to trigger page reloads.
2. Watches for changes to HTML, JavaScript, and CSS and triggers a recompile and browser reload.

Normally you'll only run this command via the default ``gulp`` task.

By default, Browsersync_ serves your page at https://localhost:3000/.

.. _gulp-pretty:

gulp pretty
-----------

Automatically format code.
See `Code style via Prettier <#code-style>`__.

.. _gulp-lint:

gulp lint
---------

Lint the code for errors and style.
See `Code linting via ESLint <code-lint>`__.

.. _deployment:

Deployment
==========

You need to install the 404 page directly on the Fastly CDN.
It isn't deployed from AWS S3 like most LSST the Docs front-end content.

1. Build the page for production::

      gulp build --env prod

   The output is in ``_build/404.html``.

1. `Log into <https://manage.fastly.com/services/all>`_ the ``lsst-the-docs`` service page on Fastly.

2. Clone the current configuration.

3. Copy the ``_build/404.html`` page's content and paste it into the ``404 Response`` response (under ``Content`` → ``Responses``).

4. Activate the new configuration.

*Background:* `Creating error pages with custom responses <https://docs.fastly.com/guides/basic-configuration/creating-error-pages-with-custom-responses.html>`_ (Fastly docs).

.. _code-style:

Code style via Prettier
=======================

This project uses Prettier_ to make sure the Sass and JavaScript are formatted as you'd expect.
Like most projects, we use Prettier_ nearly as-is.
A couple minor exceptions are configured in ``.prettierrc.yaml``.

You can run Prettier_ two ways:

1. Manually, by running `gulp pretty <gulp-pretty>`__.
2. Automatically, by committing code.
   This is configured as a pre-commit hook in ``package.json``.

Note that `Prettier's`_ pre-commit hook and chunked git commits don't mix.
You'll want to manually run Prettier_ before committing a subset of the changed lines in your files.

.. _code-lint:

Code linting via ESLint
=======================

We use ESLint_ as a first line of defense for JavaScript code quality.
You can run ESLint_ via::

   gulp lint

Linting is also done via Travis CI (see ``.travis.yml``).

ESLint_ is configured through ``.eslintrc.json``.

License
=======

LTD 404 is open source software made by the `Large Synoptic Survey Telescope <https://www.lsst.org>`_.
See the included `LICENSE <LICENSE>`_ file for details.

.. _`Prettier's`:
.. _Prettier: https://prettier.io
.. _Browsersync: https://www.browsersync.io
.. _Gulp: https://gulpjs.com
.. _Webpack: https://webpack.js.org
.. _Babel: http://babeljs.io
.. _ESLint: https://eslint.org
.. _Autoprefixer: https://github.com/postcss/autoprefixer/
.. _PostCSS: https://postcss.org
.. _gulp-clean-css: https://www.npmjs.com/package/gulp-clean-css
.. _Fastly: https://www.fastly.com

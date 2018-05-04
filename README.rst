#######
LTD 404
#######

**Error page for LSST the Docs, served at the edge by the Fastly CDN.**

This page is shown by the Fastly CDN when a user requests a page that doesn't exist on the backend (S3).

Deployment
==========

You need to install the 404 page directly on the Fastly CDN.
It isn't deployed from AWS S3 like most LSST the Docs front-end content.

1. `Log into <https://manage.fastly.com/services/all>`_ the ``lsst-the-docs`` service page on Fastly.

2. Clone the current configuration.

3. Copy the ``404.html`` page and past it into the ``404 Response`` response (under ``Content`` → ``Responses``).

4. Activate the new configuration.

*Background:* `Creating error pages with custom responses <https://docs.fastly.com/guides/basic-configuration/creating-error-pages-with-custom-responses.html>`_ (Fastly docs).

License
=======

LTD 404 is open source software made by the Large Synoptic Survey Telescope.
See the included `LICENSE <LICENSE>`_ file for details.

/* eslint-disable react/no-danger */
import React, { Fragment } from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />));
    const styleTags = sheet.getStyleElement();
    return {
      ...page,
      styleTags
    };
  }

  render() {
    return (
      <html>
        <Head>
          {this.props.styleTags}
          <title>Everfit - Coding test</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content="Coding test" />
          <meta charSet="utf-8" />
          <link rel="shortcut icon" type="image/x-icon" href="/static/favicon.ico" />
          <link rel="stylesheet" href="/static/css/global.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <div id="root-modal" />
        </body>
      </html>
    );
  }
}

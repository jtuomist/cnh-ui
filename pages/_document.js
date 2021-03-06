import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
// Import styled components ServerStyleSheet
import { ServerStyleSheet } from 'styled-components';
import Manifest from 'next-manifest/manifest';


export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    // Step 1: Create an instance of ServerStyleSheet
    const sheet = new ServerStyleSheet();

    // Step 2: Retrieve styles from components in the page
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />));

    // Step 3: Extract the styles as <style> tags
    const styleTags = sheet.getStyleElement();

    // Step 4: Pass styleTags as a prop
    return { ...page, styleTags };
  }

  render() {
    return (
      <html lang="fi">
        <Head>
          {this.props.styleTags}
          <Manifest />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script src="https://cdn.plot.ly/plotly-latest.min.js" />
        </body>
      </html>
    );
  }
}

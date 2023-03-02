<!DOCTYPE html>
<html
  lang="en"
  xmlns="http://www.w3.org/1999/xhtml"
  xmlns:o="urn:schemas-microsoft-com:office:office"
>
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="x-apple-disable-message-reformatting" />
    <title></title>

    <!-- What it does: Makes background images in 72ppi Outlook render at correct size. -->
    <!--[if mso]>
      <noscript>
        <xml>
          <o:OfficeDocumentSettings>
            <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
        </xml>
      </noscript>
    <![endif]-->
    <style>
      html,
      body {
        margin: 0 auto !important;
        padding: 0 !important;
        height: 100% !important;
        width: 100% !important;
      }

      /* What it does: Stops email clients resizing small text. */
      * {
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
      }

      /* What it does: Centers email on Android 4.4 */
      div[style*="margin: 16px 0"] {
        margin: 0 !important;
      }

      /* What it does: forces Samsung Android mail clients to use the entire viewport */
      #MessageViewBody,
      #MessageWebViewDiv {
        width: 100% !important;
      }

      /* What it does: Stops Outlook from adding extra spacing to tables. */
      table,
      td {
        mso-table-lspace: 0pt !important;
        mso-table-rspace: 0pt !important;
      }

      /* What it does: Replaces default bold style. */
      th {
        font-weight: normal;
      }

      /* What it does: Fixes webkit padding issue. */
      table {
        border-spacing: 0 !important;
        border-collapse: collapse !important;
        table-layout: fixed !important;
        margin: 0 auto !important;
      }

      /* What it does: Prevents Windows 10 Mail from underlining links despite inline CSS. Styles for underlined links should be inline. */
      a {
        text-decoration: none;
      }

      /* What it does: Uses a better rendering method when resizing images in IE. */
      img {
        -ms-interpolation-mode: bicubic;
      }

      /* What it does: A work-around for email clients meddling in triggered links. */
      a[x-apple-data-detectors], /* iOS */
        .unstyle-auto-detected-links a,
        .aBn {
        border-bottom: 0 !important;
        cursor: default !important;
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
      }

      /* What it does: Prevents Gmail from changing the text color in conversation threads. */
      .im {
        color: inherit !important;
      }

      /* What it does: Prevents Gmail from displaying a download button on large, non-linked images. */
      .a6S {
        display: none !important;
        opacity: 0.01 !important;
      }

      /* If the above doesn't work, add a .g-img class to any image in question. */
      img.g-img + div {
        display: none !important;
      }

      /* What it does: Removes right gutter in Gmail iOS app: https://github.com/TedGoas/Cerberus/issues/89  */
      /* Create one of these media queries for each additional viewport size you'd like to fix */

      table,
      td,
      div,
      h1,
      p {
        font-family: Arial, sans-serif;
      }

      /* What it does: Uses a better rendering method when resizing images in IE. */
      img {
        -ms-interpolation-mode: bicubic;
      }

      /* table,
      td {
        border: 2px solid #000000 !important;
      } */

      @media only screen and (min-device-width: 320px) and (max-device-width: 414px) {
        .header__logo {
          width: 40% !important;
        }
      }
    </style>
  </head>

  <body style="margin: 0; padding: 0; background-color: #222222">
    <table
      role="presentation"
      style="
        width: 100%;
        border-collapse: collapse;
        border: 0;
        border-spacing: 0;
        background: #ffffff;
        mso-line-height-rule: exactly;
      "
    >
      <tr>
        <td
          class="h-wrapper"
          style='
            background-image: url("https://adashi-backend.tm30.net/assets/images/img/header-bg.png");
            background-repeat: no-repeat;
            background-size: cover;
            width: 100%;
            height: -webkit-fill-available;
            height: -moz-available;
            padding: 20px 10px;
          '
        >
          <!--[if gte mso 9]>
          <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width: 100%;
            height: -webkit-fill-available;">
          <v:fill type="tile" src="./assets/img/header-bg.png" />
          <v:textbox inset="0,0,0,0">
          <![endif]-->
          <table
            role="presentation"
            style="
              width: 100%;
              border-collapse: collapse;
              border: 0;
              border-spacing: 0;
            "
          >
            <tr>
              <td style="padding: 0" align="center">
                <img
                src="./assets/img/logo2 1.png"
                  alt="adashi logo"
                  width="120"
                  style="height: 120px; display: block"
                />
              </td>
            </tr>
            <tr>
              <td style="padding: 0" align="center">
                <h1
                  class="h-text"
                  style="
                    margin: 15px 0;
                    font-weight: bold;
                    font-size: 28px;
                    color: #ffffff;
                  "
                >
                  Adashi Esusu Akawo
                </h1>
              </td>
            </tr>
            <tr>
              <td style="padding: 0">
                <table
                  role="presentation"
                  style="
                    width: 400;
                    min-width: 300px;
                    border-collapse: collapse;
                    border: 0;
                    border-spacing: 0;
                  "
                  align="center"
                >
                  <tr style="color: #ffffff">
                    <td
                      style="
                        padding: 5px 0;
                        width: 100px;
                        border-right: 2px solid #ffffff;
                      "
                      align="left"
                    >
                      <img
                      src="./assets/img/rent.png"
                        width="25"
                        style="height: 23px; margin-right: 5px"
                        alt="rent"
                      />
                      Rent
                    </td>
                    <td
                      style="
                        padding: 0;
                        width: 120px;
                        border-right: 2px solid #ffffff;
                      "
                      align="center"
                      justify="center"
                    >
                      <img
                      src="./assets/img/vacation.png"
                        width="25"
                        style="height: 23px; margin-right: 10px"
                        alt="rent"
                      />
                      Vacation
                    </td>
                    <td
                      style="padding: 0; width: 100px"
                      align="right"
                      justify="center"
                    >
                      <img
                      src="./assets/img/medical.png"
                        width="22"
                        style="height: 25px; margin-right: 5px"
                        alt="rent"
                      />
                      Medical
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
          <!--[if gte mso 9]>
        </v:textbox>
      </v:rect>
      <![endif]-->
        </td>
      </tr>
      <tr>
        <td style="padding: 20px">
          <table
            role="presentation"
            style="
              width: 100%;
              border-collapse: collapse;
              border: 0;
              border-spacing: 0;
            "
          >
            <tr>
              <td style="padding: 10px">
                <table
                  role="presentation"
                  style="
                    width: 100%;
                    border-collapse: collapse;
                    border: 0;
                    border-spacing: 0;
                  "
                >
                  <tr>
                    <td style="padding: 0; padding-top: 20px">Hi Tomiwa,</td>
                  </tr>
                  <tr>
                    <td style="padding: 20px 0">
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Explicabo aspernatur velit magni nihil enim reprehenderit
                      dolore a accusamus amet mollitia consequatur veniam
                      reiciendis in eum dolor eligendi, pariatur ullam
                      molestias. Nulla reprehenderit perferendis quos suscipit
                      ab consectetur soluta hic commodi veniam et doloremque
                      quibusdam repudiandae, porro ducimus aut reiciendis, harum
                      a itaque beatae, minima optio magnam accusantium odit!
                      Minima, labore. Animi repudiandae ratione minima
                      veritatis, corrupti eligendi iure temporibus ipsam! .
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 0">
                      <p style="padding: 0; margin: 0">Cheers,</p>
                      <p style="padding: 0; margin: 10px 0">Team Adashi.</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 0">
                      <hr style="border: 1px dashed #000000" />
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 0.5rem 0">
                      <a
                        href="http://google.com"
                        target="_blank"
                        rel="noreferrer"
                        style="
                          background: #059157;
                          border-radius: 5px;
                          border: none;
                          color: #ffffff;
                          display: block;
                          width: 190px;
                          padding: 10px 0 10px 10px;
                          cursor: pointer;
                          text-decoration: none;
                          color: #ffffff;
                          margin: 0 auto;
                        "
                      >
                        <p style="margin: 0 0 0 2px" align="center">
                          Click here to get started
                        </p>
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>

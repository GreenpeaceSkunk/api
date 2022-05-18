import { createGlobalStyle, DefaultTheme } from "styled-components";
import { fontPrimaryBold, fontPrimaryLight, fontPrimaryMedium, fontPrimaryRegular, fontSecondaryRegular } from "./constants";

import NunitoLightFont from '../fonts/Nunito/Nunito-Light.ttf';
import NunitoRegularFont from '../fonts/Nunito/Nunito-Regular.ttf';
import NunitoBoldFont from '../fonts/Nunito/Nunito-Bold.ttf';
import NunitoMediumFont from '../fonts/Nunito/Nunito-Medium.ttf';

export const GlobalStyle = createGlobalStyle<DefaultTheme>`  
  @font-face {
    font-family: ${fontPrimaryLight};
    src: url(${NunitoLightFont});
  }

  @font-face {
    font-family: ${fontPrimaryRegular};
    src: url(${NunitoRegularFont});
  }

  @font-face {
    font-family: ${fontPrimaryMedium};
    src: url(${NunitoMediumFont});
  }
  
  
  @font-face {
    font-family: ${fontPrimaryBold};
    src: url(${NunitoBoldFont});
  }

  body {
    padding: 0;
    margin: 0;
    font-family: ${fontPrimaryRegular};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  a {
    text-decoration: none;
    color: black;
  }

  ul {
    list-style-type: none;
  }
`;

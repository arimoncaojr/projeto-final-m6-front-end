import "react-toastify/dist/ReactToastify.css";
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
     :root{
          --color-brand-1: #4529E6;
          --color-brand-2: #5126EA;
          --color-brand-3: #B0A6F0;
          --color-brand-4: #EDEAFD;

          --gray-0 : #0b0d0d;
          --gray-1 : #212529;
          --gray-2 : #495057;
          --gray-3 : #868e96;
          --gray-4 : #adb5bd;
          --gray-5 : #ced4da;
          --gray-6 : #dee2e6;
          --gray-7 : #e9ecef;
          --gray-8 : #f1f3f5;
          --gray-9 : #f8f9fa;
          --gray-10: #fdfdfd;
          --whiteFixed: #FFFFFF;

          --color-alert-1: #CD2B31;
          --color-alert-2: #FDD8D8;
          --color-alert-3: #FFE5E5;

          --color-sucess-1: #18794E;
          --color-sucess-2: #CCEBD7;
          --color-sucess-3: #DDF3E4;

          --color-random-1 : #E34D8C;
          --color-random-2 : #C04277;
          --color-random-3 : #7D2A4D;
          --color-random-4 : #7000FF;
          --color-random-5 : #6200E3;
          --color-random-6 : #36007D;
          --color-random-7 : #349974;
          --color-random-8 : #2A7D5F;
          --color-random-9 : #153D2E;
          --color-random-10: #6100FF;
          --color-random-11: #5700E3;
          --color-random-12: #30007D;

          /* config fonts */
          --font-heading: 'Lexend', sans-serif;;
          --font-text: 'Inter', sans-serif;
        
          --font-heading-1 : 700 44px var(--font-heading);
          --font-heading-2 : 600 36px var(--font-heading);
          --font-heading-3 : 600 32px var(--font-heading);
          --font-heading-4 : 500 32px var(--font-heading);
          --font-heading-5 : 600 28px var(--font-heading);
          --font-heading-6 : 500 28px var(--font-heading);
          --font-heading-7 : 600 24px var(--font-heading);
          --font-heading-8 : 500 24px var(--font-heading);
          --font-heading-9 : 600 20px var(--font-heading);
          --font-heading-10: 500 20px var(--font-heading);
          --font-heading-11: 600 16px var(--font-heading);
          --font-heading-12: 500 16px var(--font-heading);

          --font-body-1: 600 16px var(--font-text);
          --font-body-2: 400 16px var(--font-text);
          --font-body-3: 500 14px var(--font-text);
          --font-body-4: 400 14px var(--font-text);

          --font-btn-big:600 16px var(--font-text);
          --font-btn-medium: 600 14px var(--font-text);

          --font-placeholder: 400 16px var(--font-text);
          --font-label: 500 14px var(--font-text);
     }

     .container {
          width: 100%;
          max-width: 1600px;
          margin: 0 auto;
     }

`;

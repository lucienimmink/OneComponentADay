import {css} from 'lit-element';

export const balloonStyles = css`
    .clippy-content {
        max-width: 200px;
        min-width: 120px;
        font-family: 'Microsoft Sans', sans-serif;
        font-size: 10pt;
    }
    .clippy-balloon {
        background: #ffc;
        border: 1px solid #a7a7a7;
        -webkit-border-radius: 4px;
        border-radius: 4px;
        -webkit-box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.2);
        box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.2);
        margin: 0 auto 20px;
        max-width: 200px;
        padding: 8px;
        position: relative;
    }

    .clippy-tip {
        border-left: 21px solid transparent;
        border-top: 20px solid rgba(0, 0, 0, 0.2);
        bottom: -25px;
        position: absolute;
        right: 85px;
    }
    .clippy-tip::before {
        border-left: 23px solid transparent;
        border-top: 23px solid #a7a7a7;
        bottom: 2px;
        content: '';
        position: absolute;
        right: 5px;
    }
    .clippy-tip::after {
        border-left: 21px solid transparent;
        border-top: 21px solid #ffc;
        bottom: 4px;
        content: '';
        position: absolute;
        right: 6px;
    }
`;

import {css} from 'lit-element';

export const agentStyles = css`
    .agent {
        pointer-events: all;
        flex-grow: 1;
    }
    .agent-container {
        z-index: 999999;
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    #Clippy {
        background: url('https://raw.githubusercontent.com/Towmeykaw/clippy-web-component/main/agents/Clippy/clippy.png');
    }
    #Merlin {
        background: url('https://raw.githubusercontent.com/Towmeykaw/clippy-web-component/main/agents/Merlin/merlin.png');
    }
    #Bonzi {
        background: url('https://raw.githubusercontent.com/Towmeykaw/clippy-web-component/main/agents/Bonzi/bonzi.png');
    }
    #F1 {
        background: url('https://raw.githubusercontent.com/Towmeykaw/clippy-web-component/main/agents/F1/f1.png');
    }
    #Genie {
        background: url('https://raw.githubusercontent.com/Towmeykaw/clippy-web-component/main/agents/Genie/genie.png');
    }
    #Genius {
        background: url('https://raw.githubusercontent.com/Towmeykaw/clippy-web-component/main/agents/Genius/genius.png');
    }
    #Links {
        background: url('https://raw.githubusercontent.com/Towmeykaw/clippy-web-component/main/agents/Links/links.png');
    }
    #Peedy {
        background: url('https://raw.githubusercontent.com/Towmeykaw/clippy-web-component/main/agents/Peedy/peedy.png');
    }
    #Rocky {
        background: url('https://raw.githubusercontent.com/Towmeykaw/clippy-web-component/main/agents/Rocky/rocky.png');
    }
    #Rover {
        background: url('https://raw.githubusercontent.com/Towmeykaw/clippy-web-component/main/agents/Rover/rover.png');
    }
`;

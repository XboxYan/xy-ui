export default class XyButton extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
        <style>
        :host{ display:inline-block; line-height: 2; font-size: 14px; background: dodgerblue; color: #fff;  border-radius: 3px; }
        :host([disabled]){ pointer-events:none; opacity:.8; }
        .btn{ position: relative; padding:0 .8em; transition: .3s; user-select: none; text-align: center; }
        .btn>label{ position: absolute; left: 0; top: 0; width: 100%; height: 100%; overflow:hidden; cursor: pointer; }
        .btn>label:after{ content: ''; position: absolute; background: transparent; border-radius:50%; width: 100%; padding-top: 100%; margin-left: -50%; margin-top: -50%; left: var(--x,-100%); top: var(--y,-100%); background:#fff; opacity:.3 }
        .btn>input[type=checkbox]{ position:absolute; clip:rect(0,0,0,0)}
        .btn>input[type=checkbox]+label:after{animation: ripple-in .5s forwards;}
        .btn>input[type=checkbox]:checked+label:after{animation: ripple-out .5s forwards;}
        @keyframes ripple-in{
            0% {
                transform: scale(0);
                opacity:.3;
            }
            70% {
                transform: scale(1.5);
                opacity:.1;
            }
            100% {
                transform: scale(2);
                opacity:0;
            }
        }
        @keyframes ripple-out{
            0% {
                transform: scale(0);
                opacity:.3;
            }
            70% {
                transform: scale(1.5);
                opacity:.1;
            }
            100% {
                transform: scale(2);
                opacity:0;
            }
        }
        </style>
        <div class="btn"><input type="checkbox" id="checkbox"><label for="checkbox" id="label"></label><slot></slot></div>
        `
    } 
    
    connectedCallback() {
        this.shadowRoot.getElementById('label').addEventListener('click',function(ev){
            ev.stopPropagation();
            const { offsetX, offsetY } = ev;
            this.style.setProperty('--x',offsetX+'px');
            this.style.setProperty('--y',offsetY+'px');
        })
    }
}

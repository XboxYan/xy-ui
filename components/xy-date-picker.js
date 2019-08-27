import './xy-button.js';
import './xy-popover.js';
import { HSVaColor } from '../utils/hsvacolor.js';

class XyDatePane extends HTMLElement {

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
        <style>
            :host{
                display: block;
            }
            .date-pane{
                padding:10px;
            }
            .date-head,.date-week{
                display:flex;
            }
            .date-switch{
                flex:1;
            }
            xy-button {
                padding: 1px;
                font-size: inherit;
                box-sizing: content-box;
            }
            .icon{
                width:1em;
                height:1em;
                fill: currentColor; 
            }
            .prev,.next{
                width: 2.3em;
                height: 2.3em;
            }
            .date-switch{
                margin: 0 .3em;
            }
            .date-week-item{
                flex:1;
                height: 2.3em;
                line-height: 2.3;
                text-align:center;
            }
            .date-body{
                display:grid;
                grid-template-columns: repeat(7, 1fr);
                grid-template-rows: repeat(6, 1fr);
                grid-gap:.3em;
            }
            .date-day-item{
                min-width: 2.3em;
                height: 2.3em;
                justify-self: center;
            }
            .date-day-item[other]{
                opacity:.6;
            }
        </style>
        <div class="date-pane" id="date-pane">
            <div class="date-head">
                <xy-button type="flat" class="prev">
                    <svg class="icon" viewBox="0 0 1024 1024"><path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8c-16.4 12.8-16.4 37.5 0 50.3l450.8 352.1c5.3 4.1 12.9 0.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path></svg>
                </xy-button>
                <xy-button type="flat" class="date-switch">
                    2019-08
                </xy-button>
                <xy-button type="flat" class="next">
                    <svg class="icon" viewBox="0 0 1024 1024"><path d="M765.7 486.8L314.9 134.7c-5.3-4.1-12.9-0.4-12.9 6.3v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1c16.4-12.8 16.4-37.6 0-50.4z"></path></svg>
                </xy-button>
            </div>
            <div class="date-week">
                <span class="date-week-item">日</span>
                <span class="date-week-item">一</span>
                <span class="date-week-item">二</span>
                <span class="date-week-item">三</span>
                <span class="date-week-item">四</span>
                <span class="date-week-item">五</span>
                <span class="date-week-item">六</span>
            </div>
            <div class="date-body">
                <xy-button class="date-day-item" type="flat"></xy-button>
                <xy-button class="date-day-item" type="flat"></xy-button>
                <xy-button class="date-day-item" type="flat"></xy-button>
                <xy-button class="date-day-item" type="flat"></xy-button>
                <xy-button class="date-day-item" type="flat"></xy-button>
                <xy-button class="date-day-item" type="flat"></xy-button>
                <xy-button class="date-day-item" type="flat"></xy-button>
                <xy-button class="date-day-item" type="flat"></xy-button>
                <xy-button class="date-day-item" type="flat"></xy-button>
                <xy-button class="date-day-item" type="flat"></xy-button>
                <xy-button class="date-day-item" type="flat"></xy-button>
                <xy-button class="date-day-item" type="flat"></xy-button>
                <xy-button class="date-day-item" type="flat"></xy-button>
                <xy-button class="date-day-item" type="flat"></xy-button>
                <xy-button class="date-day-item" type="flat"></xy-button>
                <xy-button class="date-day-item" type="flat"></xy-button>
                <xy-button class="date-day-item" type="flat"></xy-button>
                <xy-button class="date-day-item" type="flat"></xy-button>
                <xy-button class="date-day-item" type="flat"></xy-button>
                <xy-button class="date-day-item" type="flat"></xy-button>
                <xy-button class="date-day-item" type="flat"></xy-button>
                <xy-button class="date-day-item" type="flat"></xy-button>
                <xy-button class="date-day-item" type="flat"></xy-button>
                <xy-button class="date-day-item" type="flat"></xy-button>
                <xy-button class="date-day-item" type="flat"></xy-button>
                <xy-button class="date-day-item" type="flat"></xy-button>
                <xy-button class="date-day-item" type="flat"></xy-button>
                <xy-button class="date-day-item" type="flat"></xy-button>
                <xy-button class="date-day-item" type="flat"></xy-button>
                <xy-button class="date-day-item" type="flat"></xy-button>
                <xy-button class="date-day-item" type="flat"></xy-button>
                <xy-button class="date-day-item" type="flat"></xy-button>
                <xy-button class="date-day-item" type="flat"></xy-button>
                <xy-button class="date-day-item" type="flat"></xy-button>
                <xy-button class="date-day-item" type="flat"></xy-button>
                <xy-button class="date-day-item" type="flat"></xy-button>
                <xy-button class="date-day-item" type="flat"></xy-button>
                <xy-button class="date-day-item" type="flat"></xy-button>
                <xy-button class="date-day-item" type="flat"></xy-button>
                <xy-button class="date-day-item" type="flat"></xy-button>
                <xy-button class="date-day-item" type="flat"></xy-button>
                <xy-button class="date-day-item" type="flat"></xy-button>
            </div>
        </div>
        `
    }

    get defaultvalue() {
        return this.getAttribute('defaultvalue')||new Date;
    }

    set defaultvalue(value){
        this.setAttribute('defaultvalue', value);
    }

    getDays(year,month){
        const lastdays = new Date(year,month,0).getDate();
        const days = new Date(year,month+1,0).getDate();
        const week = new Date(year,month,1).getDay();
        const prev = new Array(week).fill().map((el,i)=>year+'-'+month+'-'+(lastdays+i-week+1));
        const current = new Array(days).fill().map((el,i)=>year+'-'+(month+1)+'-'+(i+1));
        if(month+2>12){
            month=1;
            year++;
        }else{
            month=month+2;
        }
        const next = new Array(42 - days - week).fill().map((el,i)=>year+'-'+month+'-'+(i+1));
        return [...prev,...current,...next];
    }

    toDate(d){
        const date = new Date(d);
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        return [year,month,day];
    }

    render(date){
        const [year,month,day] = this.toDate(date);
        const days = this.getDays(year,month);
        this.switch.textContent = year + '年' + (month+1) + '月';
        this.days.forEach((el,i)=>{
            el.textContent = days[i].split('-')[2];
            el.dataset.date = days[i];
            if(days[i].split('-')[1]!=month+1){
                el.setAttribute("other","");
            }else{
                el.removeAttribute("other");
            }
        })
    }

    connectedCallback() {
        this.datePane = this.shadowRoot.getElementById('date-pane');
        this.prev = this.datePane.querySelector('.prev');
        this.next = this.datePane.querySelector('.next');
        this.switch = this.datePane.querySelector('.date-switch');
        this.dateBody = this.datePane.querySelector('.date-body');
        this.days = this.dateBody.querySelectorAll('xy-button');
        this.$value = this.defaultvalue;
        this.render(this.$value);
        this.prev.addEventListener('click',()=>{
            let [year,month,day] = this.toDate(this.$value);
            this.value = new Date(year,month-1,day);
        })
        this.next.addEventListener('click',()=>{
            let [year,month,day] = this.toDate(this.$value);
            this.value = new Date(year,month+1,day);
        })
        this.init = true;
    }

    get value() {
        return new Date(this.$value);
    }

    set value(value) {
        //'2019-1-1'
        this.$value = value;
        this.render(value)
    }

}

customElements.define('xy-date-pane', XyDatePane);

export default class XyDatePicker extends HTMLElement {

    static get observedAttributes() { return ['disabled','dir'] }

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });

        shadowRoot.innerHTML = `
        <style>
        :host{
            display:inline-block;
            font-size: 14px;
        }
        :host([block]){
            display:block;
        }
        
        :host(:focus-within) xy-popover,:host(:hover) xy-popover{ 
            z-index: 2;
        }
        xy-popover{
            width:100%;
            height:100%;
        }
        #select{
            display:flex;
            width:100%;
            height:100%;
            font-size: inherit;
        }
        #select span{
            flex:1;
            text-align:left;
        }
        .icon{
            position:relative;
            margin-left:.5em;
            pointer-events:none;
            width:1em;
            height:1em;
            fill:currentColor;
        }
        xy-popover{
            display:block;
        }
        xy-popcon{
            min-width:100%;
        }
        .pop-footer{
            display:flex;
            justify-content:flex-end;
            padding:0 10px 10px;
        }
        .pop-footer xy-button{
            font-size: .8em;
            margin-left: .8em;
        }
        </style>
        <xy-popover id="popover" ${this.dir? "dir='"+this.dir+"'" : ""}>
            <xy-button id="select" ${this.disabled? "disabled" : ""} ${this.type?("type="+this.type):""}><span id="datetxt">2019-10-10</span><svg class="icon" viewBox="0 0 1024 1024"><path d="M880 184H712v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H384v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H144c-17.7 0-32 14.3-32 32v664c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V216c0-17.7-14.3-32-32-32z m-40 656H184V460h656v380zM184 392V256h128v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h256v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h128v136H184z" p-id="8054"></path></svg></xy-button>
            <xy-popcon id="popcon">
                <xy-date-pane id="date-pane"></xy-date-pane>
                <div class="pop-footer">
                    <xy-button id="btn-cancel">取消</xy-button>
                    <xy-button type="primary" id="btn-submit">确认</xy-button>
                </div>
            </xy-popcon>
        </xy-popover>
        `
    }

    focus() {
        this.select.focus();
    }

    connectedCallback() {
        this.popover = this.shadowRoot.getElementById('popover');
        this.popcon = this.shadowRoot.getElementById('popcon');
        this.datePane = this.shadowRoot.getElementById('date-pane');
        this.select = this.shadowRoot.getElementById('select');
        this.datetxt = this.shadowRoot.getElementById('datetxt');
        this.btnCancel = this.shadowRoot.getElementById('btn-cancel');
        this.btnSubmit = this.shadowRoot.getElementById('btn-submit');
        this.select.addEventListener('click',()=>{
            
        })
        this.btnCancel.addEventListener('click',()=>{
            this.popcon.open = false;
        })
        this.btnSubmit.addEventListener('click',()=>{
            this.value = this.datePane.value;
            this.popcon.open = false;
        })
        this.value = this.defaultvalue;
        this.init = true;
    }

    

    get defaultvalue() {
        return this.getAttribute('defaultvalue')||'#42b983';
    }

    get value() {
        return this.$value;
    }

    get color() {
        return HSVaColor(...parseToHSVA(this.$value).values);
    }

    get type() {
        return this.getAttribute('type');
    }

    get disabled() {
        return this.getAttribute('disabled')!==null;
    }

    get dir() {
        return this.getAttribute('dir');
    }

    set dir(value){
        this.setAttribute('dir', value);
    }

    set disabled(value) {
        if (value === null || value === false) {
            this.removeAttribute('disabled');
        } else {
            this.setAttribute('disabled', '');
        }
    }

    set defaultvalue(value){
        this.setAttribute('defaultvalue', value);
    }

    set value(value) {
        this.$value = value;
        if(this.init){
            this.dispatchEvent(new CustomEvent('change', {
                detail: {
                    value: this.value,
                    color: this.color
                }
            }));
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name == 'disabled' && this.colorBtn) {
            if (newValue != null) {
                this.colorBtn.setAttribute('disabled', 'disabled');
            } else {
                this.colorBtn.removeAttribute('disabled');
            }
        }
        if (name == 'dir' && this.popover) {
            if (newValue != null) {
                this.popover.dir = newValue;
            }
        }
    }
}

if (!customElements.get('xy-date-picker')) {
    customElements.define('xy-date-picker', XyDatePicker);
}
import './xy-button.js';
import './xy-popover.js';
import { HSVaColor } from '../utils/hsvacolor.js';

const toDate = (d) => {
    const date = new Date(d);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    return [year,month,day];
}

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
                padding:.8em;
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
                line-height: 2.4;
                text-align:center;
            }
            /*
            .date-week::before{
                content:'';
                position:absolute;
                left:0;
                right:0;
                height:2.4em;
                background: var(--themeBackground,var(--themeColor,#42b983));
                opacity:.2;
            }
            */
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
            .date-day-item[today]{
                color:var(--themeColor,#42b983);
            }
            .date-day-item[current],
            .date-month-item[current],
            .date-year-item[current]{
                background: var(--themeBackground,var(--themeColor,#42b983));
                color:#fff;
            }
            .date-con{
                position:relative;
            }
            .date-month,.date-year{
                position:absolute;
                display:grid;
                left:0;
                top:.8em;
                right:0;
                bottom:0;
                grid-template-columns: repeat(3, 1fr);
                grid-template-rows: repeat(4, 1fr);
                grid-gap:.3em;
            }
            .date-month-item,
            .date-year-item{
                display:flex;
                margin:auto;
                width: 100%;
                height: 100%;
            }
            .date-model{
                opacity:0;
                visibility:hidden;
                z-index:-1;
                transition:.3s opacity,.3s visibility;
            }
            .date-con[data-type="day"] .date-day,
            .date-con[data-type="month"] .date-month,
            .date-con[data-type="year"] .date-year{
                opacity:1;
                visibility:visible;
                z-index:1;
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
            <div class="date-con" data-type="day">
                <div class="date-model date-day">
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
                <div class="date-model date-month">
                    <xy-button class="date-month-item" type="flat" data-month="1">一月</xy-button>
                    <xy-button class="date-month-item" type="flat" data-month="2">二月</xy-button>
                    <xy-button class="date-month-item" type="flat" data-month="3">三月</xy-button>
                    <xy-button class="date-month-item" type="flat" data-month="4">四月</xy-button>
                    <xy-button class="date-month-item" type="flat" data-month="5">五月</xy-button>
                    <xy-button class="date-month-item" type="flat" data-month="6">六月</xy-button>
                    <xy-button class="date-month-item" type="flat" data-month="7">七月</xy-button>
                    <xy-button class="date-month-item" type="flat" data-month="8">八月</xy-button>
                    <xy-button class="date-month-item" type="flat" data-month="9">九月</xy-button>
                    <xy-button class="date-month-item" type="flat" data-month="10">十月</xy-button>
                    <xy-button class="date-month-item" type="flat" data-month="11">十一月</xy-button>
                    <xy-button class="date-month-item" type="flat" data-month="12">十二月</xy-button>
                </div>
                <div class="date-model date-year">
                    <xy-button class="date-year-item" type="flat"></xy-button>
                    <xy-button class="date-year-item" type="flat"></xy-button>
                    <xy-button class="date-year-item" type="flat"></xy-button>
                    <xy-button class="date-year-item" type="flat"></xy-button>
                    <xy-button class="date-year-item" type="flat" current></xy-button>
                    <xy-button class="date-year-item" type="flat"></xy-button>
                    <xy-button class="date-year-item" type="flat"></xy-button>
                    <xy-button class="date-year-item" type="flat"></xy-button>
                    <xy-button class="date-year-item" type="flat"></xy-button>
                    <xy-button class="date-year-item" type="flat"></xy-button>
                    <xy-button class="date-year-item" type="flat"></xy-button>
                    <xy-button class="date-year-item" type="flat"></xy-button>
                </div>
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
        const prev = Array.from({length:week},(el,i)=>(month==0?year-1:year)+'-'+(month==0?12:month)+'-'+(lastdays+i-week+1));
        const current = Array.from({length:days},(el,i)=>year+'-'+(month+1)+'-'+(i+1));
        const next = Array.from({length:42 - days - week},(el,i)=>(month==11?year+1:year)+'-'+(month==11?1:month+2)+'-'+(i+1));
        return [...prev,...current,...next];
    }

    getYears(year){
        return [year-4,year-3,year-2,year-1,year,year+1,year+2,year+3,year+4,year+5,year+6,year+7]
    }

    render(date=this.$value){
        const [year,month,day] = toDate(date);
        switch (this.type) {
            case 'day':
                const days = this.getDays(year,month);
                const [n_year,n_month,n_day] = toDate(new Date);
                this.days.forEach((el,i)=>{
                    const [_year,_month,_day] = days[i].split('-');
                    el.dataset.date = days[i];
                    el.textContent = _day;
                    el.dataset.year = _year;
                    el.dataset.month = _month;
                    if(year+'-'+(month+1)+'-'+day==days[i]){
                        el.setAttribute("current","");
                    }else{
                        el.removeAttribute("current");
                    }
                    if(n_year+'-'+(n_month+1)+'-'+n_day==days[i]){
                        el.setAttribute("today","");
                    }else{
                        el.removeAttribute("today");
                    }
                    if(_month!=month+1){
                        el.setAttribute("other","");
                    }else{
                        el.removeAttribute("other");
                    }
                })
                this.switch.textContent = year + '年' + (month+1+'').padStart(2,0) + '月';
                this.switch.disabled = false;
                break;
            case 'month':
                this.months.forEach((el,i)=>{
                    if(el.dataset.month == month+1){
                        el.setAttribute("current","");
                    }else{
                        el.removeAttribute("current");
                    }
                })
                this.switch.textContent = year + '年';
                this.switch.disabled = false;
                break;
            case 'year':
                const years = this.getYears(year);
                this.years.forEach((el,i)=>{
                    el.textContent = years[i];
                    el.dataset.year = years[i];
                })
                this.switch.textContent = (year-4) + '年-'+(year+7) + '年';
                this.switch.disabled = true;
            default:
                break;
        }
    }

    connectedCallback() {
        this.datePane = this.shadowRoot.getElementById('date-pane');
        this.prev = this.datePane.querySelector('.prev');
        this.next = this.datePane.querySelector('.next');
        this.switch = this.datePane.querySelector('.date-switch');
        this.dateBody = this.datePane.querySelector('.date-body');
        this.dateCon = this.datePane.querySelector('.date-con');
        this.dateMonth = this.datePane.querySelector('.date-month');
        this.dateYear = this.datePane.querySelector('.date-year');
        this.days = this.dateBody.querySelectorAll('xy-button');
        this.months = this.dateMonth.querySelectorAll('xy-button');
        this.years = this.dateYear.querySelectorAll('xy-button');
        this.$value = this.defaultvalue;
        this.render(this.$value);
        this.prev.addEventListener('click',()=>{
            let [year,month,day] = toDate(this.$value);
            switch (this.type) {
                case 'day':
                    this.value = new Date(year,month-1,day);
                    break;
                case 'month':
                    this.value = new Date(year-1,month,day);
                    break;
                case 'year':
                    this.value = new Date(year-12,month,day);
                default:
                    break;
            }
            
        })
        this.next.addEventListener('click',()=>{
            let [year,month,day] = toDate(this.$value);
            switch (this.type) {
                case 'day':
                    this.value = new Date(year,month+1,day);
                    break;
                case 'month':
                    this.value = new Date(year+1,month,day);
                    break;
                case 'year':
                    this.value = new Date(year+12,month,day);
                default:
                    break;
            }
        })
        this.switch.addEventListener('click',()=>{
            switch (this.type) {
                case 'day':
                    this.type = 'month';
                    break;
                case 'month':
                    this.type = 'year';
                    break;
                default:
                    break;
            }
        })
        this.dateBody.addEventListener('click',(ev)=>{
            const item = ev.target.closest('xy-button');
            if(item){
                this.value = item.dataset.date;
            }
        })
        this.dateMonth.addEventListener('click',(ev)=>{
            const item = ev.target.closest('xy-button');
            let [year,month,day] = toDate(this.$value);
            if(item){
                this.type = 'day';
                this.value = year+'-'+item.dataset.month+'-'+day;
            }
        })
        this.dateYear.addEventListener('click',(ev)=>{
            const item = ev.target.closest('xy-button');
            let [year,month,day] = toDate(this.$value);
            if(item){
                this.type = 'month';
                this.value = item.dataset.year+'-'+(month+1)+'-'+day;
            }
        })
        this.init = true;
    }

    get value() {
        const [year,month,day] = toDate(this.$value);
        return year + '-' + (month+1+'').padStart(2,0) + '-' + (day+'').padStart(2,0);
    }

    get date() {
        return new Date(this.$value);
    }

    get type(){
        return this.$type||'day';
    }

    set type(value){
        this.$type = value;
        const [year,month] = toDate(this.$value);
        this.render();
        this.dateCon.dataset.type= value;
    }

    set value(value) {
        //'2019-1-1'
        if(this.$value!==value){
            this.$value = value;
            this.render(value);
            if(this.init){
                this.dispatchEvent(new CustomEvent('change', {
                    detail: {
                        value: value,
                        date: this.date,
                    }
                }));
            }
        }
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
            padding:0 .8em .8em;
        }
        .pop-footer xy-button{
            font-size: inherit;
            margin-left: .8em;
        }
        </style>
        <xy-popover id="popover" ${this.dir? "dir='"+this.dir+"'" : ""}>
            <xy-button id="select" ${this.disabled? "disabled" : ""} ${this.type?("type="+this.type):""}><span id="datetxt"></span><svg class="icon" viewBox="0 0 1024 1024"><path d="M880 184H712v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H384v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H144c-17.7 0-32 14.3-32 32v664c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V216c0-17.7-14.3-32-32-32z m-40 656H184V460h656v380zM184 392V256h128v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h256v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h128v136H184z" p-id="8054"></path></svg></xy-button>
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
            this.datePane.type = 'day';
            this.datePane.value = this.$value;
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
        return this.getAttribute('defaultvalue')||new Date;
    }

    get value() {
        const [year,month,day] = toDate(this.$value);
        return year + '-' + (month+1+'').padStart(2,0) + '-' + (day+'').padStart(2,0);
    }

    get date() {
        return new Date(this.$value);
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
        this.datetxt.textContent = this.value;
        if(this.init){
            this.dispatchEvent(new CustomEvent('change', {
                detail: {
                    value: this.value,
                    date: this.date
                }
            }));
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name == 'disabled' && this.colorBtn) {
            if (newValue != null) {
                this.select.setAttribute('disabled', 'disabled');
            } else {
                this.select.removeAttribute('disabled');
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
import './xy-button.js';
import './xy-popover.js';

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
            .date-switch[disabled]{
                opacity:1;
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
            .date-button{
                position:relative;
                overflow:hidden;
                background:none;
                border:0;
                padding: 0;
                color: var(--fontColor,#333);
                border-radius: var(--borderRadius,.25em);
                transition:background .3s,color .3s,opacity .3s;
                display:inline-flex;
                align-items:center;
                justify-content: center;
                font-size: inherit;
                outline:0;
            }
            .date-button::before{
                content:'';
                position:absolute; 
                background:var(--themeBackground,var(--themeColor,#42b983));
                pointer-events:none; 
                left:0; 
                right:0; 
                top:0; 
                bottom:0; 
                opacity:0; 
                transition:.3s;
                z-index:-1;
            }
            .date-button:not([disabled]):hover,.date-button:not([disabled]):focus{
                color:var(--themeColor,#42b983);
            }
            .date-button:not([disabled]):hover::before{
                opacity:.1 
            }
            .date-button:not([disabled]):focus::before{
                opacity:.2
            }
            .date-day-item{
                box-sizing:content-box;
                padding:1px;
                min-width: 2.3em;
                height: 2.3em;
                justify-self: center;
            }
            .date-button[other]{
                opacity:.6;
            }
            .date-button[disabled]{
                cursor: not-allowed;
                opacity:.6;
                color:var(--errorColor,#f4615c);
            }
            .date-button[now]{
                color:var(--themeColor,#42b983);
            }
            .date-button:not([disabled])[current]{
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
                grid-gap:.3em;
            }
            .date-month{
                grid-template-columns: repeat(3, 1fr);
                grid-template-rows: repeat(4, 1fr);
            }
            .date-year{
                grid-template-columns: repeat(4, 1fr);
                grid-template-rows: repeat(5, 1fr);
            }
            .date-month-item,
            .date-year-item{
                display:flex;
                margin:auto;
                width: 100%;
                height: 100%;
            }
            .date-mode{
                opacity:0;
                visibility:hidden;
                z-index:-1;
                transition:.3s opacity,.3s visibility;
            }
            .date-con[data-type="date"] .date-date,
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
            <div class="date-con" data-type="date">
                <div class="date-mode date-date">
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
                        ${
                            Array.from({length:42},el=>'<button class="date-button date-day-item" type="flat"></button>').join('')
                        }
                    </div>
                </div>
                <div class="date-mode date-month">
                    ${
                        this.getMonths().map((el,i)=>'<button class="date-button date-month-item" type="flat" data-month="'+((i+1).toString().padStart(2,0))+'">'+el+'</button>').join('')
                    }
                </div>
                <div class="date-mode date-year">
                    ${
                        Array.from({length:20},el=>'<button class="date-button date-year-item" type="flat"></button>').join('')
                    }
                </div>
            </div>
        </div>
        `
    }

    get defaultvalue() {
        return this.getAttribute('defaultvalue')||new Date;
    }

    get min() {
        const min = this.getAttribute('min');
        const d = [0,0,1];
        d.default = true;
        return min?toDate(min):d;
    }

    get max() {
        const max = this.getAttribute('max');
        const d = [9999,12,31];
        d.default = true;
        return max?toDate(max):d;
    }

    get minormax(){
        return !this.min.default || !this.max.default;
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

    getMonths(){
        return ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
    }

    getYears(year){
        const start = parseInt(year/20)*20;
        return Array.from({length:20},(el,i)=>start+i);
    }

    toDay(year,month,day){
        const len = new Date(year,month+1,0).getDate();
        day = day>len?len:day;
        return [year,month,day];
    }

    render(date=this.$value){
        const [year,month,day] = toDate(date);
        const [n_year,n_month,n_day] = toDate(new Date);
        switch (this.mode) {
            case 'date':
                const days = this.getDays(year,month);
                this.days.forEach((el,i)=>{
                    const [_year,_month,_day] = days[i].split('-');
                    el.dataset.date = _year+'-'+_month.toString().padStart(2,0)+'-'+_day.toString().padStart(2,0);
                    el.dataset.year = _year;
                    el.dataset.month = _month.toString().padStart(2,0);
                    el.dataset.day = _day.toString().padStart(2,0);
                    el.textContent = _day.toString().padStart(2,0);
                    if(year+'-'+(month+1)+'-'+day==days[i]){
                        el.setAttribute("current","");
                    }else{
                        el.removeAttribute("current");
                    }
                    if(n_year+'-'+(n_month+1)+'-'+n_day==days[i]){
                        el.setAttribute("now","");
                    }else{
                        el.removeAttribute("now");
                    }
                    if(_month!=month+1){
                        el.setAttribute("other","");
                    }else{
                        el.removeAttribute("other");
                    }
                    if(this.minormax){
                        el.disabled = el.dataset.date<this.min[0]+'-'+(this.min[1]+1+'').padStart(2,0)+'-'+(this.min[2]+'').padStart(2,0) || el.dataset.date>this.max[0]+'-'+(this.max[1]+1+'').padStart(2,0)+'-'+(this.max[2]+'').padStart(2,0);
                    }
                })
                this.switch.textContent = year + '年' + (month+1+'').padStart(2,0) + '月';
                this.switch.disabled = false;
                if(this.minormax){
                    const _days = [...this.days].filter(el=>el.dataset.month==month+1);
                    this.prev.disabled = _days[0].disabled;
                    this.next.disabled = _days[_days.length-1].disabled;
                }
                break;
            case 'month':
                this.months.forEach((el,i)=>{
                    el.dataset.date = year + '-' + el.dataset.month;
                    el.dataset.year = year;
                    if(el.dataset.month == month+1){
                        el.setAttribute("current","");
                    }else{
                        el.removeAttribute("current");
                    }
                    if(n_year+'-'+(n_month+1) == year + '-' + Number(el.dataset.month)){
                        el.setAttribute("now","");
                    }else{
                        el.removeAttribute("now");
                    }
                    if(this.minormax){
                        el.disabled = el.dataset.date<this.min[0]+'-'+(this.min[1]+1+'').padStart(2,0) || el.dataset.date>this.max[0]+'-'+(this.max[1]+1+'').padStart(2,0);
                    }
                })
                this.switch.textContent = year + '年';
                this.switch.disabled = false;
                if(this.minormax){
                    this.prev.disabled = this.months[0].disabled;
                    this.next.disabled = this.months[11].disabled;
                }
                break;
            case 'year':
                const years = this.getYears(year);
                this.years.forEach((el,i)=>{
                    el.dataset.year = years[i];
                    el.dataset.date = years[i];
                    el.textContent = years[i];
                    if(el.dataset.year)
                    if(el.dataset.year == year){
                        el.setAttribute("current","");
                    }else{
                        el.removeAttribute("current");
                    }
                    if(el.dataset.year == n_year){
                        el.setAttribute("now","");
                    }else{
                        el.removeAttribute("now");
                    }
                    if(this.minormax){
                        el.disabled = el.dataset.date<this.min[0] || el.dataset.date>this.max[0];
                    }
                })
                this.switch.textContent = years[0] + '年 - '+ (years[0]+19) + '年';
                this.switch.disabled = true;
                if(this.minormax){
                    this.prev.disabled = this.years[0].disabled;
                    this.next.disabled = this.years[19].disabled;
                }
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
        this.days = this.dateBody.querySelectorAll('button');
        this.months = this.dateMonth.querySelectorAll('button');
        this.years = this.dateYear.querySelectorAll('button');
        this.$value = this.defaultvalue;
        this.render();
        this.prev.addEventListener('click',()=>{
            let [year,month,day] = toDate(this.$value);
            switch (this.mode) {
                case 'date':
                    this.value = new Date(...this.toDay(year,month-1,day));
                    break;
                case 'month':
                    this.value = new Date(...this.toDay(year-1,month,day));
                    break;
                case 'year':
                    this.value = new Date(...this.toDay(year-20,month,day));
                default:
                    break;
            }
            
        })
        this.next.addEventListener('click',()=>{
            let [year,month,day] = toDate(this.$value);
            switch (this.mode) {
                case 'date':
                    this.value = new Date(...this.toDay(year,month+1,day));
                    break;
                case 'month':
                    this.value = new Date(...this.toDay(year+1,month,day));
                    break;
                case 'year':
                    this.value = new Date(...this.toDay(year+20,month,day));
                default:
                    break;
            }
        })
        this.switch.addEventListener('click',()=>{
            switch (this.mode) {
                case 'date':
                    this.mode = 'month';
                    break;
                case 'month':
                    this.mode = 'year';
                    break;
                default:
                    break;
            }
        })
        this.dateBody.addEventListener('click',(ev)=>{
            const item = ev.target.closest('button');
            if(item){
                this.value = item.dataset.date;
            }
        })
        this.dateMonth.addEventListener('click',(ev)=>{
            const item = ev.target.closest('button');
            let [year,month,day] = toDate(this.$value);
            if(item){
                if(this.type == 'date'){
                    const len = new Date(year,item.dataset.month,0).getDate();
                    this.mode = 'date';
                    this.value = item.dataset.date+'-'+(day>len?len:day);
                }else{
                    this.value = item.dataset.date+'';
                }
            }
        })
        this.dateYear.addEventListener('click',(ev)=>{
            const item = ev.target.closest('button');
            let [year,month,day] = toDate(this.$value);
            if(item){
                switch (this.type) {
                    case 'date':
                        const len = new Date(item.dataset.year,month+1,0).getDate();
                        this.mode = 'month';
                        this.value = item.dataset.date+'-'+(month+1)+'-'+(day>len?len:day);
                        break;
                    case 'month':
                        this.mode = 'month';
                        this.value = item.dataset.date+'-'+(month+1);
                        break;
                    default:
                        this.value = item.dataset.date+'';
                        break;
                }
            }
        })
        this.init = true;
    }

    get value() {
        const [year,month,day] = toDate(this.$value);
        let value = '';
        switch (this.type) {
            case 'date':
                value = year + '-' + (month+1+'').padStart(2,0) + '-' + (day+'').padStart(2,0);
                break;
            case 'month':
                value = year + '-' + (month+1+'').padStart(2,0);
                break;
            default:
                value = year + '';
                break;
        }
        return value;
    }

    get date() {
        return new Date(this.$value);
    }

    get type(){
        return this.getAttribute('type')||'date';
    }

    set min(value){
        this.setAttribute('min', value);
    }

    set max(value){
        this.setAttribute('max', value);
    }

    get mode(){
        return this.$mode||this.type;
    }

    set type(value){
        this.mode = value;
        this.setAttribute('type', value);
    }

    set mode(value){
        this.$mode = value;
        this.render();
        this.dateCon.dataset.type= value;
    }

    set value(value) {
        //'2019-1-1'
        if(this.minormax){
            value = Math.max(Math.min(new Date(value),new Date(...this.max)),new Date(...this.min));
        }
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
            <xy-button id="select" ${this.disabled? "disabled" : ""}><span id="datetxt"></span><svg class="icon" viewBox="0 0 1024 1024"><path d="M880 184H712v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H384v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H144c-17.7 0-32 14.3-32 32v664c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V216c0-17.7-14.3-32-32-32z m-40 656H184V460h656v380zM184 392V256h128v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h256v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h128v136H184z" p-id="8054"></path></svg></xy-button>
            <xy-popcon id="popcon">
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
        this.select = this.shadowRoot.getElementById('select');
        this.datetxt = this.shadowRoot.getElementById('datetxt');
        this.btnCancel = this.shadowRoot.getElementById('btn-cancel');
        this.btnSubmit = this.shadowRoot.getElementById('btn-submit');
        this.select.addEventListener('click',()=>{
            if(!this.datePane){
                this.datePane = new XyDatePane();
                this.popcon.prepend(this.datePane);
                this.datePane.type = this.type;
                this.min && (this.datePane.min = this.min);
                this.max && (this.datePane.max = this.max);
            }
            this.datePane.mode = this.type;
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

    get min() {
        return this.getAttribute('min');
    }

    get max() {
        return this.getAttribute('max');
    }

    get defaultvalue() {
        return this.getAttribute('defaultvalue')||new Date;
    }

    get value() {
        const [year,month,day] = toDate(this.$value);
        let value = '';
        switch (this.type) {
            case 'date':
                value = year + '-' + (month+1+'').padStart(2,0) + '-' + (day+'').padStart(2,0);
                break;
            case 'month':
                value = year + '-' + (month+1+'').padStart(2,0);
                break;
            default:
                value = year + '';
                break;
        }
        return value;
    }

    get date() {
        return new Date(this.$value);
    }

    get type() {
        return this.getAttribute('type')||'date';
    }

    get disabled() {
        return this.getAttribute('disabled')!==null;
    }

    get dir() {
        return this.getAttribute('dir');
    }

    set min(value){
        this.setAttribute('min', value);
    }

    set max(value){
        this.setAttribute('max', value);
    }

    set dir(value){
        this.setAttribute('dir', value);
    }

    set type(value){
        this.setAttribute('type', value);
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
        if (name == 'disabled' && this.select) {
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
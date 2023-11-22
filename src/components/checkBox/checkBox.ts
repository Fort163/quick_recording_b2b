import Vue from 'vue'
import Component from "vue-class-component";
import {Emit, Prop} from "vue-property-decorator";

@Component({
    components: {
    }
})
export default class CheckBox extends Vue {

    @Prop() private color : String | undefined;
    @Prop() private text : String | undefined;
    @Prop() private backgroundColor : String | undefined;
    @Prop({default: false}) private value : Boolean | undefined;
    @Prop() private size : Number | undefined;
    @Prop() private radius : Number | undefined;



    private _value : Boolean | undefined;

    created(){
    }

    mounted(){
        this._value = this.value
    }

    get radiusCalc() : String{
        if(this.radius){
            return this.fixParam(this.radius)
        }
        return '5%'
    }

    get sizeParam() : number{
        if(this.size){
            if(this.size < 35){
                return 30
            }
            return this.size.valueOf()
        }
        return 50
    }

    get sizeCalc() : String  {
        return this.fixParam(this.sizeParam)
    }

    get sizeCalcLabel() : String  {
        return this.fixParam(this.sizeParam * 2)
    }

    get widthCheck() : String {
        return this.fixParam( this.sizeParam / 2.5)
    }

    get heightCheck() : String {
        return this.fixParam( this.sizeParam / 1.7)
    }

    get offset() : String {
        return this.fixParam( this.sizeParam / -2)
    }

    get offsetCheckedHeight() : String {
        return this.fixParam(( this.sizeParam / -2) + this.sizeParam / 4)
    }

    get offsetCheckedWidth() : String {
        return this.fixParam(( this.sizeParam / -2) + this.sizeParam / 15)
    }

    get shadow() : String {
        return '0px 0px '+this.fixParam( this.sizeParam / 2) +' ' +this.fixParam( this.sizeParam / 2) + ' ' + (this.backgroundColor? this.fixColor(this.backgroundColor) : this.fixColor(this.color));
    }

    get thickness() : String{
        return "0 "+ this.sizeParam / 6 + "px "+ this.sizeParam / 6 + "px 0"
    }

    public change(){
        this._value = !this._value
        this.$emit('input', this._value)
    }

    protected fixParam(param : Number | undefined) : String{
        return param + 'px'
    }

    protected fixColor(param : String | undefined) : String{
        if(param){
            return param
        }
        return '#238bfd'
    }

    protected fixBackgroundColor(param : String | undefined) : String{
        if(param){
            return param
        }
        return 'white'
    }

    public callback(e : any) {
        this.$emit('click', e);
    }

    protected changeColor(color : String, percent : number) : String{

        let R : number = parseInt(color.substring(1,3),16);
        let G : number = parseInt(color.substring(3,5),16);
        let B : number = parseInt(color.substring(5,7),16);

        R = parseInt(String(R * (100 + percent) / 100));
        G = parseInt(String(G * (100 + percent) / 100));
        B = parseInt(String(B * (100 + percent) / 100));

        R = (R<255)?R:255;
        G = (G<255)?G:255;
        B = (B<255)?B:255;

        R = Math.round(R)
        G = Math.round(G)
        B = Math.round(B)

        const RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
        const GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
        const BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

        return "#"+RR+GG+BB;
    }

    get createStyleLabel() : any {
        return {
            '--label-inline': this.sizeCalcLabel,
        }
    }

    get createStyle() : any {
        return {
            'margin' : this.sizeCalc,
            '--check-box-width': this.sizeCalc,
            '--check-box-height': this.sizeCalc,
            '--check-box-offset': this.offset ,
            '--check-box-offset-checked-width': this.offsetCheckedWidth ,
            '--check-box-offset-checked-height': this.offsetCheckedHeight ,
            '--check-box-width-check': this.widthCheck,
            '--check-box-height-check': this.heightCheck ,
            '--check-box-thickness': this.thickness ,
            '--check-box-border-radius': this.radiusCalc,
            '--check-box-color': this.fixColor(this.color),
            '--check-box-background-color': this.fixBackgroundColor(this.backgroundColor),
            '--check-box-shadow': this.shadow
        }
    }

}
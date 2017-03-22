/**
* @author Suwichak Fungprasertkul <suwichak@outlook.com>
* @version 1.0
* @license MIT License Copyright (c) 2016 OptRel team
*
* The following instruction orinally has been developed by Random.js in MIT License before importing to TypeScript by the author
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*
* @description Random.ts is for generate psedo-random number
*/

class Random{
  N : number;
  M : number;
  MATRIX_A : number;
  UPPER_MASK : number;
  LOWER_MASK : number;
  mt : any;
  mti : any;
  constructor(a : number){
    a=a===void 0?(new Date).getTime():a;this.N=624;this.M=397;this.MATRIX_A=2567483615;this.UPPER_MASK=2147483648;this.LOWER_MASK=2147483647;this.mt=Array(this.N);this.mti=this.N+1;this.init_by_array([a],1)
  }
  init_by_array(a,c){var b,f,e;this.init_genrand(19650218);b=1;f=0;for(e=this.N>c?this.N:c;e;e--){var d=this.mt[b-1]^this.mt[b-1]>>>30;this.mt[b]=(this.mt[b]^(((d&4294901760)>>>16)*1664525<<16)+(d&65535)*1664525)+a[f]+f;this.mt[b]>>>=0;b++;f++;b>=this.N&&(this.mt[0]=this.mt[this.N-1],b=1);f>=c&&(f=0)}for(e=this.N-1;e;e--)d=this.mt[b-1]^this.mt[b-1]>>>30,this.mt[b]=(this.mt[b]^(((d&4294901760)>>>16)*1566083941<<16)+(d&65535)*1566083941)-b,this.mt[b]>>>=0,b++,b>=this.N&&(this.mt[0]=
  this.mt[this.N-1],b=1);this.mt[0]=2147483648};
  init_genrand(a){this.mt[0]=a>>>0;for(this.mti=1;this.mti<this.N;this.mti++)a=this.mt[this.mti-1]^this.mt[this.mti-1]>>>30,this.mt[this.mti]=(((a&4294901760)>>>16)*1812433253<<16)+(a&65535)*1812433253+this.mti,this.mt[this.mti]>>>=0};
  triangular(a : number, c : number, b : number){var f=(b-a)/(c-a),e=this.random();return e<=f?a+Math.sqrt(e*(c-a)*(b-a)):c-Math.sqrt((1-e)*(c-a)*(c-b))}
  random(){return this.genrand_int32()*(1/4294967296)};
  genrand_int32(){var a,c=[0,this.MATRIX_A];if(this.mti>=this.N){var b;this.mti==this.N+1&&this.init_genrand(5489);for(b=0;b<this.N-this.M;b++)a=this.mt[b]&this.UPPER_MASK|this.mt[b+1]&this.LOWER_MASK,this.mt[b]=this.mt[b+this.M]^a>>>1^c[a&1];for(;b<this.N-1;b++)a=this.mt[b]&this.UPPER_MASK|this.mt[b+1]&this.LOWER_MASK,this.mt[b]=this.mt[b+(this.M-this.N)]^a>>>1^c[a&1];a=this.mt[this.N-1]&this.UPPER_MASK|this.mt[0]&this.LOWER_MASK;this.mt[this.N-1]=this.mt[this.M-1]^a>>>1^c[a&1];this.mti=0}a=this.mt[this.mti++];a^=a>>>11;a^=a<<7&2636928640;a^=a<<15&4022730752;a^=a>>>18;return a>>>0};
}

export default Random;

function deepcopy(iter){return JSON.parse(JSON.stringify(iter))}
let dc = deepcopy
let texts = []
let W = window.innerWidth
let H = window.innerHeight
function text(id,percent,sizetype = false){
    texts.push([id,percent,sizetype])
    resize()
}
function resize(){
    if (16*H > 9*W) {
        $('.kawa').css({'position': 'relative', 'margin-top' : String((H-(9/16)*W)/2) + 'px', 'margin-left' : 0})
        $('.tama').css({'position': 'relative', 'width' : String(W) + 'px', 'height' : String((9/16)*W)})
        for (var i of texts){
            if (i[2]){
                var temp = document.getElementById(i[0]).innerText.length
                $(i[0]).css({'position': 'absolute','width' : String(W*i[1]/(100*temp)) + 'px'})
            } else $(i[0]).css({'position': 'absolute','width' : String(W*i[1]/100) + 'px'})
        }
    } else {
        $('.kawa').css({'position': 'relative', 'margin-top' : 0, 'margin-left' : String((W-(16/9)*H)/2) + 'px'})
        $('.tama').css({'position': 'relative', 'width' : String((16/9)*H) + 'px', 'height' : String(H)})
        for (var i of texts){
            if (i[2]){
                var temp = document.getElementById(i[0]).innerText.length
                $(i[0]).css({'position': 'absolute','width' : String((16/9)*H*i[1]/(100*temp)) + 'px'})
            } else $(i[0]).css({'position': 'absolute','width' : String((16/9)*H*i[1]/100) + 'px'})
        }
    }
}
resize()
window.addEventListener('resize', function(){
    W = window.innerWidth
    H = window.innerHeight
    resize()
});

//-------------------------------

function MersenneTwister(seed) {
	if (arguments.length == 0)
		seed = new Date().getTime();
	
	this._mt = new Array(624);
	this.setSeed(seed);
}
MersenneTwister._mulUint32 = function(a, b) {
	var a1 = a >>> 16, a2 = a & 0xffff;
	var b1 = b >>> 16, b2 = b & 0xffff;
	return (((a1 * b2 + a2 * b1) << 16) + a2 * b2) >>> 0;
};

/** returns ceil(value) if value is finite number, otherwise 0. */
MersenneTwister._toNumber = function(x) {
	return (typeof x == "number" && !isNaN(x)) ? Math.ceil(x) : 0;
};
MersenneTwister.prototype.setSeed = function(seed) {
	var mt = this._mt;
	if (typeof seed == "number") {
		mt[0] = seed >>> 0;
		for (var i = 1; i < mt.length; i++) {
			var x = mt[i-1] ^ (mt[i-1] >>> 30);
			mt[i] = MersenneTwister._mulUint32(1812433253, x) + i;
		}
		this._index = mt.length;
	} else if (seed instanceof Array) {
		var i = 1, j = 0;
		this.setSeed(19650218);
		for (var k = Math.max(mt.length, seed.length); k > 0; k--) {
			var x = mt[i-1] ^ (mt[i-1] >>> 30);
			x = MersenneTwister._mulUint32(x, 1664525);
			mt[i] = (mt[i] ^ x) + (seed[j] >>> 0) + j;
			if (++i >= mt.length) {
				mt[0] = mt[mt.length-1];
				i = 1;
			}
			if (++j >= seed.length) {
				j = 0;
			}
		}
		for (var k = mt.length - 1; k > 0; k--) {
			var x = mt[i-1] ^ (mt[i-1] >>> 30);
			x = MersenneTwister._mulUint32(x, 1566083941);
			mt[i] = (mt[i] ^ x) - i;
			if (++i >= mt.length) {
				mt[0] = mt[mt.length-1];
				i = 1;
			}
		}
		mt[0] = 0x80000000;
	} else {
		throw new TypeError("MersenneTwister: illegal seed.");
	}
};
MersenneTwister.prototype._nextInt = function() {
	var mt = this._mt, value;
	
	if (this._index >= mt.length) {
		var k = 0, N = mt.length, M = 397;
		do {
			value = (mt[k] & 0x80000000) | (mt[k+1] & 0x7fffffff);
			mt[k] = mt[k+M] ^ (value >>> 1) ^ ((value & 1) ? 0x9908b0df : 0);
		} while (++k < N-M);
		do {
			value = (mt[k] & 0x80000000) | (mt[k+1] & 0x7fffffff);
			mt[k] = mt[k+M-N] ^ (value >>> 1) ^ ((value & 1) ? 0x9908b0df : 0);
		} while (++k < N-1);
		value = (mt[N-1] & 0x80000000) | (mt[0] & 0x7fffffff);
		mt[N-1] = mt[M-1] ^ (value >>> 1) ^ ((value & 1) ? 0x9908b0df : 0);
		this._index = 0;
	}
	
	value = mt[this._index++];
	value ^=  value >>> 11;
	value ^= (value <<   7) & 0x9d2c5680;
	value ^= (value <<  15) & 0xefc60000;
	value ^=  value >>> 18;
	return value >>> 0;
};
MersenneTwister.prototype.nextInt = function() {
	var min, sup;
	switch (arguments.length) {
	case 0:
		return this._nextInt();
	case 1:
		min = 0;
		sup = MersenneTwister._toNumber(arguments[0]);
		break;
	default:
		min = MersenneTwister._toNumber(arguments[0]);
		sup = MersenneTwister._toNumber(arguments[1]) - min;
		break;
	}
	
	if (!(0 < sup && sup < 0x100000000))
		return this._nextInt() + min;
	if ((sup & (~sup + 1)) == sup)
		return ((sup - 1) & this._nextInt()) + min;
	
	var value;
	do {
		value = this._nextInt();
	} while (sup > 4294967296 - (value - (value %= sup)));
	return value + min;
};
MersenneTwister.prototype.next = function() {
	var a = this._nextInt() >>> 5, b = this._nextInt() >>> 6;
	return (a * 0x4000000 + b) / 0x20000000000000; 
};

var mt = new MersenneTwister()

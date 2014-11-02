/*!
Copyright 2012, Apollo Tang (apollotang.com)
Released under the MIT, BSD, and GPL Licenses.
---------------------------------------------------------------------
This plug in will scale an image by comparing the aspect ratio
between the image and browser's view port.  

You can either specify your image in CSS or in an <img> tag
However, only the later works in IE (tseted 7 and 8) 

Example of implimentation with specifying image in css are as follow:

 		html:
			<body id="bg">
		invocation:
			$('#bg').LiquidFullSizeBackground();
		css:
			html {overflow: hidden;}
			* {margin:0; padding:0;}
			#bg {
				width:1920px; height:1080px;
				background: url(../imgs/image.jpg) top left no-repeat; 
				}

To impliment the plugin by specifying image in <img>: 

 		html:
 			<img id="bg" src="imgs/image.jpg">
		invocation:
			$('#bg').LiquidFullSizeBackground();
		css:
			html {overflow: hidden;}
			* {margin:0; padding:0;}
			#bg { width:1920px; height:1080px; } 		 

*/

(function($){ $.fn.LiquidFullSizeBackground = function() { return this.each(function(){

var OriginalElementDim = { w: $(this).width(), h: $(this).height() };
var newDim = { w: OriginalElementDim.w, h: OriginalElementDim.h };
var $element = $(this);

	newDim = cal_liquidDim( OriginalElementDim, get_viewportDim());
	adjustElementDim( $element, newDim );

$(window).resize( function (){ 
	newDim = cal_liquidDim( OriginalElementDim, get_viewportDim());
	adjustElementDim( $element, newDim );

});

function adjustElementDim( _$element, _Dim ){
	console.log(_Dim.w + ' ' +_Dim.h);
	_$element.css({
		 'width' : _Dim.w + 'px',
		 'height' : _Dim.h + 'px', 
		 'background-size': _Dim.w + 'px ' + _Dim.h + 'px'
		 }
	);
}

function get_viewportDim() {
	var _vp_dim ={ w: 1, h: 1}; 
	_vp_dim.w  = $(window).width(); 
	_vp_dim.h  = $(window).height();
	return _vp_dim; 
}

function cal_liquidDim( o_elem_dim, c_vp_dim ){ 
	// note "o" stand for original, "c" stand for current 
	var o_elem_aspectR = o_elem_dim.h / o_elem_dim.w, 
	    c_vp_aspctR   = c_vp_dim.h / c_vp_dim.w,
	    liquidDim   = { w: o_elem_dim.w, h: o_elem_dim.h};
	if ( c_vp_aspctR == o_elem_aspectR) {
			liquidDim.h = c_vp_dim.h;
			liquidDim.w = c_vp_dim.w; 
	} else if ( c_vp_aspctR > o_elem_aspectR ) {
			liquidDim.h = c_vp_dim.h ;
			liquidDim.w = c_vp_dim.h / o_elem_aspectR; 
	} else if ( c_vp_aspctR < o_elem_aspectR){
			liquidDim.h = c_vp_dim.w * o_elem_aspectR;
			liquidDim.w = c_vp_dim.w  ;  
	}
	liquidDim.h = parseInt(liquidDim.h);
	liquidDim.w = parseInt(liquidDim.w);
	return liquidDim;
}

}); }; })(jQuery);

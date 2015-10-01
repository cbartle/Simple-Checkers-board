"use strict";

var gl;
var vertices = [];

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

		//var vertices = [];
		for(var i = 0; i < 8; i++){
			for(var j = 0; j < 8; j++){
				
				vertices.push(-1 + (.25 * j),0.75 - (.25 * i));
				vertices.push(-1 +(.25 * j),1 - (.25 * i));				
				vertices.push(-.75 + (.25 * j),1 - (.25 * i));
				vertices.push(-.75 + (.25 * j),.75 - (.25 * i));
				
				
				
			}
		}
		
		var colors = [];
		
		for(i = 0; i < 8; i++){
			for(var j = 0; j <4; j++){
			if (i % 2 == 0){
				//yellow
				colors.push(1.0, 1.0, 0.0, 1.0);
				colors.push(1.0, 1.0, 0.0, 1.0);
				colors.push(1.0, 1.0, 0.0, 1.0);
				colors.push(1.0, 1.0, 0.0, 1.0);
				
				
				//purple
				colors.push(1.0, 0.0, 1.0, 1.0);
				colors.push(1.0, 0.0, 1.0, 1.0);
				colors.push(1.0, 0.0, 1.0, 1.0);
				colors.push(1.0, 0.0, 1.0, 1.0);
				
				
			}
			else {
				
				//purple
				colors.push(1.0, 0.0, 1.0, 1.0);
				colors.push(1.0, 0.0, 1.0, 1.0);
				colors.push(1.0, 0.0, 1.0, 1.0);
				colors.push(1.0, 0.0, 1.0, 1.0);
				
				//yellow
				colors.push(1.0, 1.0, 0.0, 1.0);
				colors.push(1.0, 1.0, 0.0, 1.0);
				colors.push(1.0, 1.0, 0.0, 1.0);
				colors.push(1.0, 1.0, 0.0, 1.0);
				
			}
			}
		}
		/*
		*/
	
			//vertices.push(-.625, .975);
			//vertices.push(-.525,.875);
			//vertices.push(-.625,.775);
			//vertices.push(-.725,.875);
		for( i = 0; i < 192; i++){	
			colors.push(1.0, 0.0, 0.0, 1.0);
		}
			
	for( i = 0; i < 192; i++){	
			colors.push(0.0, 1.0, .346, 1.0);
		}
	
	
	//top 12 checkers
	var pi = Math.PI;	
	for ( var i = 0; i < 3; i++){
		
		for( var j = 0; j< 4; j++){
			
			if(i % 2 == 0){
			
			for(var angle = 0; angle <= 2 * pi; angle += pi / 8){
		
					vertices.push((Math.cos(angle) * 0.1) -.625 + (j * .5),(Math.sin(angle) * 0.1)+ .875 -(i * .25));
	
			}	
				
			}
			else{
			for(var angle = 0; angle <= 2 * pi; angle += pi / 8){
		
					vertices.push((Math.cos(angle) * 0.1) -.875 + (j * .5),(Math.sin(angle) * 0.1)+ .625);
	
			}	
				
			}
		}
		
	}
		
		
	//botom 12 checkers
	for ( var i = 0; i < 3; i++){
		
		for( var j = 0; j< 4; j++){
			
			if(i % 2 == 0){
			
			for(var angle = 0; angle <= 2 * pi; angle += pi / 8){
		
					vertices.push((Math.cos(angle) * 0.1) -.875 + (j * .5),(Math.sin(angle) * 0.1)- .375 -(i * .25));
	
			}	
				
			}
			else{
			for(var angle = 0; angle <= 2 * pi; angle += pi / 8){
		
					vertices.push((Math.cos(angle) * 0.1) -.625 + (j * .5),(Math.sin(angle) * 0.1)+ -.625);
					
	
			}	
				
			}
		}
		
	}
		
	/*for(var i = 0; i < numTris; i++) {
		var index = 2*2 + i*3
		var angle = degPerTri * (i+1);

		//cvertices[index] = vec2((Math.cos(angle)/4),(Math.sin(angle)/4)); 
		//vertices.push((Math.cos(angle)/4),(Math.sin(angle)/4));

		
	}	
		
		//vertices[index+1] = ; 
		//vertices[index+2] = 0; 
	
	*/
	
    //
    //  Configure WebGL
    //
    gl.viewport( 0,0, canvas.width, canvas.height );
    gl.clearColor(  .250, 0.250, .250, 1.0 );

    //  Load shaders and initialize attribute buffers

    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // Load the data into the GPU

    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW );
	
	var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
	
	//gl.bindBuffer(gl.ARRAY_BUFFER, null);

	var cbufferId = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, cbufferId );
	gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );

	
    // Associate out shader variables with our data buffer

    
	
	var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );
	
    render();
};

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    for(var i = 0; i < 256; i = i + 4){		
		gl.drawArrays( gl.TRIANGLE_FAN, i, 4 );
	}
	for(var i = 256; i < (256 + 2*(16 * 12)); i = i+16){
		gl.drawArrays( gl.TRIANGLE_FAN, i, 16 );
		
	}
}
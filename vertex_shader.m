

aspect = 640 / 480
fovy = 45 * pi / 180
f = 1 / tan(fovy / 2);
near = 0.1
far = 100.0
z1 = far / (near - far);
z2 = near * far / (near - far);

P = [ f, 0, 0, 0 ; 0, (f / aspect), 0, 0 ; 0, 0, z1, z2 ; 0, 0, -1, 0 ]

for z = -10:10
	disp(z)
	v = [ 0 ; 0 ; z ; 1 ] ;
	transformed = P * v;
	t = transpose(transformed);
	x = t(1);
	y = t(2);
	z = t(3);
	w = t(4);
	po = [ x/w, y/w, z/w ];
	disp(po)
endfor

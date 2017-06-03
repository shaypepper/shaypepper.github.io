
// Version 0.0.0. Copyright 2017 Mike Bostock.

var acos = Math.acos,
    asin = Math.asin,
    atan2 = Math.atan2,
    cos = Math.cos,
    max = Math.max,
    min = Math.min,
    PI = Math.PI,
    sin = Math.sin,
    sqrt = Math.sqrt,
    radians = PI / 180,
    degrees = 180 / PI,
    dot = (a,b) => a[0]*b[0] + a[1]*b[1] + a[2]*b[2],
    cross = (a,b) => [
        a[1]*b[2] - a[2]*b[1],
        a[2]*b[0] - a[0]*b[2],
        a[0]*b[1] - a[1]*b[0]
    ];


// Returns the unit quaternion for the given Euler rotation angles [λ, φ, γ].
function versor(e) {
  var l = e[0]/2 * radians, sl = sin(l), cl = cos(l), // λ / 2
      p = e[1]/2 * radians, sp = sin(p), cp = cos(p), // φ / 2
      g = e[2]/2 * radians, sg = sin(g), cg = cos(g); // γ / 2
  return [
    cl*cp*cg + sl*sp*sg,
    sl*cp*cg - cl*sp*sg,
    cl*sp*cg + sl*cp*sg,
    cl*cp*sg - sl*sp*cg
  ];
}

// Returns Cartesian coordinates [x, y, z] given spherical coordinates [λ, φ].
versor.cartesian = function(e) {
  var l = e[0]*radians, p = e[1]*radians, cp = cos(p);
  return [cp*cos(l), cp*sin(l), sin(p)];
};

// Returns the Euler rotation angles [λ, φ, γ] for the given quaternion.
versor.rotation = function(a,b,c,d) {
  return [
    atan2(2 * (a*b + c*d), 1 - 2 * (b*b + c*c)) * degrees,
    asin(max(-1, min(1, 2 * (a*c - d*b)))) * degrees,
    atan2(2 * (a*d + b*c), 1 - 2 * (c*c + d*d)) * degrees
  ];
};

// Returns the quaternion to rotate between two cartesian points on the sphere.
versor.delta = function(v0, v1) {
  var w = cross(v0, v1), l = sqrt(dot(w, w));
  if (!l) return [1, 0, 0, 0];
  var t = acos(max(-1, min(1, dot(v0, v1)))) / 2, s = sin(t); // t = θ / 2
  return [cos(t), w[2] / l * s, -w[1] / l * s, w[0] / l * s];
};

// Returns the quaternion that represents q0 * q1.
versor.multiply = (a,b) => [
    a[0]*b[0] - a[1]*b[1] - a[2]*b[2] - a[3]*b[3],
    a[0]*b[1] + a[1]*b[0] + a[2]*b[3] - a[3]*b[2],
    a[0]*b[2] - a[1]*b[3] + a[2]*b[0] + a[3]*b[1],
    a[0]*b[3] + a[1]*b[2] - a[2]*b[1] + a[3]*b[0]
];


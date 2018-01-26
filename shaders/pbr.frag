#version 100

#ifdef GL_ES
precision mediump float;
#extension GL_OES_standard_derivatives : enable
#endif

// GLOBAL FLUXIONS VARIABLES

uniform float timer;
uniform vec2  mouse;
uniform vec3  LightDir;

uniform sampler2D Texture2D;
uniform samplerCube TextureCube;
uniform samplerCube TextureCubePerlin;
uniform sampler2D TexturePerlin;

uniform vec4 Kd;
uniform sampler2D Kd_map;
uniform float Kd_map_mix;

varying vec4 VS_Position;
varying vec3 VS_Normal;
varying vec4 VS_Color;
varying vec4 VS_TexCoord;
varying vec3 VS_CameraDir;

// vec4 mix(vec4 color1, vec4 color2, float mix)
// {
// 	return mix * color1 + (1.0 - mix) * color2;
// }

vec3 CreateNormalFromDerivatives()
{
    return normalize(cross(dFdx(VS_Position).xyz, dFdy(VS_Position).xyz));
}

float hash1( float n )
{
    return fract(sin(n)*43758.5453);
}


float hash( float n )
{
    return fract(100.0*sin(sin(n)*43758.5453));
}
 
float noise(vec3 x)
{
    // This is based on Ken Perlin's improved noise, but with a different hashing
    // function.
    // The noise function returns a value in the range -1.0f -> 1.0f

    vec3 p = floor(x);
    vec3 f = fract(x);
 
    // f is the fade
    //f = f*f*(3.0-2.0*f);
    f = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
    float n = p.x + p.y*57.0 + 113.0*p.z;

    float g1 = hash(n +   0.0);
    float g2 = hash(n +   1.0);
    float g3 = hash(n +  57.0);
    float g4 = hash(n +  58.0);
    float g5 = hash(n + 113.0);
    float g6 = hash(n + 114.0);
    float g7 = hash(n + 170.0);
    float g8 = hash(n + 171.0);

    return mix(mix(mix(g1, g2, f.x),
                   mix(g3, g4, f.x), f.y),
               mix(mix(g5, g6, f.x),
                   mix(g7, g8, f.x), f.y), f.z);
}

void main(void)
{
    vec3 V = normalize(VS_CameraDir);
    vec3 L = normalize (LightDir);
    vec3 N = normalize(VS_Normal);//normalize(cross(dFdx(VS_Position).xyz, dFdy(VS_Position).xyz));

    float NdotL = max(0.0, dot(N, L));
    vec4 c_d = 0.31831 * mix(VS_Color * Kd, texture2D(Texture2D, VS_TexCoord.st), Kd_map_mix);
    gl_FragColor = NdotL * c_d;
    // gl_FragColor = textureCube(TextureCube, vec3(-1.0, VS_TexCoord.s, VS_TexCoord.t));
    //gl_FragColor = texture2D(TexturePerlin, VS_TexCoord.st);
    vec3 R = reflect(N, V);
    float noiseTotal = noise(8.0*VS_Position.xyz);//0.25 * (noise(8.0*VS_Position.xyz) + noise(4.0 * VS_Position.xyz) + noise(2.0 * VS_Position.xyz) + noise(1.0 * VS_Position.xyz));
    gl_FragColor = vec4(noiseTotal * vec3(1.0, 1.0, 1.0), 1.0);//textureCube(TextureCubePerlin, R);
}
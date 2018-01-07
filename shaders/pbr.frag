#version 100

#ifdef GL_ES
precision mediump float;
#endif

// GLOBAL FLUXIONS VARIABLES

uniform float timer;
uniform vec2  mouse;
uniform vec3  LightDir;

uniform sampler2D Texture2D;
uniform samplerCube TextureCube;

uniform vec4 Kd;
uniform sampler2D Kd_map;
uniform float Kd_map_mix;

varying vec4 VS_Position;
varying vec3 VS_Normal;
varying vec4 VS_Color;
varying vec4 VS_TexCoord;
varying vec3 VS_CameraDir;

vec4 lerp(vec4 color1, vec4 color2, float mix)
{
	return mix * color1 + (1.0 - mix) * color2;
}

void main(void)
{
    vec3 V = normalize(VS_CameraDir);
    vec3 L = normalize (LightDir);
    vec3 N = normalize (VS_Normal);
    float NdotL = max(0.0, dot(N, L));
    vec4 c_d = 0.31831 * lerp(VS_Color * Kd, texture2D(Texture2D, VS_TexCoord.st), Kd_map_mix);
    gl_FragColor = NdotL * c_d;
    // gl_FragColor = textureCube(TextureCube, vec3(-1.0, VS_TexCoord.s, VS_TexCoord.t));
    // gl_FragColor = texture2D(Texture2D, VS_TexCoord.st);
}
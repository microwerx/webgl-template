#ifdef GL_ES
precision mediump float;
#endif

uniform float timer;
uniform vec2  mouse;
uniform vec3  LightDir;

uniform sampler2D Texture2D;
uniform samplerCube TextureCube;

varying vec4 VS_Position;
varying vec3 VS_Normal;
varying vec4 VS_Color;
varying vec4 VS_TexCoord;
varying vec3 VS_CameraDir;

void main(void)
{
    vec3 V = normalize(VS_CameraDir);
    vec3 L = normalize (LightDir);
    vec3 N = normalize (VS_Normal);
    float NdotL = max(0.0, dot(N, L));
    gl_FragColor = NdotL * vec4(VS_Color.rgb,1.0);//vec4(1.0,1.0,1.0,1.0) * NdotL;// + texture2D(Texture2D, VS_TexCoord.st);
    gl_FragColor = textureCube(TextureCube, vec3(-1.0, VS_TexCoord.s, VS_TexCoord.t));
    //gl_FragColor = texture2D(Texture2D, VS_TexCoord.st);
}
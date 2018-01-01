uniform mat4 WorldMatrix;
uniform mat4 CameraMatrix;
uniform mat4 ProjectionMatrix;

attribute vec4 aPosition;
attribute vec3 aNormal;
attribute vec4 aColor;
attribute vec4 aTexCoord;

varying vec4 VS_Position;
varying vec3 VS_Normal;
varying vec4 VS_Color;
varying vec4 VS_TexCoord;
varying vec3 VS_CameraDir;

void main(void)
{
    VS_Position = WorldMatrix * aPosition;
    VS_CameraDir = CameraMatrix[3].xyz - VS_Position.xyz;
    VS_Normal = aNormal;
    VS_Color = aColor;
    VS_TexCoord = aTexCoord;
    gl_Position = ProjectionMatrix * CameraMatrix * WorldMatrix * aPosition;
}
#version 100

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

// BEGIN SUNFISH GLSL RAY TRACER /////////////////////////////////////

struct Material {
	vec3 Kd;
	vec3 Ks;
	float roughness;
};

struct Sphere {
	vec3 position;
	float radius;
	Material material;
};

struct Ray {
	vec3 origin;
	vec3 direction;
};

struct HitRecord {
	float t;
	vec3 P;
	vec3 N;
};

// some colors
const vec3 ArneBlack = vec3(0.0, 0.0, 0.0);
const vec3 ArneGray = vec3(0.616, 0.616, 0.616);
const vec3 ArneWhite = vec3(1.0, 1.0, 1.0);
const vec3 ArneRed = vec3(0.745, 0.149, 0.2);
const vec3 ArneMeat = vec3(0.878, 0.435, 0.545);
const vec3 ArneDarkBrown = vec3(0.286, 0.235, 0.169);
const vec3 ArneBrown = vec3(0.643, 0.392, 0.133);
const vec3 ArneOrange = vec3(0.922, 0.537, 0.192);
const vec3 ArneYellow = vec3(0.969, 0.886, 0.42);
const vec3 ArneDarkGreen = vec3(0.184, 0.282, 0.306);
const vec3 ArneGreen = vec3(0.267, 0.537, 0.102);
const vec3 ArneSlimeGreen = vec3(0.639, 0.808, 0.153);
const vec3 ArneNightBlue = vec3(0.106, 0.149, 0.196);
const vec3 ArneSeaBlue = vec3(0, 0.341, 0.518);
const vec3 ArneSkyBlue = vec3(0.192, 0.635, 0.949);
const vec3 ArneCloudBlue = vec3(0.698, 0.863, 0.937);
const vec3 ArneDarkBlue = vec3(0.204, 0.165, 0.592);
const vec3 ArneDarkGray = vec3(0.396, 0.427, 0.443);
const vec3 ArneLightGray = vec3(0.8, 0.8, 0.8);
const vec3 ArneDarkRed = vec3(0.451, 0.161, 0.188);
const vec3 ArneRose = vec3(0.796, 0.263, 0.655);
const vec3 ArneTaupe = vec3(0.322, 0.31, 0.251);
const vec3 ArneGold = vec3(0.678, 0.616, 0.2);
const vec3 ArneTangerine = vec3(0.925, 0.278, 0);
const vec3 ArneHoney = vec3(0.98, 0.706, 0.043);
const vec3 ArneMossyGreen = vec3(0.067, 0.369, 0.2);
const vec3 ArneDarkCyan = vec3(0.078, 0.502, 0.494);
const vec3 ArneCyan = vec3(0.082, 0.761, 0.647);
const vec3 ArneBlue = vec3(0.133, 0.353, 0.965);
const vec3 ArneIndigo = vec3(0.6, 0.392, 0.976);
const vec3 ArnePink = vec3(0.969, 0.557, 0.839);
const vec3 ArneSkin = vec3(0.957, 0.725, 0.565);



Material sfCreateMaterial(vec3 Kd, vec3 Ks, float roughness)
{
	Material m;
	m.Kd = Kd;
	m.Ks = Ks;
	m.roughness = roughness;
	return m;
}


Ray sfCreateRay(vec3 origin, vec3 dir)
{
	Ray r;
	r.origin = origin;
	r.direction = normalize(dir);
	return r;
}

HitRecord sfCreateHitRecord(float t, vec3 P, vec3 N)
{
	HitRecord h;
	h.t = t;
	h.P = P;
	h.N = N;
	return h;
}

vec3 sfRayOffset(Ray r, float t)
{
	return r.origin + t * r.direction;
}

Sphere sfCreateSphere(vec3 position, float radius, Material material)
{
	Sphere s;
	s.position = position;
	s.radius = radius;
	s.material = material;
	return s;
}

bool sfSphereTestRay(Sphere s, Ray r, float tMin, float tMax, out HitRecord h)
{
	vec3 originToCenter = r.origin - s.position;
	// solve quadratic equation
	float a = dot (r.direction, r.direction);
	float b = dot(originToCenter, r.direction);
	float c = dot(originToCenter, originToCenter) - s.radius*s.radius;
	float discriminant = b*b - a*c;
	if (discriminant > 0.0) {
		float t = (-b - sqrt(discriminant)) / a;
		if (t < tMax && t > tMin) {
			h.t = t;
			h.P = sfRayOffset(r, t);
			h.N = (h.P - s.position) / s.radius;
			return true;
		}
		t = (-b - sqrt(discriminant)) / a;
		if (t < tMax && t > tMin) {
			h.t = t;
			h.P = sfRayOffset(r, t);
			h.N = (h.P - s.position) / s.radius;
			return true;
		}
	}
	return false;
}

// Simple Sphere Scenegraph

const int MaxSpheres = 16;
Sphere Spheres[MaxSpheres];
int SphereCount = 0;

void sfAddSphere(Sphere sphere)
{
	if (SphereCount >= MaxSpheres)
		return;
	Spheres[SphereCount] = sphere;
	SphereCount++;
}

void test_ray()
{
	Ray r = sfCreateRay(vec3(0.0, 0.0, 0.0), vec3(1.0, 0.0, 0.0));
}

// Shaders

vec3 sfShadeSky(Ray r)
{
	float t = 0.5 * (r.direction.y + 1.0);
	return (1.0 - t) * ArneWhite + t * ArneSkyBlue;
}

vec3 sfBounce1(Ray r)
{
	HitRecord h = sfCreateHitRecord(1e6, vec3(0.0), vec3(0.0));
	int hit = -1;
	float t_min = 0.0;
	float t_max = 1e6;
	vec3 Kd;
	for (int i = 0; i < MaxSpheres; i++)
	{
		if (i >= SphereCount) break;
		if (sfSphereTestRay(Spheres[i], r, t_min, t_max, h))
		{
			t_max = h.t;
			hit = i;
		}
	}
	for (int i = 0; i < MaxSpheres; i++)
	{
		if (hit == i)
		{
			return Spheres[i].material.Kd;
		}
	}
	return sfShadeSky(r);
}

vec3 sfBounce2(Ray r)
{
	HitRecord h = sfCreateHitRecord(1e6, vec3(0.0), vec3(0.0));
	int hit = -1;
	float t_min = 0.0;
	float t_max = 1e6;
	vec3 Kd;
	for (int i = 0; i < MaxSpheres; i++)
	{
		if (i >= SphereCount) break;
		if (sfSphereTestRay(Spheres[i], r, t_min, t_max, h))
		{
			t_max = h.t;
			hit = i;
		}
	}
	for (int i = 0; i < MaxSpheres; i++)
	{
		if (hit == i)
		{
			Ray reflectedRay = sfCreateRay(
				h.P,
				reflect(r.direction, h.N)
				);
			return Spheres[i].material.Kd * sfBounce1(reflectedRay);
		}
	}
	return sfShadeSky(r);
}

vec3 sfBounce3(Ray r)
{
	HitRecord h = sfCreateHitRecord(1e6, vec3(0.0), vec3(0.0));
	int hit = -1;
	float t_min = 0.0;
	float t_max = 1e6;
	vec3 Kd;
	for (int i = 0; i < MaxSpheres; i++)
	{
		if (i >= SphereCount) break;
		if (sfSphereTestRay(Spheres[i], r, t_min, t_max, h))
		{
			t_max = h.t;
			hit = i;
		}
	}
	for (int i = 0; i < MaxSpheres; i++)
	{
		if (hit == i)
		{
			Ray reflectedRay = sfCreateRay(
				h.P,
				reflect(r.direction, h.N)
				);
			return Spheres[i].material.Kd * sfBounce2(reflectedRay);
		}
	}
	return sfShadeSky(r);
}

vec3 sfRayTrace(Ray r)
{
	HitRecord h = sfCreateHitRecord(1e6, vec3(0.0), vec3(0.0));
	int hit = -1;
	float t_min = 0.0;
	float t_max = 1e6;
	vec3 Kd;
	for (int i = 0; i < MaxSpheres; i++)
	{
		if (i >= SphereCount) break;
		if (sfSphereTestRay(Spheres[i], r, t_min, t_max, h))
		{
			t_max = h.t;
			hit = i;
		}
	}
	for (int i = 0; i < MaxSpheres; i++)
	{
		if (hit == i)
		{
			Ray reflectedRay = sfCreateRay(
				h.P,
				reflect(r.direction, h.N)
				);
			return Spheres[i].material.Kd * sfBounce3(reflectedRay);
		}
	}
	return sfShadeSky(r);
}

vec4 Sunfish()
{
	vec2 uv = vec2(VS_TexCoord.s, 1.0 - VS_TexCoord.t);
	vec3 lower_left_corner = vec3(-2.0, -1.0, -1.0);
	vec3 horizontal = vec3(4.0, 0.0, 0.0);
	vec3 vertical = vec3(0.0, 2.0, 0.0);
	Ray r = sfCreateRay(vec3(0.2, 0.5, 0.9), lower_left_corner + vec3(4.0 * uv.s, 2.0 * uv.t, 0.0));
	return vec4(sfRayTrace(r), 1.0);
}

// END SUNFISH GLSL RAY TRACER ///////////////////////////////////////

void CreateScene()
{
	Spheres[0] = sfCreateSphere(vec3(2.0, 0.0, -4.0), 0.5,
		sfCreateMaterial(ArneRed, ArneBlack, 0.0));
	Spheres[1] = sfCreateSphere(vec3(0.0, -100.5, -4.0), 100.0,
		sfCreateMaterial(ArneBrown, ArneBrown, 0.0));
	SphereCount = 2;
}

void main(void)
{
    // vec3 V = normalize(VS_CameraDir);
    // vec3 L = normalize (LightDir);
    // vec3 N = normalize (VS_Normal);
    // float NdotL = max(0.0, dot(N, L));
    // gl_FragColor = NdotL * vec4(VS_Color.rgb,1.0);//vec4(1.0,1.0,1.0,1.0) * NdotL;// + texture2D(Texture2D, VS_TexCoord.st);
    // gl_FragColor = textureCube(TextureCube, vec3(-1.0, VS_TexCoord.s, VS_TexCoord.t));
    //gl_FragColor = texture2D(Texture2D, VS_TexCoord.st);
    CreateScene();
    gl_FragColor = Sunfish();
}
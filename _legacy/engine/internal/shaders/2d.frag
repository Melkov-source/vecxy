#version 300 es

precision mediump float;

uniform vec4 u_color;
uniform sampler2D u_texture;

in vec2 v_texture_coords;

out vec4 frag_color;

void main() 
{
    vec4 texture = texture(u_texture, v_texture_coords);
    frag_color = texture * u_color;
}
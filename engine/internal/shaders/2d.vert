#version 300 es
    
precision mediump float;

uniform vec2 u_resolution;

in vec2 a_position;
in vec2 a_texture_coords;

out vec2 v_texture_coords;

void main() 
{
    v_texture_coords = a_texture_coords;
    
    vec2 zero_to_one = a_position / u_resolution;

    vec2 zero_to_two = zero_to_one * 2.0;

    vec2 clip_space = zero_to_two - 1.0;

    clip_space.y *= 1.0;

    gl_Position = vec4(clip_space, 0.0, 1.0);
}
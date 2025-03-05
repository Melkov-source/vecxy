precision mediump float;

attribute vec2 a_position;
attribute vec3 a_color;

uniform vec2 u_resolution;

varying vec3 v_color;

void main() {
    v_color = a_color;

    vec2 zero_to_one = a_position / u_resolution;

    vec2 zero_to_two = zero_to_one * 2.0;

    vec2 clip_space = (zero_to_two - 1.0) * vec2(1, -1);

    gl_Position = vec4(clip_space, 0, 1);
}
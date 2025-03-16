#version 300 es

precision mediump float;

uniform mat3 u_transform_matrix;

in vec2 a_position;        // Позиция вершины
in vec2 a_texture_coords;   // Координаты текстуры

out vec2 v_texture_coords;  // Передача текстурных координат во фрагментный шейдер

void main() 
{
    v_texture_coords = a_texture_coords;
    gl_Position = vec4((u_transform_matrix * vec3(a_position, 1.0)).xy, 0.0, 1.0);
}
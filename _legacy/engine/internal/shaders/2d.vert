#version 300 es

precision mediump float;

uniform mat3 u_projection_matrix;  // Матрица проекции
uniform mat3 u_transform_matrix;   // Матрица трансформации

in vec2 a_position;               // Позиция вершины
in vec2 a_texture_coords;          // Координаты текстуры

out vec2 v_texture_coords;         // Передача текстурных координат во фрагментный шейдер

void main() 
{
    v_texture_coords = a_texture_coords;
    
    // Умножаем проекционную и трансформационную матрицы
    mat3 finalMatrix = u_projection_matrix * u_transform_matrix;
    
    // Применяем финальную матрицу
    gl_Position = vec4(finalMatrix * vec3(a_position, 1.0), 1.0);
}
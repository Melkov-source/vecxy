import { Matrix3 } from "./matrix3";

const matrix_1 = new Matrix3();
const matrix_2 = new Matrix3();

matrix_2._value[1] = 2;

console.log(matrix_1.is_identity());
console.log(matrix_2.is_identity());

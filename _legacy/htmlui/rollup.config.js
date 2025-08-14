import typescript from "@rollup/plugin-typescript";
import del from 'rollup-plugin-delete'; 

export default {
    input: "src/htmlui.ts",         
    output: [
        {
            file: "dist/htmlui.mjs",      
            format: "es",                
            sourcemap: true             
        },
        {
            file: "dist/htmlui.cjs",      
            format: "cjs",              
            sourcemap: true              
        }
    ],
    plugins: [
        typescript({                    
            tsconfig: "./tsconfig.json" 
        }),

        del({ targets: 'dist/*' }), 
    ],
    external: [
        "reflect-metadata"
    ]
};

export class Color {
    private _r: number = 0;
    private _g: number = 0;
    private _b: number = 0;
    private _a: number = 0;

    public static white(): Color { return new Color(255, 255, 255); }
    public static black(): Color { return new Color(0, 0, 0); }
    public static red(): Color { return new Color(255, 0, 0); }
    public static green(): Color { return new Color(0, 255, 0); }
    public static blue(): Color { return new Color(0, 0, 255); }

    public static fromHex(rrggbbaa: string): Color {
        let hex = rrggbbaa.trim();

        hex = hex.replace('#', '');

        const r16 = hex.substring(0, 2);
        const g16 = hex.substring(2, 4);
        const b16 = hex.substring(4, 6);
        const a16 = hex.substring(6, 8);

        const r0255 = Number.parseInt(r16, 16);
        const g0255 = Number.parseInt(g16, 16);
        const b0255 = Number.parseInt(b16, 16);
        let a0255 = Number.parseInt(a16, 16);

        if(Number.isNaN(a0255)) {
            //Set default alpha value
            a0255 = 255;
        }

        return new Color(r0255, g0255, b0255, a0255);
    }

    public constructor(r: number, g: number, b: number, a: number = 255) {
        this._r = Math.round(r);
        this._g = Math.round(g);
        this._b = Math.round(b);
        this._a = Math.round(a);
    }

    public r0255(): number { return this._r; }
    public r01(): number { return this._r / 255; }

    public g0255(): number { return this._g; }
    public g01(): number { return this._g / 255; }

    public b0255(): number { return this._b; }
    public b01(): number { return this._b / 255; }

    public a0255(): number { return this._a; }
    public a01(): number { return this._a / 255; }

    public toArray(): number[] {
        return [
            this.r01(), 
            this.g01(), 
            this.b01(), 
            this.a01()
        ]
    }

    public toFloat32Array(): Float32Array {
        return new Float32Array(this.toArray());
    }
}
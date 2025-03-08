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
}
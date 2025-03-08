export class Color {
    public r: number;
    public g: number;
    public b: number;
    public a: number;

    public static white(): Color { return new Color(1, 1, 1); }
    public static black(): Color { return new Color(0, 0, 0); }
    public static red(): Color { return new Color(1, 0, 0); }
    public static green(): Color { return new Color(0, 1, 0); }
    public static blue(): Color { return new Color(0, 0, 1); }

    public constructor(r: number, g: number, b: number, a: number = 1) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
}
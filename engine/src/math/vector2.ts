export class Vector2 {
    public declare x: number;
    public declare y: number;

    //Initialization
    public constructor();
    public constructor(vector: Vector2)
    public constructor(x: number, y: number)

    public constructor(...paramters: any[]) {
        const count = paramters.length;

        switch (count) {
            case 0:
                this.x = 0;
                this.y = 0;
                break;

            case 1:
                const vector: Vector2 = paramters[0];

                this.x = vector.x;
                this.y = vector.y;
                break;

            case 2:
                this.x = paramters[0];
                this.y = paramters[1];
                break;

        }
    }


    public getLength(): number {
        const length = Math.sqrt(this.x ** 2 + this.y ** 2);

        return length;
    }
}
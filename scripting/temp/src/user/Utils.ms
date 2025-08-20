#import Console;

fn::void Test() {
    Console::Log("Utils file at module testing...");
}

fn::int SumInt(int a, int b) {
    return a + b;
}

#export {
    Test,
    SumInt
}
#import Console;

fn::int Tester() {
    Console::Log("Tester2");

    return 8;
}

fn::int Test() {
    Console::Log("Test");

    int t = Tester();

    return t;
}

fn::int Main() {
    int c = Test();

    return c;
}
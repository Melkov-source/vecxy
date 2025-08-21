#import Console;

fn::int Tester() {
    Console::Log("Tester2");

    int var = 10;

    Console::Log(var);

    return var;
}

fn::int Test() {
    int t = Tester();

    Console::Log(t);

    return t;
}

fn::int Main() {
    int c = Test();

    return c;
}
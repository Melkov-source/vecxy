#import Console;

fn::int Test() {
    Console::Log("Test");

    return 0;
}

fn::int Main() {
    Test();

    Console::Log("Hello World");

    int age = 50;

    Test();
    Test();

    return age;
}
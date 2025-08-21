#import Console;

fn::int Test() {
    Console::Log("Test");
}

fn::int Main() {
    Console::Log("Hello World");

    int age = 50;

    Test();

    return age;
}
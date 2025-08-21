#import Console;

fn::string Test2() {
    Console::Log("Test2");
}

fn::string Test() {
    Console::Log("Test");

    return "Test Result";
}

fn::string Main() {
    Test();

    string test = Test();

    Console::Log("Hello World");

    Test();

    return test;
}
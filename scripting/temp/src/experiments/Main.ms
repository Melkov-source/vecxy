#import Console;
#import User;
#import "./Utils.ms" to Utils;

/* 
    Variant 2

    #import "./Utils" to {
        Test,
        SumInt
    }
*/


fn::int Main(string[] Args) {
    auto petya = new User::Model("Petya2000_xyz")
    {
        Age = 25,
        Name = "Petya"
    };

    auto controller = new User::Controller(petya);

    Console::Log("Hello World");
    auto name = Console::Input("Enter name: ");

    if(petya:age > 18) {
        Console::Log("Petya is Man! age: ", petya:age);
    } else {
        Console::Log("Petya is Boy! age: ", petya:age);
    }

    int newAge = Utils::SumInt(petya:Age, 10);

    Console::Log("New Age: ", newAge);

    return 0;
}


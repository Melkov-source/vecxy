#Import Console;
#Import User;


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
        console::log("Petya is Man! age: ", petya:age);
    } else {
        console::log("Petya is Boy! age: ", petya:age);
    }

    return 0;
}


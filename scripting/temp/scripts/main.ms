#import console;

#import json to {
    json,
    json_serialize,
    json_deserialize
    #json
};

#json
pack user {
    public int age;
    public string name;
    public string username;

    public pack::ctor(string username) {
        pack:username = username;
    }
}

fn::int main(string[] args) {
    auto petya = user::ctor("Petya2000_xyz")
    {
        age = 25,
        name = "Petya"
    };

    console::log("Hello World");
    auto name = console::input("Enter name: ");

    return 0;
}
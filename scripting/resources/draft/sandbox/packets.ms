#import "console" {
    fn::log
}

#import "reflection" {
    pack::type
}

mix to_string {
    fn::string to_string();
}

pack animal {
    private string _name;

    protected pack::ctor(string name) {
        _name = name;
    }

    public fn::void say() {
        log("Animal Base!");
    }

    protected fn::string get_name() {
        return _name;
    }
}

pack::lock rabbit::animal(name) add mix::to_string {
    public pack::ctor(string name) { }

    public override fn::void say() {
        pack.say();

        log("Rabbit!);
    }

    public fn::string to_string() {
        string name = get_name();

        return name;
    }
}

pack::lock pig::animal("Pepa") {
    public override fn::void say() {
        log("Pig!");
    }
}

fn::int main() {
    pack::animal rabbit = pack::rabbit::new("Crosh");
    pack::animal pig = pack::pig::new();

    pack::animal[] animals = [
        rabbit,
        pig
    ];

    for(int i = 0; i < animals.lenght; i++) {
        log(i);

        pack::animal animal = animals[i];

        const auto animal = animals[i];

        animal.say();
    }

    for(pack::animal animal of animals) {
        animal.say();

        if(animal.pack is pack::rabbit) {
            pack::rabbit rabbit = animal to pack::rabbit;

            rabbit.say();

            log(rabbit.to_string());
        }
    }

    return 0;
}

#export {
    pack::pig,
    pack::animal,
    pack::pig
    mix::to_string
}
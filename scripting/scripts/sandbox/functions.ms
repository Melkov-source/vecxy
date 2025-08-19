#import "console" {
    log
}

fn::int get_id() {
    return 45;
}

fn::string get_name() {
    return "Vasya";
}

fn::float get_price() {
    return 12.79;
}

fn::void print_log() {
    int id = get_id();
    string name = get_name();
    float price = get_price();

    log("Id: ", id, ",");
    log("Name: ", name, ",");
    log("Price: ", price);
}

fn::void test(int i, string s, float f) {
    
}
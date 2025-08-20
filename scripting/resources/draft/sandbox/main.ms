#import "console" {
    log, 
    input
}

#import "./functions.ms" {
    get_id,
    get_name,
    get_price,
    print_log
}

fn::int main() {
    int i = 10;
    float j = 15.99;
    string k = "Hello World";

    log(i);
    log(j);
    log(k);

    string result = input("Enter: ");

    log("data: ", result);

    bar_1();

    result 4;
}
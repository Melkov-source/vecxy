#import "console" {
    log,
    err,
    warn
}

#import "./json" {
    json
}

fn::int main() {
    pack test {
        public string name;
    };

    auto data = pack::test::new();

    const json_str = json::serialize(data);

    log(json_str);

    auto value = json::deserialize(json);

    auto result = value:to_pack::test();

    log(result:test);

    return 0;
}
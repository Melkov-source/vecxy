#import "./lexer.ms" {
    lexer
}

#import "./parser.ms" {
    parser
}

fn::string json_serialize(const pack data) {
        return "";
    }

fn::json json_deserialize(const string json) {
    token[] tokens = lexer::lex(json);

    parser::parse(tokens);
}

pack json {
    public fn::json_value get(string name) {

    }

    public fn::T_PACK to_pack::T_PACK::pack() {
        pack temp = null;

        return temp;
    }

    pack json_value {
        private string _value;

        pack::ctor(string value) {
            _value = value;
        }

        fn::string to_string() {
            return _value;
        }

        fn::bool to_bool() {
            return true;
        }

        fn::int to_int() {
            return -1;
        }
    }
}

#export {
    json,
    json_serialize,
    json_deserialize
}
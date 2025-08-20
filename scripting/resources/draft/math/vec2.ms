pack vec2 {
#public:
    float x;
    float y;

    fn::ctor(float x, float y) {
        x = x;
        y = y;
    }

    fn::vec2 add(vec2 vec) {
        const result = vec2(vec.x + x, vec.y + y);

        return result;
    }

#private:
    fn::void test() {
    }
};

#export {
    vec2
}


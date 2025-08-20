#module User;

pack Controller {
    private Model _user;

    public pack::ctor(Model user) {
        _user = user;
    }

    public fn::string GetUserName() {
        return _user:UserName;
    }
}

#export {
    Controller
}

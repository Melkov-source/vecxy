#import Json;
#import Console;    

#module User {

    ##Json::Contract
    pack Model {
        ##Json::Member { name = "age" }
        public int Age;

        ##Json::Member { name = "name" }
        public string Name;

        ##Json::Member { name = "username" }
        public string UserName;

        public pack::ctor(string userName) {
            UserName = userName;
        }

        public fn::void Say(string text) {
            Console::Log("I'm ", Name, " Say: ", text);

            string json = Json::Serialize(pack);

            Console::Log(json);

            User user = Json::Deserialize::User(json);

            Console::Log(user:UserName);
        }
    }

}

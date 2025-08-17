#import "system" { log }
#import "vecxy" { component, #field };
#import "vecxy::ui" { button, label };

class menu : component {
#private:
    #field button start_button;

    #field label title_label;

    float counter;

#public:
    fn::void start() {
        start_button.on_click(on_start);
    }

    fn::void update(float dt) {
        counter += dt;

        title_label.text = counter;
    }

#private:
    fn::void on_start() {
        log("Menu: Start");
    }
}

#export {
    menu
}
import Text "mo:base/Text";

actor class Main() = self {
    public query func greet(name : Text : Text) : async Text {
        return "Hello, " # name # "!";
    };
};
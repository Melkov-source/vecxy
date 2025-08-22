kind token_type {
    NONE = 0,
    IDENTIFIER = 1,
}

pack token {
    public token_type type;
}

#export {
    token_type,
    token
}
# Basic Type Tracer in JS

This is a prototype type Tracer for JavaScript. What does it do? It can tell you the return types and intermediate types for any variable in a function / program.


### What's there

- A somewhat unusable half API which supports most of the basic language features and has a way to describe `Types`.
- Incomplete type description for builtin types (missing stuff like `.length` on strings)
- Support for tracing functions and methods
- Support for contexts and scopes in function calls

### What's missing

- A lot of type information for builtins
- Better API's to create functions and types
- Pre-parser to analize source and create Classes from Prototypes etc.
- Support for Loops, Switches as well as Map and Array Types
- Lots and lots more


## License

**Box** is licenses under MIT.


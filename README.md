# E-Commerce
A React based e-commerce application to explore solutions of prop drilling.

Ways to get rid of prop drilling:

1. Component composition

- solves the problem only upto certain extent, helping us getting rid of only some layers in prop drilling.
- involves moving a lot of code into the app component (or the topmost level parent component), thus causing it to bloat.

2. Context API

- solves the problem of prop drilling end to end.
- create context values which are linked to state and can be used by multiple components.

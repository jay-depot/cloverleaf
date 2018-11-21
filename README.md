Cloverleaf
==========

Redux on the back-end. OK, not exactly.

A model framework based on the Flux design pattern. The overall concept is that an application using
Cloverleaf requests a state fragment snapshot using a selector, and can then dispatch actions against
that snapshot, which will be parsed by a series of reducers before the final state snapshot is 
discarded or committed to the backing store

Designed to work with Turnpike.

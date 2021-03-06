[![Build Status](https://travis-ci.org/jay-depot/cloverleaf.svg?branch=master)](https://travis-ci.org/jay-depot/cloverleaf) [![Maintainability](https://api.codeclimate.com/v1/badges/ad1b7e18537df5f094f7/maintainability)](https://codeclimate.com/github/jay-depot/cloverleaf/maintainability) [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjay-depot%2Fcloverleaf.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjay-depot%2Fcloverleaf?ref=badge_shield)

# Cloverleaf

Redux on the back-end. OK, not exactly.

A model framework based on the Flux design pattern. The overall concept is that an application using
Cloverleaf requests a state fragment snapshot using a selector, and can then dispatch actions against
that snapshot, which will be parsed by a series of reducers before the final state snapshot is
discarded or committed to the backing store

Designed to work with Turnpike.

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjay-depot%2Fcloverleaf.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjay-depot%2Fcloverleaf?ref=badge_large)

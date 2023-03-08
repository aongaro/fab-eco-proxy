# FAB Eco Proxy

This project creates printable ink/toner saving proxies. This is for everyone that wants to proxy cards for testing purpose or is waiting for their cards to arrive in the mail.

# Special thanks

This project was inspired by the awesome work of [fab-proxy](https://cgilling.github.io/fab-proxy/).
The cards list is a JSON generated from [The Fab Cube](https://github.com/the-fab-cube/flesh-and-blood-cards) csv and made into a beautiful ts package by [FaBrary](https://github.com/fabrary/fab-cards).

# Query params

To pre-fill cards use the query param `?id=FABCARD_ID1,FABCARD_ID2,...,FABCARD_IDn`, where `FABCARD_IDi` is a card collector's number (you can use any reprint collector's number). When adding a double-sided card, both sides are added.

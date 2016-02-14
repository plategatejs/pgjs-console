# pgjs-console

[PlateGateJS](https://github.com/plategatejs/pgjs-docs) module for system management. 

## Summary

This module:

* Exposes Rest Api for plates' management (adding and removing them) and authentication checks
* Proxies [pgjs-gate](https://github.com/plategatejs/pgjs-gate) and [pgjs-camera](https://github.com/plategatejs/pgjs-camera) Rest Apis

Api:

* Plates to check should be _JSON_ array of strings
* Plates to add must be _JSON_ objects, containing string _identifier_ field

## Basic setup

Node.js ~5.0.0+ and Npm are required.

```
npm install
npm start
```

## License
[MIT](license.md)

# Changelog

Note: AvionDB follows [semver](https://semver.org/). We are currently in alpha: backwards-incompatible changes may occur in minor releases.

## v0.2.3

### Features

- [Full TypeScript Support](https://github.com/dappkit/aviondb/pull/40)
- [Allow path config on init & fix path issues with listDatabases](https://github.com/dappkit/aviondb/pull/25)
- [Allow empty query for find() & findOne()](https://github.com/dappkit/aviondb/commit/dd3a9ddcdda28f385c10e66ce6a47048f12eb758)
- [Move AvionDB Collection to class definition](https://github.com/dappkit/aviondb/pull/32)
- [Add sort cursor method](https://github.com/dappkit/aviondb/pull/38)

## v0.2.2

### Bug Fixes

- [Replaced options with orbitdbOptions](https://github.com/dappkit/aviondb/commit/2ca5af5ebe23c8314fe3589eb6fe5fca726e0270)
- [Fixed limit cursor method](https://github.com/dappkit/aviondb/commit/547e3d52c6b9198a53e3c4b0e9af1bcd62825380)

### Features

- [Add skip cursor method](https://github.com/dappkit/aviondb/commit/547e3d52c6b9198a53e3c4b0e9af1bcd62825380)

## v0.2.1

### Bug Fixes

- Fixed [#14](https://github.com/dappkit/aviondb/issues/14), which resolves the `OpenError: IO error: lock orbitdb/Qm.../keystore/LOCK: already held by process` error.

### Features

- [Support for Cursor Methods](https://github.com/dappkit/aviondb/issues/12)
- [Support to List Databases](https://github.com/dappkit/aviondb/commit/8017114038ed8200f9748e8714ae6f04c8675d97)
- [Support to import & export collection data in various data formats](https://github.com/dappkit/aviondb/commit/23456b557ffde23bdeffa598d3097b816aeb1325)

## v0.2.0

### Bug Fixes

- Fixed [#9](https://github.com/dappkit/aviondb/issues/9). We are now able to list the collections using `db.listCollections()`.
- Fixed [#11](https://github.com/dappkit/aviondb/issues/11).
  - Empty query operators `find({})` return all the documents in the collection.
  - If none of the documents match the query criteria, then `findOne` returns `null`.
  - If none of the documents match the query criteria, then `find` returns `[]`.

### Breaking Changes

- The signatures of the following functions have changed:
  - [`createCollection`](https://github.com/dappkit/aviondb/blob/master/API.md#aviondbcreateCollection)
  - [`openCollection`](https://github.com/dappkit/aviondb/blob/master/API.md#aviondbopenCollection)
  - [`create`](https://github.com/dappkit/aviondb/blob/master/API.md#create)
  - [`open`](https://github.com/dappkit/aviondb/blob/master/API.md#open)

### Features

- [Collection - binding db namespacing](https://github.com/dappkit/aviondb/commit/f792b5fefbbebddce5de72ac4402a5f34b039998)
- Following new functions have been added:
  - [`init`](https://github.com/dappkit/aviondb/blob/master/API.md#init)
  - [`initCollection`](https://github.com/dappkit/aviondb/blob/master/API.md#aviondbinitCollection)

## v0.1.0

### Supported APIs

This is the first "test" release of AvionDB 🎉 You can find all the supported [APIs here](API.md).

## v0.1.1

- Minor fixes in update operators.
- Update README.md
- Update API.md

# Changelog

## 2.0.0

- **refactor(filter-stream):** Optimize performance
- **feat(read-stream):** Refactor & optimize BlockMap.ReadStream
  - **BREAKING:** Removed `.blockInRange` property
  - **BREAKING:** Rewrote `open()`, `close()` and `destroy()`
    to implement the same behavior as `fs.ReadStream`
  - **BREAKING:** `start` & `end` options will now cause only
    partially covered regions to **NOT** be read
  - **BREAKING:** Removed `.options`, add `.verify` instead
  - **feat:** Added `.closed` & `.destroyed` properties
  - **feat:** Added `.highWaterMark` getter/setter
  - **feat:** Support `autoClose` option
- **chore(package):** Add benchmarks
- **chore(package):** Update mocha 3.2.0 -> 3.4.2

## 1.2.0

- **fix(filter-stream):** Prevent emitting too small blocks

## 1.1.0

- **fix(read-stream):** Throw if [start,end] are OOB
- **feat(blockmap):** Add .createFilterStream()
- **feat(readstream):** Add `fd` option

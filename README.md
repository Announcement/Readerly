# Readerly

as requested by freenode@vitx

## WARNING

**DO NOT LOAD THIS PLUGIN WITH MULTIPLE TABS OPEN**

The plugin uses an excessive amount of RAM, 43 tabs will consume 3 gigabytes of ram.
With one tab open, the load time for the extension is around 1 minute, and grows very quickly depending on the amount of tabs opened.

## Caveat

In firefox the context menu reader works, but the full reader either doesn't work or more likely takes an excessive amount of time to initiate.

## Current tasks

- Make firefox performance not be terrible.
- Code refactoring is being done in `source/`


## Completed tasks

- Firefox is doing whatever Firefox is doing and that needs to be fixed.
- Chrome will exports `.crx` file for deployment.
- Most files in source are already perfected except a few.
  - `source/main.js` has a lot of old code in it due to complexity.
- Rollup and Webpack work on the new code and most code has been moved to es6 modules.
- API's have been updated in `source/`
- `source/` loads in firefox.

## Development

### Prepare the code.

``` command
git clone https://github.com/Announcement/Readerly
cd Readerly

npm install
```

## Update

If you already cloned the directory do this inside of it.

``` command
git stash
git pull
```

### Compile the code

- Any Operating System with Node.js installed.

``` command
npm run-script build
```

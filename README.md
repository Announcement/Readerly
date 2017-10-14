# Readerly

as requested by freenode@vitx

## Yikes! 
**iframe does not work in Firefox!**

## Current tasks

- Code refactoring is being done in `source/`
- Chrome will not export `.crx` file for deployment.
- Firefox is doing whatever Firefox is doing and that needs to be fixed.

## Completed tasks

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

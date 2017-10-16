# Readerly

as requested by freenode@vitx

the plugin itself is in `/distribution/`

## Current tasks

- Add support for the keyboard shortcuts.
- Make clicking the progress bar and jumping to a specific point possible.
- Code refactoring is being done in `source/`
- Remove transparency.
- Increase text font.

## Completed tasks

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

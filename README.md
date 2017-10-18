# Readerly

the plugin itself is in `/distribution/`

## Current tasks

- Make the text display (+ sort out the first word missing issue).
- Set the minimum height to iframe like it was in the old version to take care of an error.
- Fix the issue of buttons being colored according to current site colours.
- Add support for the keyboard shortcuts.  [enabled in manifest]
- Make clicking the progress bar and jumping to a specific point possible.
<<<<<<< Updated upstream
- Make the extension pause (and unpause) when the word area is clicked.
- Center all elements properly (buttons/words).
- Make rewind button work.
- Make delays from settings work (they don't seem to now).
- Color the center character red (optimal recognition point).
=======
>>>>>>> Stashed changes

## Completed tasks

- Remove transparency.
- Increase text font.
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

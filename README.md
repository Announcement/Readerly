# Readerly

as requested by freenode@vitx

## Current tasks

- Code refactoring is being done in `source/`
- Chrome will not export `.crx` file for deployment.
- Firefox is doing whatever Firefox is doing and that needs to be fixed.

## Development

### Prepare the code.

``` command
git clone https://github.com/Announcement/Readerly
cd Readerly

npm install
```

### Compile the code

You only need to do one of these.

#### Build with the Powershell

- Windows 10

``` powershell
./script/build.ps1
```

#### Build with the Command Prompt

- Windows NT

``` cmd
script\build.bat
```

#### Build with the Unix Shell

- Linux
- BSD
- MacOS

``` sh
script/build.sh
```

#### Build with npm

- Any Operating System with Node.js installed.

``` command
npm run-script build
```

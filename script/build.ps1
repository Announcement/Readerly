Set-Variable -Name bin -Value "$(npm bin)".Replace("$pwd\", '').Replace("\", '/')

Set-Variable -Name entry -Value "main.js"
Set-Variable -Name outfile -Value "bundle.js"

#Write-Output -InputObject "browserify $entry --outfile $outfile"
#Invoke-Expression -Command "$bin/browserify $entry --outfile $outfile"

#Copy-Item -Path .\original\* -Recurse -Exclude *.js -Destination .\distribution\
Copy-Item -Path .\original\background-spec.js -Destination .\distribution\

Invoke-Expression -Command "$bin/rollup -c -i original/main.js -o rolled.js"
Invoke-Expression -Command "$bin/webpack"

#./node_modules/.bin/rollup -c -i original/main.js -o rolled.js
#./node_modules/.bin/webpack

#Write-Output -InputObject "rollup -c -i $entry -o working/build.stage1.js"
#Invoke-Expression -Command "$bin/rollup -c -i $entry -o working/build.stage1.js"
#
#Write-Output -InputObject "webpack working/build.stage1.js working/build.stage2.js"
#Invoke-Expression -Command "$bin/webpack working/build.stage1.js working/build.stage2.js"
#
#Write-Output -InputObject "uglifyjs --compress --mangle --source-map --output working/build.stage3.js -- working/build.stage2.js"
#Invoke-Expression -Command "$bin/uglifyjs --compress --mangle --source-map --output working/build.stage3.js -- working/build.stage2.js"
#
#Write-Output -InputObject "working/build.stage3.js => bundle.js"
#Copy-Item working/build.stage3.js bundle.js

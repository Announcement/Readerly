Set-Variable -Name bin -Value "$(npm bin)".Replace("$pwd\", '').Replace("\", '/')

Set-Variable -Name entry -Value "main.js"
Set-Variable -Name outfile -Value "bundle.js"

Write-Output -InputObject "browserify $entry --outfile $outfile"
Invoke-Expression -Command "$bin/browserify $entry --outfile $outfile"

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

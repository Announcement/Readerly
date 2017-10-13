bin=$(npm bin)

entry=main.js
outfile=bundle.js

echo browserify $entry --outfile $outfile

$bin/browserify $entry --outfile $outfile


# echo "rollup -c -i $entry -o working/build.stage1.js
# $bin/rollup -c -i $entry -o working/build.stage1.js
#
# echo webpack working/build.stage1.js working/build.stage2.js
# $bin/webpack working/build.stage1.js working/build.stage2.js
#
# echo uglifyjs --compress --mangle --source-map --output working/build.stage3.js -- working/build.stage2.js
# $bin/uglifyjs --compress --mangle --source-map --output working/build.stage3.js -- working/build.stage2.js
#
# echo working/build.stage3.js => bundle.js
# cp working/build.stage3.js bundle.js

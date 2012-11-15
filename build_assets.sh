echo '..removing old: redistributable/assets/...'
rm -rf redistributable/assets

echo '..moving assets'
cp -r assets redistributable/assets

echo 'done'

#! /bin/bash

if [[ ! -f $1 ]]; then
  echo "Error! File does not exist"
  exit
fi
TITLE='<title>'
TITLE+=`awk -F '<h1>|</h1>' '{print $2}' $1`
TITLE+='</title>'
AUTHOR=`awk -F '<h2>|</h2>' '{print $2}' $1`
sed "s,<title>\s*<\/title>,\$TITLE,g" plantilla.html > $1.bak
echo $TITLE

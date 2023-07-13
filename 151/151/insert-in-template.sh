#! /bin/bash

if [[ ! -f $1 ]]; then
  echo "Error! File does not exist"
  exit
fi
ISSUENR=`pwd | awk -F "/" '{print $NF}'`
TITLELINE=`cat $1 | grep '<h1>'`
TITLE="${TITLELINE%</h1>}"
TITLE="${TITLE#<h1>}"
AUTHORLINE=`cat $1 | grep '<h2>'`
AUTHOR="${AUTHORLINE%</h2>}"
AUTHOR="${AUTHORLINE#<h2>}"
AUTHOR=`echo $AUTHOR | sed 's/^by\s*//I'`
AUTHOR=`echo $AUTHOR | sed 's/<a.*">\s*//I'`
AUTHOR=`echo $AUTHOR | sed 's/<strong>\s*//I'`
AUTHOR="${AUTHOR%%<*}"
echo $AUTHOR
IMGLINE=`cat $1 | grep img`
IMG=`echo $IMGLINE | sed 's/.*src=\"\(.*.jpg\)\".*/\1/'`
SUBTITLE=`cat $1 | grep '<h3>'` 
sed "s#<title>.*#<title>$TITLE<\/title>#" <plantilla.html >$1.bak
sed -i "s,\(.*og:title.*content=\"\).*\(\".*\),\1$TITLE\2," $1.bak
sed -i "s,\(.*author.*content=\"\).*\(\".*\),\1$AUTHOR\2," $1.bak
sed -i "s,\(.*og:url.*content=\"https:\/\/southerncrossreview.org\/\).*\(\".*\),\1$ISSUENR\/$1\2," $1.bak
sed -i "s,\(.*og:image.*content=\"https:\/\/southerncrossreview.org\/\).*\(\".*\),\1$ISSUENR\/$IMG\2," $1.bak
sed -i "/<header>/ a $TITLELINE\n$IMGLINE\n$AUTHORLINE\n$SUBTITLE\n" $1.bak
sed -i "s,\(Comment about\),\1 $AUTHOR - $TITLE," $1.bak
poem_func(){
echo "Is the file a poem? y/n"
read poem
if [[ $poem == "y" ]]; then
 sed -i "s/<main>/<main style=\"display:flex;flex-direction:column;align-items:center\">/" $1.bak
 sed -i "s,\(.*nav-category\">\).*\(<\/p>\),\1Poetry\2," $1.bak
 sed -i "s,\(^document\.write(\"Send us your comments about this\),\1 poem," $1.bak
 sed '/<main/q' $1.bak > first.bak
 sed '/<h1>\|<h2>/d' $1 > second.bak
 sed '0,/<main/d' $1.bak > third.bak
 cat first.bak > final.bak
 echo "<div>" >> final.bak
 cat second.bak >> final.bak
 echo "</div>" >> final.bak
 cat third.bak >> final.bak
elif [[ $poem == "n" ]]; then
  echo "What kind of file is it? (article, story, essay, etc..)"
  read kind
  sed -i "s,\(^document\.write(\"Send us your comments about this\),\1 $kind," $1.bak
  echo "Insert the category: (Fiction, Anthroposophy, Etc.)"
  read category
  sed -i "s,\(.*nav-category\">\).*\(<\/p>\),\1$category\2," $1.bak
  sed '/<main/q' $1.bak > first.bak
  sed '/<h1>\|<h2>/d' $1 > second.bak
  sed '0,/<main/d' $1.bak > third.bak
  cat first.bak > final.bak
  cat second.bak >> final.bak
  cat third.bak >> final.bak
else
  echo ""
  echo 'Please answer "y" or "n"'
  echo ""
  poem_func $1
fi
}
poem_func $1
tomdispatch(){
echo "Is this a TomDispatch.com file? y/n"
read tom
if [[ $tom == "y" ]]; then
  echo "Insert book cover filename:"
  read filename
  echo "Insert book title:"
  read booktitle
  NUMBER=`cat final.bak | grep 'Buy the Book' | sed 's/.*amazon.com\/dp\/\(\d\+\).*/\1/'`
  sed -i "s/.*\(https.*tag=tomdispatch-20\).*Buy the Book.*/<a target=\"_blank\" href=\"\1\">/" final.bak
  sed -i "/target=\"_blank\"/ a <div class=\"polaroid\">" final.bak
  sed -i "/class=\"polaroid\"/ a <img class=\"b\" src=\"$filename\" alt=\"$booktitle\" style=\"width:100%\">" final.bak
  sed -i "/img class=\"b\"/ a <div class=\"container\"><p>Buy the Book!<\/p><\/div><\/div><\/a>" final.bak
elif [[ $tom != "y" && $tom != "n" ]]; then
  echo "Please answer with 'y' or 'n'"
  tomdispatch
fi
}
tomdispatch
awk '!/img/ || !seen[$0]++' final.bak > final.final1
awk '!/<h3>/ || !seen[$0]++' final.final1 > final.final
rm *.bak
mv $1 $1.bak
mv final.final $1
rm final.final1
echo "Done!"

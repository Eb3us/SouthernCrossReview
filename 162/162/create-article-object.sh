#! /bin/bash
if [[ ! -f categoryOrder ]]; then
  echo "No \"categoryOrder\" file found..."
  echo "Exiting..."
  exit
fi

echo "Creating article objects..."

mapfile -t categories < categoryOrder
files=(*.html)
current_issue=${PWD##*/}
get_title(){
 TITLE=`cat $1 | grep 'og:title'`
 TITLE="${TITLE##*content}"
 TITLE="${TITLE#*\"}"
 TITLE="${TITLE%\"*}"
 echo "$TITLE"
}
get_category(){
 CATEGORY=`cat $1 | grep 'nav-category'`
 CATEGORY="${CATEGORY##*\">}"
 CATEGORY="${CATEGORY%<*}"
 echo "$CATEGORY"
}
get_author(){
 AUTHOR=`cat $1 | grep 'name="author"'`
 AUTHOR="${AUTHOR##*content}"
 AUTHOR="${AUTHOR#*\"}"
 AUTHOR="${AUTHOR%\"*}"
 echo "$AUTHOR"
}
get_image(){
 IMAGE=`cat $1 | grep 'og:image'`
 IMAGE="${IMAGE##*$current_issue/}"
 IMAGE="${IMAGE%\"*}"
 echo "$IMAGE"
}
get_paragraph(){
  PARAGRAPH=$(xmllint --html --xpath "string(/html/body/main//p[$1])" $2 2> /dev/null)
  PARAGRAPH=$(echo "$PARAGRAPH" | sed 's/"/\\"/g')
  echo $PARAGRAPH
}
create_article_object(){
  TITLE=$(get_title $1)
  AUTHOR=$(get_author $1)
  IMAGE=$(get_image $1)
  CATEGORY=$(get_category $1)
  P1=$(get_paragraph 1 $1)
  P2=$(get_paragraph 2 $1)
  P3=$(get_paragraph 3 $1)
  P4=$(get_paragraph 4 $1)
  echo "    {" > $1.ob
  echo "      \"title\": \"$TITLE\"," >> $1.ob
  echo "      \"sub-title\": \"\"," >> $1.ob
  echo "      \"author\": \"$AUTHOR\"," >> $1.ob
  echo "      \"description\":[" >> $1.ob
  echo "        \"$P1\"," >> $1.ob
  if [[ ${#P1} < 900 ]]; then
    echo "        \"$P2\"," >> $1.ob
  fi
  if (( ${#P1} + ${#P2} < 900 )); then
    echo "        \"$P3\"," >> $1.ob
  fi
  if (( (${#P1} + ${#P2} + ${#P3}) < 900 )); then
    echo "        \"$P4\"," >> $1.ob
  fi
  echo "      ]," >> $1.ob
  echo "      \"imgUrl\": \`\${prefix}$IMAGE\`," >> $1.ob
  echo "      \"link\": \`\${prefix}$1\`," >> $1.ob
  if [[ $CATEGORY == "Poetry" ]]; then 
    echo "      \"poem\": true," >> $1.ob
  else
    echo "      \"poem\": false," >> $1.ob
  fi
  echo "      \"mainImg\": false," >> $1.ob
  echo "    }," >> $1.ob
}

echo "import { prefix } from \"./variables.js\"" > articleObject.bak
echo "" >> articleObject.bak
echo "export const articles = {" >> articleObject.bak

create_category_section(){
  echo "  \"$1\": [" >> articleObject.bak
  for file in ${files[@]}; do
    CATEGORY=$(get_category $file)
    if [[ $file != "plantilla.html" && $file != "plantilla-TD.html" && $file != "letters$current_issue.html" && $file != "index$current_issue.html" && $CATEGORY == $1 ]]; then
     create_article_object $file 
     cat $file.ob >> articleObject.bak
    fi
  done
  echo "   ]," >> articleObject.bak
}

echo "Creating articleObject.bak..."

for category in "${categories[@]}";do
  create_category_section "${category}"
done

echo "}" >> articleObject.bak

echo "Cleaning..."

rm *.ob

echo "Done."
exit

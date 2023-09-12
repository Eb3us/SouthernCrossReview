#! /bin/bash
get_paragraph(){
  P=$(xmllint --html --xpath "string(/html/body/main/p[$1])" test1.html 2> /dev/null)
  echo $P
}
  

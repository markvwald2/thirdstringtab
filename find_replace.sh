#replace text1 with text
sed -i '.bak' 's/text1/text/g' data.js

#remove quotes from "id"
sed -i '.bak' 's/"id"/id/g' data.js

#remove quotes from "items"
sed -i '.bak' 's/"items"/items/g' data.js

#remove quotes from "url"
sed -i '.bak' 's/"url"/url/g' data.js

#remove quotes from "text"
sed -i '.bak' 's/"text"/text/g' data.js

#reformat first line
sed -i '.bak' 's/"bands": /var bands = /g' data.js

#remove left bracket from first line
sed -i '.bak' '1s/{//g' data.js

#reformat last line
sed -i '.bak' '$ s/.$/;/' data.js

#remove unnecessary .bak file
rm data.js.bak
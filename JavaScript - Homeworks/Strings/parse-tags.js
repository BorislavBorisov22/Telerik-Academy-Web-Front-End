function Solve(args) {
    let text = args[0],
        tagsStore = [],
        result = "",
        isInTag = false,
        currentTag = "";


    for (let i = 0; i < text.length; i += 1) {
        if (text[i] === "<") {
            isInTag = true;
        } else if (text[i] === ">" && isInTag) {
            isInTag = false;
            currentTag += ">";
            tagsStore.push(currentTag);
            currentTag = "";
        }

        if (!isInTag && text[i] !== ">") {

            let lastTag = tagsStore[tagsStore.length - 1];
            if (lastTag === "<upcase>") {
                result += text[i].toUpperCase();
            } else if (lastTag === "<lowcase>") {
                result += text[i].toLowerCase();
            } else {
                result += text[i];
            }
        }

        if (isInTag) {
            currentTag += text[i];
        }

        if (tagsStore.length !== 0 && tagsStore[tagsStore.length - 1].indexOf("</") !== -1) {
            tagsStore.pop();
            tagsStore.pop();
        }
    }

    console.log(result);

}

//Solve(['We are <orgcase><upcase>liViNg</upcase></orgcase> in a <upcase>yellow submarine</upcase>. We <orgcase>doN\'t</orgcase> have <lowcase>anything</lowcase> else.']);
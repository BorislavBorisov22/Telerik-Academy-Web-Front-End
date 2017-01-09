  function stringFormat(template) {
      let result = "",
          isInPlaceHolder = false;
      for (let i = 0; i < template.length; i += 1) {
          if (template[i] === "{" && i + 2 < template.length && !isNaN(+template[i + 1]) && template[i + 2] === "}") {
              if (+template[i + 1] + 1 < arguments.length) {
                  result += arguments[+template[i + 1] + 1];
                  i += 2;
              } else {
                  result += template[i];
              }
          } else {
              result += template[i];
          }
      }

      return result;
  }

  let result = stringFormat("My name is {0} {1}, and I am {2} years old", "Borislav", "Borisov", 20);
  console.log(result);
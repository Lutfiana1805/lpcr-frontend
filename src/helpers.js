var helpers = {};

/* 
 * Parse a JSON string to an object in all cases, without throwing
 * */
helpers.parseJsonToObject = function(str){
  try{
    var obj = JSON.parse(str);
    return obj;
  } catch(e){
    return {};
  }
};

/* 
 * Create a random alphanumeric string
 * */
helpers.createRandomString = function(strLength){
  strLength = typeof(strLength) == 'number' && strLength > 0 ? strLength : false;
  if(strLength){
    let possibleCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let str = '';
    for(i = 1; i <= strLength; i++) {
        let randomCharacter = possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
        str+=randomCharacter;
    }
    return str;
  } else {
    return false;
  }
};

/*
 * form serialize
 * */
helpers.serialize = function (form) {
  var serialized = [];
  for (var i = 0; i < form.elements.length; i++) {
    var field = form.elements[i];
    if (!field.name || field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') continue;
    if (field.type === 'select-multiple') {
      for (var n = 0; n < field.options.length; n++) {
        if (!field.options[n].selected) continue;
          serialized.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.options[n].value));
        }
    } else if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
      serialized.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value));
    }
  }
  return serialized.join('&');
};

/*
 * QueryStringToJSON
 * */
helpers.QueryStringToJSON = function(str) {
  var pairs = str.split('&');
  var result = {};
  pairs.forEach(function(pair) {
    pair = pair.split('=');
    var name = pair[0];
    var value = pair[1];
    if(name.length)
    if (result[name] !== undefined) {
      if (!result[name].push) {
        result[name] = [result[name]];
      }
      result[name].push(value || '');
    } else {
      result[name] = value || '';
    }
  });
  return( result );
};

export default helpers;
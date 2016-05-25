(function (app, console, document, angular) {
  function FuzzySearcher(items) {
    this.items = items;
    this.length = items.length;
    this.lowerCasedItems = [];
    for (var i = 0; i < this.length; i++) {
      this.lowerCasedItems.push(items[i].toLowerCase());
    }
    this.index = this.createIndex();
    this.index2 = this.createIndex2();
    this.dumpIndex();
    this.dumpIndex2();
  }

  FuzzySearcher.prototype.createIndex = function () {
    var items = this.lowerCasedItems,
            length = this.length,
            i = 0, j = 0,
            index = {},
            word,
            wordLength,
            uniqueLettersInWord,
            letter;
    for (i = 0; i < length; i++) {
      word = items[i];
      wordLength = word.length;
      uniqueLettersInWord = {};
      for (var j = 0; j < wordLength; j++) {
        letter = word[j];
        if (!uniqueLettersInWord[letter]) {
          uniqueLettersInWord[letter] = true;
          if (!index[letter]) {
            index[letter] = [i];
          } else {
            index[letter].push(i);
          }
        }
      }
    }
    return index;
  };

  FuzzySearcher.prototype.createIndex2 = function () {
    var items = this.lowerCasedItems,
            length = this.length,
            i = 0, j = 0,
            index = {},
            word = "",
            wordLength = 0,
            uniqueLettersInWord = {},
            uniqueLettersInRestOfWord = {},
            letter = "",
            index2 = {},
            k = 0,
            restOfWord = "",
            restOfWordLength = 0;
    for (i = 0; i < length; i++) {
      word = items[i];
      wordLength = word.length;
      uniqueLettersInWord = {};
      for (var j = 0; j < wordLength - 1; j++) {
        letter = word[j];
        if (!uniqueLettersInWord[letter]) {
          uniqueLettersInWord[letter] = true;
          restOfWord = word.substr(j + 1);
          restOfWordLength = restOfWord.length;
          if (!index[letter]) {
            index2 = index[letter] = {};
          } else {
            index2 = index[letter];
          }
          uniqueLettersInRestOfWord = {};
          for (k = 0; k < restOfWordLength; k++) {
            letter = restOfWord[k];
            if (!uniqueLettersInRestOfWord[letter]) {
              uniqueLettersInRestOfWord[letter] = true;
              if (!index2[letter]) {
                index2[letter] = [i];
              } else {
                index2[letter].push(i);
              }
            }
          }
        }
      }
    }
    return index;
  };

  FuzzySearcher.prototype.dumpIndex = function () {
    var index = this.index;
    var humanReadableIndex = {};
    for (var key in index) {
      humanReadableIndex[key] = [];
      for (var i = 0; i < index[key].length; i++) {
        humanReadableIndex[key].push(this.items[index[key][i]]);
      }
    }
    console.table(humanReadableIndex);
  };

  FuzzySearcher.prototype.dumpIndex2 = function () {
    var index = this.index2,
            twoLetters;
    var humanReadableIndex = {};
    for (var key1 in index) {
      for (var key2 in index[key1]) {
        twoLetters = "'" + key1 + key2 + "'";
        humanReadableIndex[twoLetters] = [];
        for (var i = 0; i < index[key1][key2].length; i++) {
          humanReadableIndex[twoLetters].push(this.items[index[key1][key2][i]]);
        }
      }
    }
    console.table(humanReadableIndex);
  };

  FuzzySearcher.prototype.match = function (string, pattern) {
    var i = 0,
            j = 0,
            stringLen = string.length,
            patternLen = pattern.length;
    for (i = 0, j = 0; i < patternLen && j < stringLen; j++) {
      if (pattern[i] === string[j]) {
        i++;
      }
    }
    return i === patternLen;
  };

  FuzzySearcher.prototype.search = function (pattern) {
    pattern = pattern.toLowerCase();
    var results = [],
            lowercasedItems = this.lowerCasedItems,
            patternLen = pattern.length,
            wordIndexes = (patternLen > 1 ? this.index2[pattern[0]][pattern[1]] : this.index[pattern[0]]) || [],
            wordIndexlength = wordIndexes.length,
            items = this.items,
            i = 0,
            wordIndex;
    for (i = 0; i < wordIndexlength; i++) {
      wordIndex = wordIndexes[i];
      if (this.match(lowercasedItems[wordIndex], pattern)) {
        results.push(items[wordIndex]);
      }
    }
    return results;
  };

  function fuzzySearchFilterFactory() {
    var fuzzySearcher;
    return function (input, pattern) {
      if (angular.isUndefined(fuzzySearcher)) {
        fuzzySearcher = new FuzzySearcher(input);
        console.log('created new fuzzy searcher');
      }
      if (pattern) {
        return fuzzySearcher.search(pattern.toLowerCase());
      } else {
        return input;
      }
    };
  }

  function mainControllerFactory() {
    this.items = [
      'Dennise Fury',
      'Ester Juckett',
      'Kasie Durgin',
      'Una Labonte',
      'Twila Mizrahi',
      'Tam Ibrahim',
      'Mitzie Oates',
      'Angelita Matarazzo',
      'Jerome Campo',
      'Euna Augustine',
      'Aurora Karlson',
      'Ria Land',
      'Kristian Pound',
      'Claretta Saltsman',
      'Tyrone Koziel',
      'Shaunna Ipock',
      'Richard Holman',
      'Pam Marenco',
      'Julieta Fedrick',
      'Floretta Lincoln',
      'Adrienne Stitt',
      'Eda Rada',
      'Rubi Vogt',
      'Tammy Bruck',
      'Corrine Raney',
      'Nathaniel Grisby',
      'Svetlana Mcaninch',
      'Izetta Mcclellan',
      'Nicolas Miramontes',
      'Cindy Ferrell',
      'Keeley Loomis',
      'Shirl Okelley',
      'Tari Secrist',
      'Amber Baptist',
      'Ludivina Struthers',
      'Antonette Figg',
      'Magali Enyeart',
      'Romaine Lanoue',
      'Lloyd Sulser',
      'Hilaria Tubb',
      'Marcella Pettiway',
      'Charley Bellard',
      'Jacki Huckstep',
      'Reyes Sievers',
      'Sherita Mclachlan',
      'Sabra Mercuri',
      'Kaleigh Flanagan',
      'Nellie Austria',
      'Shawnta Barcomb',
      'Malika Mast'].sort();
  }

  app.filter('fuzzy', fuzzySearchFilterFactory);
  app.controller('mainController', mainControllerFactory);
  angular.bootstrap(document, [app.name]);
})(angular.module('fuzzyApp', []), console, document, angular);
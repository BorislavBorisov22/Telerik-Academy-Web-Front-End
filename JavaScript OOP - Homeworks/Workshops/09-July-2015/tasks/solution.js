 'use strict';

 function solve() {

     const nextId = (function() {
         let id = 0;

         return function() {
             id += 1;
             return id;
         };
     })();

     const validator = {
         validateNumberRange: function(value, min, max, message) {
             if (typeof value !== 'number' || value < min || value > max) {
                 throw Error(message);
             }
         },
         validatePositiveNumber: function(number, message) {
             if (typeof number !== 'number' || number <= 0) {
                 throw Error(message);
             }
         },
         validateName: function(name, message) {
             if (typeof name !== 'string') {
                 throw Error(message);
             }

             this.validateNumberRange(name.length, 2, 40, message);
         },
         validateDescription: function(desc, message) {
             if (typeof desc !== 'string' || desc.length === 0) {
                 throw Error(message);
             }
         },
         validateISBN: function(isbn, message) {
             if (typeof isbn !== 'string') {
                 throw Error(message);
             }

             if (isbn.length !== 10 && isbn.length !== 13) {
                 throw Error(message);
             }

             if (!isbn.match(/^[0-9]+$/)) {
                 throw Error(message);
             }
         },
         validateGenre: function(genre, message) {
             if (typeof genre !== 'string') {
                 throw Error(message);
             }

             this.validateNumberRange(genre.length, 2, 20, message);
         },
         validateDuration: function(duration, message) {
             this.validatePositiveNumber(duration, message);
         },
         validateRating: function(rating, message) {
             this.validateNumberRange(rating, 1, 5, message);
         },
         validateId: function(id) {
             if (typeof id !== 'number' || id <= 0) {
                 throw Error('invalid id');
             }
         }
     };

     class Item {
         constructor(name, description) {

             this.name = name;
             this.description = description;
             this._id = nextId();
         }

         get id() {
             return this._id;
         }

         get name() {
             return this._name;
         }
         set name(x) {
             validator.validateName(x, "Invalid name range or type");
             this._name = x;
         }

         get description() {
             return this._description;
         }
         set description(x) {
             validator.validateDescription(x, "Description must not be an empty string");
             this._description = x;
         }
     }

     class Book extends Item {
         constructor(name, isbn, genre, description) {
             super(name, description);

             this.isbn = isbn;
             this.genre = genre;
         }

         get isbn() {
             return this._isbn;
         }
         set isbn(x) {
             validator.validateISBN(x, "Invalid isbn!");
             this._isbn = x;
         }

         get genre() {
             return this._genre;
         }
         set genre(x) {
             validator.validateGenre(x);
             this._genre = x;
         }
     }

     class Media extends Item {
         constructor(name, rating, duration, description) {
             super(name, description);

             this.rating = rating;
             this.duration = duration;
         }

         get rating() {
             return this._rating;
         }
         set rating(x) {
             validator.validateRating(x, 1, 5, "Rating must be between 1 and 5");
             this._rating = x;
         }

         get duration() {
             return this._duration;
         }
         set duration(x) {
             validator.validateDuration(x, "Duration must be a positive number");
             this._duration = x;
         }
     }

     class Catalog {
         constructor(name) {

             this._id = nextId();
             this.name = name;
             this._items = [];
         }

         get items() {
             return this._items; // .slice();
         }

         get name() {
             return this._name;
         }
         set name(x) {
             validator.validateName(x, "Invalid catalog name");
             this._name = x;
         }

         get id() {
             return this._id;
         }

         add(...items) {

             if (items.length === 0 || typeof items === 'undefined') {
                 throw Error("invalid add parameter");
             }

             if (Array.isArray(items[0])) {
                 items = items[0];
             }

             if (items.length === 0 || typeof items === 'undefined') {
                 throw Error("invalid add parameter");
             }

             items.forEach(function(item) {
                 validator.validateId(item.id);
                 validator.validateName(item.name);
                 validator.validateDescription(item.description);
             });

             this._items.push(...items);
             return this;
         }

         find(arg) {
             if (typeof arg === 'number') {
                 return this._items.find(x => x.id === arg) || null;
             } else if (typeof arg === 'object') {
                 let filtered = this._items.slice();

                 if (arg.hasOwnProperty('name')) {
                     filtered = filtered.filter(x => x.name === arg.name);
                 }

                 if (arg.hasOwnProperty('id')) {
                     filtered = filtered.filter(x => x.id === arg.id);
                 }

                 return filtered;
             } else {
                 throw Error('Invalid argument for find method');
             }
         }

         search(pattern) {
             if (typeof pattern !== 'string' || pattern.length < 1) {
                 throw Error('invalid pattern format');
             }

             pattern = pattern.toLowerCase();

             return this._items
                 .slice()
                 .filter(function(x) {
                     if (x.name.toLowerCase().includes(pattern)) {
                         return true;
                     } else if (x.description.toLowerCase().includes(pattern)) {
                         return true;
                     }
                     return false;
                 });
         }
     }

     class BookCatalog extends Catalog {
         constructor(name) {
             super(name);
         }

         add(...books) {
             if (books.length === 0 || typeof books === 'undefined') {
                 throw Error("invalid add parameter");
             }

             if (Array.isArray(books[0])) {
                 books = books[0];
             }

             if (books.length === 0 || typeof books === 'undefined') {
                 throw Error("invalid add parameter");
             }

             books.forEach(function(x) {
                 validator.validateISBN(x.isbn);
                 validator.validateGenre(x.genre);
             });

             super.add(books);
             return this;
         }

         getGenres() {
             const uniqueGenres = {};

             this._items.forEach(x => uniqueGenres[x.genre] = true);

             return Object.keys(uniqueGenres);
         }

         find(options) {
             if (typeof options === 'object') {
                 let filtered = super.find(options);

                 if (options.hasOwnProperty('genre')) {
                     filtered = filtered.filter(x => x.genre === options.genre);
                 }

                 return filtered;
             } else {
                 return super.find(options);
             }
         }
     }

     class MediaCatalog extends Catalog {
         constructor(name) {
             super(name);
         }

         add(...medias) {
             if (medias.length === 0 || typeof medias === 'undefined') {
                 throw Error("invalid add parameter");
             }

             if (Array.isArray(medias[0])) {
                 medias = medias[0];
             }

             if (medias.length === 0 || typeof medias === 'undefined') {
                 throw Error("invalid add parameter");
             }

             medias.forEach(function(x) {
                 validator.validateRating(x.rating);
                 validator.validateDuration(x.duration);
             });

             super.add(medias);
             return this;
         }

         getTop(count) {
             if (typeof count !== 'number' || count < 1) {
                 throw Error('invalid count!');
             }

             return this._items
                 .slice()
                 .sort((x, y) => y.rating - x.rating)
                 .slice(0, count)
                 .map(function(x) {
                     return { name: x.name, id: x.id };
                 });
         }

         find(options) {
             if (typeof options === 'object') {
                 let filtered = super.find(options);

                 if (options.hasOwnProperty('rating')) {
                     filtered = filtered.filter(x => x.rating === options.rating);
                 }

                 return filtered;
             } else {
                 return super.find(options);
             }
         }

         getSortedByDuration() {
             return this._items
                 .slice()
                 .sort(function(x, y) {
                     if (x.duration === y.duration) {
                         return x.id - y.id;
                     }

                     return y.duration - x.duration;
                 });
         }
     }

     return {
         getBook: function(name, isbn, genre, description) {
             return new Book(name, isbn, genre, description);
         },
         getMedia: function(name, rating, duration, description) {
             return new Media(name, rating, duration, description);
         },
         getBookCatalog: function(name) {
             return new BookCatalog(name);
         },
         getMediaCatalog: function(name) {
             return new MediaCatalog(name);
         }
     };
 }

 //  const academy = solve();

 //  const catalog = academy.getMediaCatalog("validName");


 //  const media1 = {
 //      id: 1,
 //      name: "media",
 //      rating: 4,
 //      duration: 6,
 //      description: "some description"
 //  };
 //  catalog.items.push(media1);

 //  const medias = [];
 //  let len = 10;
 //  for (let i = 0; i < len; i += 1) {
 //      const media = {
 //          id: (i + len),
 //          name: 'myName',
 //          rating: 3,
 //          duration: 5,
 //          description: "some description"
 //      };

 //      medias.push(media);
 //      catalog.items.push(media);
 //  }

 //  const found = catalog.find({ name: 'myName', id: 2 + len });
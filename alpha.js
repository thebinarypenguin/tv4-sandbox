#!/usr/bin/env node

"use strict";

var fs = require('fs');
var tv4 = require('tv4');

var loadJSON = function(file) {
  var contents = fs.readFileSync(file, { encoding: 'utf8' });
  return JSON.parse(contents);
};

var validData = {
  note:           loadJSON('./valid-data/note-example.json'),
  tag:            loadJSON('./valid-data/tag-example.json'),
  noteCollection: loadJSON('./valid-data/note-collection-example.json'),
  tagCollection:  loadJSON('./valid-data/tag-collection-example.json'),
  error400:       loadJSON('./valid-data/client-error-400-example.json'),
  error404:       loadJSON('./valid-data/client-error-404-example.json'),
  error422:       loadJSON('./valid-data/client-error-422-example.json'),
  error500:       loadJSON('./valid-data/server-error-500-example.json')
};

var invalidData = {
  note:           loadJSON('./invalid-data/note-example.json'),
  tag:            loadJSON('./invalid-data/tag-example.json'),
  noteCollection: loadJSON('./invalid-data/note-collection-example.json'),
  tagCollection:  loadJSON('./invalid-data/tag-collection-example.json'),
  error400:       loadJSON('./invalid-data/client-error-400-example.json'),
  error404:       loadJSON('./invalid-data/client-error-404-example.json'),
  error422:       loadJSON('./invalid-data/client-error-422-example.json'),
  error500:       loadJSON('./invalid-data/server-error-500-example.json')
};

var schemas = {
  draft04:        loadJSON('./schemas/draft-04.json'),
  note:           loadJSON('./schemas/note-schema.json'),
  tag:            loadJSON('./schemas/tag-schema.json'),
  error:          loadJSON('./schemas/error-schema.json'),
  noteCollection: loadJSON('./schemas/note-collection-schema.json'),
  tagCollection:  loadJSON('./schemas/tag-collection-schema.json'),
};

// Load the Spec Schema
// It is acceptable to have to "pre-load" the spec schema
tv4.addSchema('http://json-schema.org/draft-04/schema', schemas.draft04);

// Load the Sub-Schemas
// It is unacceptable to have to "pre-load" my sub schemas.
// I won't know what to load until I parse the file
tv4.addSchema('note-schema.json', schemas.note);
tv4.addSchema('tag-schema.json', schemas.tag);

console.log('Validate data against schemas (valid)');
console.log('Note            : ', tv4.validate(validData.note, schemas.note));
console.log('Tag             : ', tv4.validate(validData.tag, schemas.tag));
console.log('Note Collection : ', tv4.validate(validData.noteCollection, schemas.noteCollection));
console.log('Tag Collection  : ', tv4.validate(validData.tagCollection, schemas.tagCollection));
console.log('Error 400       : ', tv4.validate(validData.error400, schemas.error));
console.log('Error 404       : ', tv4.validate(validData.error404, schemas.error));
console.log('Error 422       : ', tv4.validate(validData.error422, schemas.error));
console.log('Error 500       : ', tv4.validate(validData.error500, schemas.error));

console.log('Validate data against schemas (invalid)');
console.log('Note            : ', tv4.validate(invalidData.note, schemas.note));
console.log('Tag             : ', tv4.validate(invalidData.tag, schemas.tag));
console.log('Note Collection : ', tv4.validate(invalidData.noteCollection, schemas.noteCollection));
console.log('Tag Collection  : ', tv4.validate(invalidData.tagCollection, schemas.tagCollection));
console.log('Error 400       : ', tv4.validate(invalidData.error400, schemas.error));
console.log('Error 404       : ', tv4.validate(invalidData.error404, schemas.error));
console.log('Error 422       : ', tv4.validate(invalidData.error422, schemas.error));
console.log('Error 500       : ', tv4.validate(invalidData.error500, schemas.error));

console.log('Validate schemas against spec draft 04 (valid)');
console.log('Note            : ', tv4.validate(schemas.note, schemas.draft04));
console.log('Tag             : ', tv4.validate(schemas.tag, schemas.draft04));
console.log('Error           : ', tv4.validate(schemas.error, schemas.draft04));
console.log('Note Collection : ', tv4.validate(schemas.noteCollection, schemas.draft04));
console.log('Tag Collection  : ', tv4.validate(schemas.tagCollection, schemas.draft04));

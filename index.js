//'use strict';
const crypto = require('crypto');
const escapeStringRegexp = require('escape-string-regexp');

function subsume(id) {

  function uniqueString() {
    return crypto.randomBytes(Math.ceil(len / 2)).toString('hex').slice(0, len);
  }

  if (id && (id.includes('Qq-') || id.includes('Zz-'))) {
    throw new Error("'Qq-' and 'Zz-' cannot be used in the ID");
  }

  this.id = id ? id : uniqueString();
  this.prefix = 'Qq-' + this.id + '-qQ';
  this.postfix = 'Zz-' + this.id + '-zZ';
  // this.prefix = `Qq-${this.id}]@@`;
  // this.postfix = `Zz-${this.id}]##`;

  this.regex = new RegExp(escapeStringRegexp(this.prefix) + '([\\S\\s]*)' + escapeStringRegexp(this.postfix), 'g');

}


subsume.prototype.parse = function parse(str, id) {


  function parse(str) {
    const ret = {};

    ret.rest = str.replace(this.regex, function (m, p1) {
      if (p1) {
        ret.data = p1;
      }

      return '';
    });

    return ret;
  }


  return (new Subsume(id)).parse(str);
};


subsume.prototype.compose = function compose(str) {

  return this.prefix + str + this.postfix;

}


exports = module.exports = subsume;

export const htmlEntities = {
    encode: function(str:string) {
     return str.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
        return '&#' + i.charCodeAt(0) + ';';
     });
    },
  
    decode: function(str:string) {
      return str.replace(/&#(\d+);/g, function(match, dec) {
        return String.fromCharCode(dec);
      });
    }
  };
  
  export function endcodedHash(): string {
    return '%23';
  }
  
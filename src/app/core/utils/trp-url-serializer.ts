import { UrlTree, UrlSerializer, DefaultUrlSerializer } from '@angular/router';
import { EdcaUrlSerializer } from '@ibfd/endecapod';
import { endcodedHash } from './encode-decode';

export class TrpUrlSerializer implements UrlSerializer {
  parse(url: string): UrlTree {
    if (url.startsWith('/search')) {
      return new EdcaUrlSerializer().parse(url);
    }
    const parts = url.split('?');
    if (parts[1]) {
        parts[1] = parts[1].replace(new RegExp(endcodedHash(), 'g'), '#');
    }
    url = parts.join('?');
    return new DefaultUrlSerializer().parse(url);
  }

  serialize(tree: UrlTree): any {
    const parts = new EdcaUrlSerializer().serialize(tree).split('?');
    if (parts[1]) {
      parts[1] = parts[1].replace(/#/gi, endcodedHash());
    }
    return parts.join('?');
  }
}
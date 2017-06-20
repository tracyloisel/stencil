

export class ActiveSelectors {
  tags: string[] = [];
  classNames: string[] = [];
  ids: string[] = [];
  attrs: string[] = [];


  constructor(elm: Element) {
    this.collectSelectors(elm);
  }

  collectSelectors(elm: Element) {
    var i: number;

    if (elm && elm.tagName) {

      // tags
      this.tags.push(elm.tagName.toLowerCase());

      // classes
      var classList = elm.classList;
      for (i = 0; i < classList.length; i++) {
        var className = classList[i];

        if (this.classNames.indexOf(className) === -1) {
          this.classNames.push(className);
        }

      }

      // attributes
      var attributes = elm.attributes;
      for (i = 0; i < attributes.length; i++) {
        var attr = attributes[i];

        var attrName = attr.name.toLowerCase();
        if (!attrName || attrName === 'class' || attrName === 'id' || attrName === 'style') continue;

        if (this.attrs.indexOf(attrName) === -1) {
          this.attrs.push(attrName);
        }
      }

      // ids
      var idValue = elm.getAttribute('id');
      if (idValue) {
        idValue = idValue.trim();
        if (idValue && this.ids.indexOf(idValue) === -1) {
          this.ids.push(idValue);
        }
      }

      // drill down
      for (i = 0; i < elm.children.length; i++) {
        this.collectSelectors(elm.children[i]);
      }
    }
  }
}


export interface ClassNameData {
  [fullClassName: string]: {
    fullClassName: string;
    totalLength: number;
    abbr?: string;
  };
}

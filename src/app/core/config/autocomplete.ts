export class Autocomplete {

    /**
     * Turns off autocomplete for html input.
     *
     * @param element the input element.
     */
    public static off(element: any) {
      return element.setAttribute('autocomplete', 'no');
    }
  
    /**
     * Turns on autocomplete for html input.
     *
     * @param element the input element.
     */
    public static on(element: any) {
      return element.setAttribute('autocomplete', 'on');
    }
  }
  
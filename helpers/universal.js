export function cleanHtml(str){
    return str?.replace(/&amp;/g, '&').replace(/&#8217;/g, "'").replace(/&#038;/g, "&").replace(/&#8211;/g, "-");
  }
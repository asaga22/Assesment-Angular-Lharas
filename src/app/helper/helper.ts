export class Helper {
  static relativeDate(currentDate: number, dateToConvert:number): string {
      const diff = Math.round(currentDate - dateToConvert);
    
      const minute = 60 * 1000;
      const hour = minute * 60;
      const day = hour * 24;
      const week = day * 7;
      const month = day * 30;
      const year = month * 12;
    
      if (diff < minute) {
        return Math.floor(diff / 1000) + " seconds ago";
      }  else if (diff < hour) {
        return Math.floor(diff / minute) + " minutes ago";
      } else if (Math.floor(diff / hour) == 1) {
        return "1 hour ago";
      } else if (diff < day) {
        return Math.floor(diff / hour) + " hours ago";
      } else if (diff < week) {
        return Math.floor(diff / day) + " days ago";
      } else if (diff < month) {
        return Math.floor(diff / week) + " weeks ago";
      } else if (diff < year) {
        return Math.floor(diff / month) + " months ago";
      } else {
        return Math.floor(diff / year) + " years ago";
      }
  }
}
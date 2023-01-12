const moment = require('moment')

//Handlebars helpers
module.exports = {
    formatDate: function (date, format){
        return moment(date).utc().format(format)
    },
    truncate: function (str, len) {
      if (str.length > len && str.length > 0) {
        let new_str = str + ' '
        new_str = str.substr(0, len)
        new_str = str.substr(0, new_str.lastIndexOf(' '))
        new_str = new_str.length > 0 ? new_str : str.substr(0, len)
        return new_str + '...'
      }
      return str
    },
    stripTags: function (input) {
      return input.replace(/<(?:.|\n)*?>/gm, '')
    },
    //Edit icon helper to check if logged user is owner of review to edit on the public reviews page
    editIcon: function (reviewUser, loggedUser, reviewId, floating = true) {
      if (reviewUser._id.toString() == loggedUser._id.toString()) {
        if (floating) {
          return `<a href="/reviews/edit/${reviewId}" class="btn-floating halfway-fab deep-purple darken-4"><i class="fas fa-edit fa-small"></i></a>`
        } else {
          return `<a href="/reviews/edit/${reviewId}"><i class="fas fa-edit single-edit"></i></a>`
        }
      } else {
        return ''
      }
    },
    //Allows previously selected status to show when user clicks on edit page
    select: function (selected, options) {
      return options
        .fn(this)
        .replace(
          new RegExp(' value="' + selected + '"'),
          '$& selected="selected"'
        )
        .replace(
          new RegExp('>' + selected + '</option>'),
          ' selected="selected"$&'
        )
    },
}
var removeClass = function(e, c) {
    e.className = e.className.replace(new RegExp('(?:^|s)' + c + '(?!S)'), '');
};

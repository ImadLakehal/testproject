// Only run if ResizeObserver is supported.
if ('ResizeObserver' in self) {
    //alert ("I m a Super Chrome Browser");
    // Create a single ResizeObserver instance to handle all
    // container elements. The instance is created with a callback,
    // which is invoked as soon as an element is observed as well
    // as any time that element's size changes.
    var ro = new ResizeObserver(function(entries) {
        //alert ("I ve at least picked a targeted element");
        entries.forEach(function(entry) {
            // If breakpoints are defined on the observed element,
            // use them. Otherwise use the defaults.   ***  OPTIONAL   ***
           document.querySelector('body').style.paddingTop = (document.querySelector('ggm-header > header').clientHeight + 10) + 'px';
        });
    });

    // Find all elements with the `data-observe-resizes` attribute
    // and start observing them.
    var elements = document.querySelectorAll('[data-observe-resizes]');
    for (var element, i = 0; element = elements[i]; i++) {
        ro.observe(element);
    }
} else {
    alert ("I m not a Chrome Browser");
}

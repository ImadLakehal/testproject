// Only run if ResizeObserver is supported.
    if ('ResizeObserver' in self) {
        alert ("I m a Chrome Browser");
        // Create a single ResizeObserver instance to handle all
        // container elements. The instance is created with a callback,
        // which is invoked as soon as an element is observed as well
        // as any time that element's size changes.
        var ro = new ResizeObserver(function(entries) {
            // Default breakpoints that should apply to all observed
            // elements that don't define their own custom breakpoints.  ***  OPTIONAL   ***
            var defaultBreakpoints = {SM: 384, MD: 576, LG: 768, XL: 960};

            alert ("I ve at least picked a targeted element");

            entries.forEach(function(entry) {
                // If breakpoints are defined on the observed element,
                // use them. Otherwise use the defaults.   ***  OPTIONAL   ***
                var breakpoints = entry.target.dataset.breakpoints ?
                    JSON.parse(entry.target.dataset.breakpoints) :
                    defaultBreakpoints;

                alert("From Inside");

                // Update the matching breakpoints on the observed element. ***  OPTIONAL   ***
                // Object.keys(breakpoints).forEach(function(breakpoint) {
                //     var minHeight = breakpoints[breakpoint];
                //     if (entry.contentRect.height >= minHeight) {
                //         entry.target.classList.add(breakpoint);
                //     } else {
                //         entry.target.classList.remove(breakpoint);
                //     }
                // });
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

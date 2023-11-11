const basePath = "https://raw.githubusercontent.com/dmelin/icons/main/"

document.addEventListener('DOMContentLoaded', function () {
    console.log("started")
    var observer = new MutationObserver(function (mutationsList, observer) {
        // Check each mutation in the list
        for (var mutation of mutationsList) {
            // Check if the attribute "data-custom" was changed
            if (mutation.type === 'attributes' && (mutation.attributeName === 'color-bg' || mutation.attributeName === 'color-fg')) {
                // Handle the attribute change
                console.log('Attribute "' + mutation.attributeName + '" changed:', mutation.target.getAttribute(mutation.attributeName));
                var path = "B"
                if (mutation.attributeName === "color-bg") {
                    path = "A"
                }
                mutation.target.querySelectorAll(`#color${path} > path, #color${path} > circle, #color${path} > rect`).forEach(function (path) {
                    path.style.fill = mutation.target.getAttribute(mutation.attributeName)
                })

            }
        }
    })

    var dmIcons = document.querySelectorAll('dm-icon')
    dmIcons.forEach(function (dmIcon) {
        // Iterate through all attributes of the current dm-icon element
        for (var i = 0; i < dmIcon.attributes.length; i++) {
            var attributeName = dmIcon.attributes[i].name;
            console.log("attribute", attributeName)
            // Check if the attribute name starts with 'icon-'
            if (attributeName.startsWith('icon-')) {
                // Extract the second part of the attribute (after 'icon-')
                var iconName = attributeName.slice(5);
                console.log("icon", iconName)

                // Construct the path to the icon
                var iconPath = basePath + 'assets/icons/' + iconName + '.svg';

                console.log(iconPath)

                var colorBg = (dmIcon.getAttribute("color-bg")) ? dmIcon.getAttribute("color-bg") : "#000"
                var colorFg = (dmIcon.getAttribute("color-fg")) ? dmIcon.getAttribute("color-fg") : "#fff"

                if (colorBg === "") colorBg = "#000"
                if (colorFg === "") colorBg = "#fff"

                // Fetch the SVG file
                fetch(iconPath)
                    .then(response => response.text())
                    .then(svgContent => {
                        dmIcon.innerHTML = svgContent;
                    })
                    .then(stuff => {
                        dmIcon.querySelectorAll('#colorA > path, #colorA > circle, #colorA > rect').forEach(function (path) {
                            console.log("path", "found background", colorBg)
                            path.style.fill = colorBg
                        })
                        dmIcon.querySelectorAll('#colorB > path, #colorB > circle, #colorB > rect').forEach(function (path) {
                            console.log("path", "found foreground", colorFg)
                            path.style.fill = colorFg
                        })
                    })
                    .then(stuff => {
                        observer.observe(dmIcon, { attributes: true })
                    })
                    .catch(error => console.error('Error fetching SVG file:', error));
            }
        }
    })


})

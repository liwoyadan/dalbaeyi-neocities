const sass = require("sass");
const path = require("path");

module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("src/img");
    eleventyConfig.addPassthroughCopy("src/fonts");
    eleventyConfig.addPassthroughCopy("src/js");
    eleventyConfig.addPassthroughCopy("src/favicon.ico");

    // Compile Sass to CSS
    eleventyConfig.addTemplateFormats("scss");
    eleventyConfig.addExtension("scss", {
        outputFileExtension: "css",

        compile(content, inputPath) {
            let parsed = path.parse(inputPath)
            if(parsed.name.startsWith("_")) {
                return;
            }

            console.log('Compiling scss...', inputPath)

            return (data) => {
                let result = sass.compile(inputPath)
                return result.css
            }
        }
    });

    // Resources Shortcode
    eleventyConfig.addPairedShortcode("resource", function(content, title, url) {
        var openingDiv = '<div class="resource">'
        var link = '<div class="resource-title"><a href="' + url + '">' + title + '</a></div>'
        var contentDiv = '<div class="resource-content ps-4">' + content + '</div>'
        var closingDiv = '</div>'

        return openingDiv + link + contentDiv + closingDiv;
    });

    return {
        passthroughFileCopy: true,
        dir: {
            input: "src",
            includes: "_includes",
            data: "_data",
            output: "public",
        },
    };
};
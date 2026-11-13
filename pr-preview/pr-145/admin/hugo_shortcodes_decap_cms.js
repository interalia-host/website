// Buttons in the CMS Markdown editor ("+" menu) that insert Hugo shortcodes.
// Each component must match a shortcode in layouts/_shortcodes/ (or a Hugo built-in).

const attr = (name, value) => (value ? ` ${name}="${String(value).replace(/"/g, "&quot;")}"` : "");
const getAttr = (str, name) => {
    const m = str.match(new RegExp(`${name}="([^"]*)"`));
    return m ? m[1] : "";
};

// Icon — layouts/_shortcodes/fontawesome.html (only icons in assets/icons/ exist)
CMS.registerEditorComponent({
    id: "fontawesome",
    label: "Icon",
    fields: [
        {
            name: "iconName",
            label: "Icon",
            widget: "select",
            options: [
                { label: "bluesky (brands)", value: "brands/bluesky" },
                { label: "facebook (brands)", value: "brands/facebook" },
                { label: "github (brands)", value: "brands/github" },
                { label: "instagram (brands)", value: "brands/instagram" },
                { label: "linkedin (brands)", value: "brands/linkedin" },
                { label: "mastodon (brands)", value: "brands/mastodon" },
                { label: "signal messenger (brands)", value: "brands/signal-messenger" },
                { label: "threads (brands)", value: "brands/threads" },
                { label: "whatsapp (brands)", value: "brands/whatsapp" },
                { label: "x twitter (brands)", value: "brands/x-twitter" },
                { label: "youtube (brands)", value: "brands/youtube" },
                { label: "arrow right (solid)", value: "solid/arrow-right" },
                { label: "arrow up right from square (solid)", value: "solid/arrow-up-right-from-square" },
                { label: "calendar (solid)", value: "solid/calendar" },
                { label: "check (solid)", value: "solid/check" },
                { label: "circle info (solid)", value: "solid/circle-info" },
                { label: "circle question (solid)", value: "solid/circle-question" },
                { label: "clock (solid)", value: "solid/clock" },
                { label: "comments (solid)", value: "solid/comments" },
                { label: "download (solid)", value: "solid/download" },
                { label: "envelope (solid)", value: "solid/envelope" },
                { label: "file lines (solid)", value: "solid/file-lines" },
                { label: "file pdf (solid)", value: "solid/file-pdf" },
                { label: "globe (solid)", value: "solid/globe" },
                { label: "hand holding heart (solid)", value: "solid/hand-holding-heart" },
                { label: "handshake (solid)", value: "solid/handshake" },
                { label: "heart (solid)", value: "solid/heart" },
                { label: "leaf (solid)", value: "solid/leaf" },
                { label: "lightbulb (solid)", value: "solid/lightbulb" },
                { label: "link (solid)", value: "solid/link" },
                { label: "location dot (solid)", value: "solid/location-dot" },
                { label: "newspaper (solid)", value: "solid/newspaper" },
                { label: "phone (solid)", value: "solid/phone" },
                { label: "scale balanced (solid)", value: "solid/scale-balanced" },
                { label: "shield halved (solid)", value: "solid/shield-halved" },
                { label: "user (solid)", value: "solid/user" },
                { label: "users (solid)", value: "solid/users" }
            ]
        }
    ],
    pattern: /^{{< fontawesome "([^"]+)"[^>]*>}}$/,
    fromBlock: (match) => ({ iconName: match[1] }),
    toBlock: (obj) => `{{< fontawesome "${obj.iconName}" >}}`,
    toPreview: (obj) => {
        const [style, name] = (obj.iconName || "solid/circle-question").split("/");
        return `<i class="fa-${style === "brands" ? "brands" : "solid"} fa-${name}"></i>`;
    }
});

// Figure — layouts/_shortcodes/figure.html (images are resized and converted automatically)
CMS.registerEditorComponent({
    id: "figure",
    label: "Image with caption",
    fields: [
        { name: "src", label: "Image", widget: "image", hint: "Any size works: it is resized and converted to WebP automatically. Use at least 1600px wide for full-width images." },
        { name: "alt", label: "Alternative text", widget: "string", hint: "Describe the image for people who can't see it." },
        { name: "caption", label: "Caption", widget: "string", required: false }
    ],
    pattern: /^{{< figure ([^>]*?) >}}$/,
    fromBlock: (match) => ({
        src: getAttr(match[1], "src"),
        alt: getAttr(match[1], "alt"),
        caption: getAttr(match[1], "caption")
    }),
    toBlock: (obj) => `{{< figure${attr("src", obj.src)}${attr("alt", obj.alt)}${attr("caption", obj.caption)} >}}`,
    toPreview: (obj, getAsset) =>
        `<figure><img src="${getAsset ? getAsset(obj.src) : obj.src}" alt="${obj.alt || ""}" style="max-width:100%">${
            obj.caption ? `<figcaption>${obj.caption}</figcaption>` : ""
        }</figure>`
});

// YouTube — Hugo built-in shortcode (privacy-enhanced mode is enabled in hugo.toml)
CMS.registerEditorComponent({
    id: "youtube",
    label: "YouTube video",
    fields: [{ name: "id", label: "Video ID", widget: "string", hint: "The part after watch?v= in the video URL." }],
    pattern: /^{{< youtube\s+([A-Za-z0-9_-]+)\s*>}}$/,
    fromBlock: (match) => ({ id: match[1] }),
    toBlock: (obj) => `{{< youtube ${obj.id} >}}`,
    toPreview: (obj) => `<img src="https://i3.ytimg.com/vi/${obj.id}/hqdefault.jpg" alt="YouTube video" style="max-width:100%"/>`
});

// Vimeo — Hugo built-in shortcode
CMS.registerEditorComponent({
    id: "vimeo",
    label: "Vimeo video",
    fields: [{ name: "id", label: "Video ID", widget: "string", hint: "The number at the end of the Vimeo URL." }],
    pattern: /^{{< vimeo\s+([0-9]+)\s*>}}$/,
    fromBlock: (match) => ({ id: match[1] }),
    toBlock: (obj) => `{{< vimeo ${obj.id} >}}`,
    toPreview: (obj) => `<p>Vimeo video ${obj.id}</p>`
});

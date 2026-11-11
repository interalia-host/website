// Live preview templates for Decap CMS.
// They mirror the Hugo templates in layouts/ using the site's own Tailwind CSS
// (published to /admin/preview.css by layouts/partials/head.html), so editors see
// real fonts, colours and spacing while typing. Keep them roughly in sync when
// changing a section's design. This file is also scanned by Tailwind for classes.

(function () {
    if (!window.CMS || !window.h || !window.createClass) return;

    CMS.registerPreviewStyle("/admin/preview.css");
    CMS.registerPreviewStyle(
        "body{background:var(--color-cream);margin:0} .preview-note{font:12px/1.4 system-ui;color:#6e4242;background:#fbebdf;padding:6px 12px;border-radius:999px;display:inline-block}",
        { raw: true }
    );

    const h = window.h;
    const get = (entry, key, fallback = "") => {
        const v = entry.getIn(["data", ...key.split(".")]);
        return v === undefined || v === null ? fallback : v;
    };
    const list = (entry, key) => {
        const v = entry.getIn(["data", key]);
        return v && v.toJS ? v.toJS() : Array.isArray(v) ? v : [];
    };
    const asset = (props, path) => (path ? props.getAsset(path).toString() : "");
    const paragraphs = (text) =>
        String(text || "")
            .split(/\n\s*\n/)
            .filter(Boolean)
            .map((p, i) => h("p", { key: i }, p));

    // Brand curve (same shapes as layouts/partials/curve.html)
    const CURVES = {
        left: "M449.589 69.2708C269.693 112.059 -0.273438 206.786 -0.273438 206.786V320H1439.73V314.049C1439.73 314.049 1262.82 137.478 1172.86 81.2537C1082.9 25.0294 1022.64 9.2192 917.635 1.49562C814.146 -6.11639 629.218 26.5464 449.589 69.2708Z",
        right: "M990.794 63.48C1170.69 102.587 1440.66 189.165 1440.66 189.165V320H0.65625V287.2C0.65625 287.2 177.562 125.819 267.521 74.432C357.48 23.0445 417.741 8.59439 522.747 1.53524C626.237 -5.42192 811.165 24.431 990.794 63.48Z"
    };
    const curve = (fill, shape = "left") =>
        h("svg", { className: "block h-16 w-full md:h-24", viewBox: "0 0 1440 320", preserveAspectRatio: "none", "aria-hidden": "true" },
            h("path", { d: CURVES[shape], className: fill }));

    const page = (...children) => h("div", { className: "min-h-screen bg-cream font-sans text-gray-900" }, ...children);
    const button = (label, dark = true) =>
        label ? h("span", { className: `inline-flex rounded-full px-6 py-3 text-lg ${dark ? "bg-ink text-white" : "bg-blush-light text-gray-800"}` }, label) : null;

    const register = (names, component) => [].concat(names).forEach((n) => CMS.registerPreviewTemplate(n, component));
    const both = (name) => [`${name}-en`, `${name}-de`];

    // ── Articles ───────────────────────────────────────────────
    register("blog-posts", createClass({
        render() {
            const { entry, widgetFor } = this.props;
            const date = get(entry, "date");
            const year = date ? new Date(date).getFullYear() : "";
            const image = asset(this.props, get(entry, "image"));
            return page(h("section", { className: "container mx-auto max-w-4xl px-8 py-8" },
                h("article", { className: "prose prose-lg mx-auto w-full prose-p:text-gray-700 prose-headings:text-gray-900 prose-a:text-ink" },
                    h("header", { className: "not-prose mb-8" },
                        h("h1", { className: "text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl" }, get(entry, "title", "Untitled")),
                        h("div", { className: "mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-600" },
                            year ? h("span", null, year) : null,
                            get(entry, "author") ? h("span", null, "· " + get(entry, "author")) : null),
                        image ? h("img", { src: image, alt: "", className: "mt-8 h-auto w-full rounded-xl" }) : null,
                        get(entry, "description") ? h("p", { className: "mt-6 text-lg text-gray-600" }, get(entry, "description")) : null),
                    widgetFor("body"))));
        }
    }));

    // ── Reports (Resources card) ───────────────────────────────
    register("reports", createClass({
        render() {
            const { entry } = this.props;
            const image = asset(this.props, get(entry, "image"));
            return page(h("div", { className: "p-8" },
                h("div", { className: "flex max-w-sm flex-col overflow-hidden rounded-2xl bg-white shadow-md" },
                    image ? h("div", { className: "h-48 overflow-hidden" }, h("img", { src: image, alt: "", className: "h-full w-full object-cover" })) : null,
                    h("div", { className: "p-6" },
                        h("h3", { className: "mb-2 text-2xl font-bold" }, get(entry, "title", "Untitled")),
                        h("p", { className: "mb-6 text-gray-600" }, get(entry, "year")),
                        get(entry, "download") ? button("Download") : h("p", { className: "preview-note" }, "No PDF attached yet")))));
        }
    }));

    // ── Other pages (Imprint, Privacy …) ───────────────────────
    register("page", createClass({
        render() {
            const { entry, widgetFor } = this.props;
            return page(h("section", { className: "container mx-auto max-w-4xl px-8 py-8" },
                h("article", { className: "prose prose-lg mx-auto w-full prose-p:text-gray-700 prose-headings:text-gray-900 prose-a:text-ink" },
                    h("h1", { className: "not-prose text-3xl font-bold md:text-5xl" }, get(entry, "title")),
                    widgetFor("body"))));
        }
    }));

    // ── Partner page ───────────────────────────────────────────
    register("partner", createClass({
        render() {
            const { entry, widgetFor } = this.props;
            const areas = list(entry, "areas");
            return page(
                h("section", { className: "px-8 pt-12 pb-10 text-center" },
                    h("h1", { className: "text-5xl md:text-7xl" }, get(entry, "title")),
                    h("p", { className: "preview-note mt-6" }, "The first paragraph appears large here; the rest on the curve below.")),
                curve("fill-blush", "left"),
                h("div", { className: "bg-blush px-8 pb-16" },
                    h("div", { className: "prose prose-lg mx-auto max-w-3xl text-center prose-p:text-gray-800" }, widgetFor("body")),
                    areas.length ? h("div", { className: "mt-12 text-center" },
                        h("h2", { className: "text-2xl md:text-3xl" }, get(entry, "areas_title")),
                        h("ul", { className: "mt-8 flex flex-wrap justify-center gap-3" },
                            areas.map((a, i) => h("li", { key: i, className: "flex items-center gap-3 rounded-full bg-cream px-5 py-3 text-lg shadow-sm ring-1 ring-ink/10" },
                                h("span", { className: "h-2 w-2 rounded-full bg-petal" }), a)))) : null),
                h("div", { className: "bg-blush" }, curve("fill-maroon", "right")),
                h("div", { className: "bg-maroon px-8 pb-16 text-center text-white" },
                    h("p", { className: "text-lg text-blush" }, get(entry, "cta_text")),
                    h("h2", { className: "mt-2 text-3xl md:text-5xl" }, get(entry, "cta_title")),
                    h("div", { className: "mt-8" }, h("span", { className: "inline-flex rounded-full bg-cream px-6 py-3 text-lg text-ink" }, get(entry, "cta_button")))));
        }
    }));

    // ── Homepage sections ──────────────────────────────────────
    register(both("hero"), createClass({
        render() {
            const { entry } = this.props;
            return page(h("section", { className: "flex justify-center px-8 py-16 lg:py-28" },
                h("div", { className: "text-center md:max-w-5xl" },
                    h("h1", { className: "text-5xl leading-tight md:text-7xl", dangerouslySetInnerHTML: { __html: get(entry, "title") } }),
                    h("p", { className: "mt-4 font-serif text-xl text-gray-700" }, get(entry, "subtitle")),
                    h("div", { className: "mt-6 flex flex-wrap justify-center gap-4" },
                        button(get(entry, "primary_button")), button(get(entry, "secondary_button"), false)))));
        }
    }));

    const textWithItems = createClass({
        render() {
            const { entry } = this.props;
            const image = asset(this.props, get(entry, "image"));
            return page(h("section", { className: "px-8 py-12" },
                h("div", { className: "mx-auto grid max-w-7xl grid-cols-1 gap-10 md:grid-cols-12" },
                    h("div", { className: "md:col-span-5" },
                        h("h2", { className: "text-3xl md:text-5xl" }, get(entry, "title")),
                        get(entry, "subtitle") ? h("p", { className: "mt-4 text-gray-700" }, get(entry, "subtitle")) : null,
                        image ? h("img", { src: image, alt: "", className: "mx-auto mt-10 h-auto w-full max-w-3xs" }) : null),
                    h("div", { className: "space-y-8 md:col-span-6 md:col-start-7" },
                        list(entry, "items").map((it, i) => h("div", { key: i },
                            h("h3", { className: "mb-2 text-2xl font-bold" }, it.title),
                            h("p", { className: "text-gray-700" }, it.description)))))));
        }
    });
    register([...both("what-we-do"), ...both("who-we-work-with")], textWithItems);

    register(both("methodology"), createClass({
        render() {
            const { entry } = this.props;
            return page(h("section", { className: "px-8 py-12" },
                h("div", { className: "mx-auto grid max-w-7xl grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3" },
                    h("div", { className: "max-w-sm" },
                        h("h2", { className: "text-3xl md:text-5xl" }, get(entry, "title")),
                        h("p", { className: "mt-4 text-gray-700" }, get(entry, "subtitle"))),
                    list(entry, "items").map((it, i) => h("div", { key: i, className: `rounded-4xl px-8 py-12 ${i % 2 ? "bg-blush" : "bg-sage"}` },
                        it.image ? h("img", { src: asset(this.props, it.image), alt: "", className: "mb-4 h-auto w-full" }) : null,
                        h("h3", { className: "text-3xl font-bold" }, it.title),
                        h("p", { className: "mt-2 text-gray-700" }, it.description))))));
        }
    }));

    register(both("service-card"), createClass({
        render() {
            const { entry } = this.props;
            const image = asset(this.props, get(entry, "image"));
            return page(h("section", { className: "px-8 py-12" },
                h("div", { className: "relative mx-auto max-w-5xl overflow-hidden rounded-2xl bg-sage p-8 md:p-12" },
                    image ? h("div", { className: "absolute inset-0 bg-contain bg-no-repeat opacity-30", style: { backgroundImage: `url(${image})` } }) : null,
                    h("div", { className: "relative" },
                        h("h2", { className: "text-4xl md:text-5xl" }, get(entry, "title")),
                        h("div", { className: "mt-4 space-y-4 text-gray-800" }, paragraphs(get(entry, "subtitle"))),
                        h("div", { className: "mt-6 flex justify-end" }, button(get(entry, "button"), false))))));
        }
    }));

    // ── About page sections ────────────────────────────────────
    register(both("about-intro"), createClass({
        render() {
            const { entry } = this.props;
            return page(h("section", { className: "px-8 py-16 text-center" },
                h("h1", { className: "mx-auto max-w-3xl text-4xl leading-tight font-light lg:text-6xl" }, get(entry, "title")),
                h("p", { className: "mx-auto mt-4 max-w-5xl font-serif text-lg text-gray-700" }, get(entry, "text"))));
        }
    }));

    register(both("about-mission"), createClass({
        render() {
            const { entry } = this.props;
            const image = asset(this.props, get(entry, "image"));
            return page(h("div", { className: "p-8" },
                h("div", { className: "relative mx-auto max-w-5xl overflow-hidden rounded-2xl bg-sage p-8 md:min-h-96 md:p-12" },
                    image ? h("div", { className: "absolute inset-0 bg-contain bg-right-top bg-no-repeat", style: { backgroundImage: `url(${image})` } }) : null,
                    h("div", { className: "relative max-w-lg" },
                        h("h3", { className: "text-5xl" }, get(entry, "title")),
                        h("p", { className: "mt-4 text-gray-800" }, get(entry, "text"))))));
        }
    }));

    register(both("team-intro"), createClass({
        render() {
            const { entry } = this.props;
            return page(curve("fill-blush", "right"),
                h("div", { className: "bg-blush px-8 pb-16 text-center" },
                    h("h2", { className: "text-4xl md:text-6xl" }, get(entry, "title")),
                    h("p", { className: "mx-auto mt-4 mb-10 max-w-3xl text-lg" }, get(entry, "text")),
                    button(get(entry, "button"))));
        }
    }));

    // ── Services page ──────────────────────────────────────────
    register(both("our-service"), createClass({
        render() {
            const { entry } = this.props;
            const items = list(entry, "items");
            const block = (rows) => rows.map((it, i) => h("div", { key: i },
                h("h3", { className: "mb-3 text-2xl lg:text-4xl" }, it.title),
                h("p", { className: "text-gray-700" }, it.description)));
            return page(h("section", { className: "container mx-auto px-8 py-12" },
                h("div", { className: "grid grid-cols-1 gap-10 lg:grid-cols-12" },
                    h("div", { className: "lg:col-span-5" },
                        h("h2", { className: "mb-6 text-4xl lg:text-6xl" }, get(entry, "title")),
                        h("p", { className: "text-gray-700" }, get(entry, "subtitle"))),
                    h("div", { className: "space-y-8 lg:col-span-6 lg:col-start-7" }, block(items.filter((i) => !i.request)))),
                h("hr", { className: "my-16 h-[2px] border-0 bg-sage-deep" }),
                h("div", { className: "grid grid-cols-1 gap-10 lg:grid-cols-12" },
                    h("h2", { className: "text-2xl lg:col-span-5 lg:text-3xl" }, get(entry, "additional")),
                    h("div", { className: "space-y-8 lg:col-span-6 lg:col-start-7" }, block(items.filter((i) => i.request))))));
        }
    }));

    // ── People ─────────────────────────────────────────────────
    register(["team", "board"], createClass({
        render() {
            const { entry } = this.props;
            const links = list(entry, "social");
            return h("div", { className: "min-h-screen bg-maroon p-10 font-sans text-white" },
                h("article", { className: "max-w-md" },
                    h("h3", { className: "mt-4 text-xl" }, get(entry, "name")),
                    get(entry, "pronoun") ? h("p", { className: "mt-1 text-xs text-white/80" }, get(entry, "pronoun")) : null,
                    h("p", { className: "text-sm text-white/90" }, get(entry, "role")),
                    h("hr", { className: "my-2 border-white/40" }),
                    links.length ? h("p", { className: "text-sm text-white/90" }, links.map((l) => l.platform).join(" · ")) : null,
                    links.length ? h("hr", { className: "my-2 border-white/40" }) : null,
                    h("p", { className: "mt-2 text-sm text-white/90" }, get(entry, "bio"))));
        }
    }));
})();

const { findByProps } = vendetta.metro;
const { after } = vendetta.patcher;
const patches = [];

function removeRadius(style) {
    if (!style || typeof style !== "object") return;
    if (Array.isArray(style)) { style.forEach(removeRadius); return; }
    if ("borderRadius" in style) style.borderRadius = 0;
    if ("borderTopLeftRadius" in style) style.borderTopLeftRadius = 0;
    if ("borderTopRightRadius" in style) style.borderTopRightRadius = 0;
    if ("borderBottomLeftRadius" in style) style.borderBottomLeftRadius = 0;
    if ("borderBottomRightRadius" in style) style.borderBottomRightRadius = 0;
}

// Patch StyleSheet.create — intercepts styles at registration time
const StyleSheet = findByProps("create", "flatten", "hairlineWidth");
if (StyleSheet) {
    patches.push(after("create", StyleSheet, function(_args, result) {
        try {
            for (const key in result) removeRadius(result[key]);
        } catch(e) {}
        return result;
    }));

    // Also patch flatten so any numeric style IDs get zeroed when resolved
    patches.push(after("flatten", StyleSheet, function(_args, result) {
        try { removeRadius(result); } catch(e) {}
        return result;
    }));
}

module.exports = {
    onUnload: function() {
        patches.forEach(function(p) { if (p) p(); });
    }
};

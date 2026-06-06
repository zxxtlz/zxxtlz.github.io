const { findByProps } = vendetta.metro;
const { after } = vendetta.patcher;

const patches = [];

// Patch StyleSheet.create — this is where ALL styles are registered
// Discord calls this at startup, so we need to intercept it and zero out radii
const StyleSheet = findByProps("create", "flatten", "hairlineWidth");

if (StyleSheet) {
    patches.push(
        after("create", StyleSheet, function(_args, result) {
            try {
                for (const key in result) {
                    const style = result[key];
                    if (!style || typeof style !== "object") continue;
                    if ("borderRadius" in style) style.borderRadius = 0;
                    if ("borderTopLeftRadius" in style) style.borderTopLeftRadius = 0;
                    if ("borderTopRightRadius" in style) style.borderTopRightRadius = 0;
                    if ("borderBottomLeftRadius" in style) style.borderBottomLeftRadius = 0;
                    if ("borderBottomRightRadius" in style) style.borderBottomRightRadius = 0;
                }
            } catch(e) {}
            return result;
        })
    );
}

module.exports = {
    onUnload: function() {
        patches.forEach(function(p) { if (p) p(); });
    }
};

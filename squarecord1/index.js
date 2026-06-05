// No imports — Bunny exposes these as globals at runtime
const { findByProps } = vendetta.metro;
const { after } = vendetta.patcher;

function removeRadius(style) {
    if (!style) return;
    if (Array.isArray(style)) {
        style.forEach(removeRadius);
        return;
    }
    if (typeof style !== "object") return;

    if ("borderRadius" in style) style.borderRadius = 0;
    if ("borderTopLeftRadius" in style) style.borderTopLeftRadius = 0;
    if ("borderTopRightRadius" in style) style.borderTopRightRadius = 0;
    if ("borderBottomLeftRadius" in style) style.borderBottomLeftRadius = 0;
    if ("borderBottomRightRadius" in style) style.borderBottomRightRadius = 0;

    if (style.style) removeRadius(style.style);
}

const patches = [];

// Hook React.createElement — catches almost everything rendered
const React = findByProps("createElement", "Component");
if (React) {
    patches.push(
        after("createElement", React, function(_args, res) {
            try {
                if (res && res.props && res.props.style) {
                    removeRadius(res.props.style);
                }
            } catch (e) {}
            return res;
        })
    );
}

// Avatar
const AvatarModule = findByProps("AvatarWithPresence");
if (AvatarModule) {
    patches.push(
        after("AvatarWithPresence", AvatarModule, function(_args, res) {
            try {
                if (res && res.props && res.props.style) removeRadius(res.props.style);
            } catch (e) {}
            return res;
        })
    );
}

// Guild/server icons
const GuildIconModule = findByProps("GuildIcon");
if (GuildIconModule) {
    patches.push(
        after("GuildIcon", GuildIconModule, function(_args, res) {
            try {
                if (res && res.props && res.props.style) removeRadius(res.props.style);
            } catch (e) {}
            return res;
        })
    );
}

// Buttons
const ButtonModule = findByProps("Button", "ButtonColors");
if (ButtonModule) {
    patches.push(
        after("Button", ButtonModule, function(_args, res) {
            try {
                if (res && res.props && res.props.style) removeRadius(res.props.style);
            } catch (e) {}
            return res;
        })
    );
}

module.exports = {
    onUnload: function() {
        patches.forEach(function(p) { if (p) p(); });
    }
};

import { findByProps } from "@vendetta/metro";
import { after } from "@vendetta/patcher";

/**
 * Recursively remove ALL border radius values from styles
 */
function removeRadius(style: any) {
    if (!style) return;

    if (Array.isArray(style)) {
        style.forEach(removeRadius);
        return;
    }

    if (typeof style !== "object") return;

    // Main RN radius
    if ("borderRadius" in style) style.borderRadius = 0;

    // Corner radii (Discord uses these often)
    const corners = [
        "borderTopLeftRadius",
        "borderTopRightRadius",
        "borderBottomLeftRadius",
        "borderBottomRightRadius"
    ];

    for (const c of corners) {
        if (c in style) style[c] = 0;
    }

    // Some components wrap styles
    if (style.style) removeRadius(style.style);
}

/**
 * 1. Global React element hook (catches MOST UI)
 */
const React = findByProps("createElement");

const unpatchCreateElement = after(
    "createElement",
    React,
    (_args: any, res: any) => {
        try {
            if (res?.props?.style) {
                removeRadius(res.props.style);
            }
        } catch {}
        return res;
    }
);

/**
 * 2. Target known Discord components directly (higher accuracy)
 */
const patches: any[] = [];

// Try grabbing common UI components
const components = findByProps(
    "Avatar",
    "GuildIcon",
    "Message",
    "Button",
    "default"
);

/**
 * Avatar patch (user profile pictures)
 */
if (components?.Avatar) {
    patches.push(
        after("Avatar", components, (_args: any, res: any) => {
            if (res?.props?.style) removeRadius(res.props.style);
            return res;
        })
    );
}

/**
 * Guild icon patch (server icons)
 */
if (components?.GuildIcon) {
    patches.push(
        after("GuildIcon", components, (_args: any, res: any) => {
            if (res?.props?.style) removeRadius(res.props.style);
            return res;
        })
    );
}

/**
 * Button patch (kills pill buttons)
 */
if (components?.Button) {
    patches.push(
        after("Button", components, (_args: any, res: any) => {
            if (res?.props?.style) removeRadius(res.props.style);
            return res;
        })
    );
}

/**
 * Cleanup
 */
export const onUnload = () => {
    unpatchCreateElement();
    patches.forEach(p => p());
};
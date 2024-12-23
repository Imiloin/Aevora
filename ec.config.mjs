import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers'
import { defineEcConfig } from 'astro-expressive-code'

export default defineEcConfig({
    // set expressive-code configuration options here
    themes: 'github-light',
    plugins: [pluginLineNumbers()],
    defaultProps: {
        // Disable line numbers by default
        showLineNumbers: false,
    },
    styleOverrides: {
        // override styles
        borderColor: 'transparent',
        borderRadius: '8px',
        borderWidth: '0px',
        scrollbarThumbColor: 'var(--gray-300)',
        scrollbarThumbHoverColor: 'var(--gray-500)',
        frames: {
            editorActiveTabBackground: 'var(--white)',
            editorActiveTabBorderColor: 'transparent',
            editorActiveTabIndicatorTopColor: 'transparent',
            editorTabBarBackground: 'var(--gray-300)',
            editorTabBarBorderBottomColor: 'transparent',
            editorTabBarBorderColor: 'transparent',
            editorTabBorderRadius: '8px',
            frameBoxShadowCssValue: '0',
            inlineButtonBorder: '0px',
            terminalBackground: 'var(--white)',
            terminalTitlebarBackground: 'var(--gray-300)',
            terminalTitlebarBorderBottomColor: 'var(--white)',
            terminalTitlebarDotsForeground: 'var(--black)',
        },
        textMarkers: {
            inlineMarkerBorderWidth: '0px',
            lineMarkerAccentWidth: '0px',
            lineMarkerLabelPaddingInline: '0.3rem',
            defaultChroma: '55',
            defaultLuminance: '95%',
        },
        codeFontFamily: 'var(--code-font-family)',
        codeFontSize: '0.8rem',
        uiFontFamily: 'var(--chinese-font-family)',
        // uiLineHeight: '1.5',
        uiPaddingBlock: '0.25rem',
    },
})

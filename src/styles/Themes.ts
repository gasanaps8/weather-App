import 'styled-components';

export const theme = {
    colors: {
        blue: '#154D71',
        lightBlue: '#1C6EA4',
        lighterBlue: '#33A1E0',
        yellow: '#FFF9AF',
        textPrimary: '#f3f3f3ff',
        textSecondary: '#eaeaeaff',

        graphArea: '#f1e28dff',
        graphLine: '#e5d371ff',
        graphGrid: 'rgba(255,255,255,0.15)',
        graphAxis: '#e5e7eb',
        graphTooltipBg: '#020617',
        graphTooltipText: '#e5e7eb',
    },
};

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            blue: string;
            lightBlue: string;
            lighterBlue: string;
            yellow: string,
            textPrimary: string,
            textSecondary: string,

            graphArea: string,
            graphLine: string,
            graphGrid: string,
            graphAxis: string,
            graphTooltipBg: string,
            graphTooltipText: string,
        };
    }
}

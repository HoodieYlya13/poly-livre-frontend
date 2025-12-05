import { Theme } from "./ThemeProvider";

interface ThemeScriptProps {
  theme?: Theme;
}

export default function ThemeScript({ theme }: ThemeScriptProps) {
  return (
    <script
      // not dangerous because I know what I'm doing ;)
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            try {
              var theme = '${theme === "dark" || theme === "light" ? theme : "system"}';
              var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
              if (theme === 'dark' || (theme === 'system' && systemDark)) document.documentElement.classList.add('dark');
              else document.documentElement.classList.remove('dark');
            } catch (e) {}
          })()
        `,
      }}
    />
  );
}

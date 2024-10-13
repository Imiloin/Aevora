import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

// 获取当前模块的目录路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
    css: {
        preprocessorOptions: {
            scss: {
                // 使用 Dart Sass 的现代 API 以避免过时的 API 警告
                api: 'modern'
            }
        }
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src')
        }
    }
});
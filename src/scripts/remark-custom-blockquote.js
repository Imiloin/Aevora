import { visit } from 'unist-util-visit';

export default function customBlockquote() {
    return (tree) => {
        visit(tree, 'blockquote', (node) => {
            // 检查 blockquote 是否包含 alert 标记
            const markers = ["TIP", "NOTE", "IMPORTANT", "WARNING", "CAUTION"];
            const markerNameRE = markers.join("|");
            const RE = new RegExp(`^\\[\\!(${markerNameRE})\\]\\s`, "i");

            const firstParagraph = node.children[0];
            if (!firstParagraph) return;

            let firstContent = firstParagraph.children[0];
            if (!firstContent) return;

            if (!("value" in firstContent) && "children" in firstContent && firstContent.children[0]) {
                firstContent = firstContent.children[0];
            }

            if (firstContent.type !== "text") return;

            const match = firstContent.value.match(RE);
            const hasAlert = !!match;

            // 如果包含 alert 标记，则跳过自定义处理
            if (hasAlert) {
                return;
            }

            // 创建新的子节点，包含 SVG 图案和原始内容
            const svgNode = {
                type: 'html',
                value: `
<blockquote-no-alert>
<svg fill="#5856D6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 14">
    <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"/>
</svg>
                `
            };

            const closingTagNode = {
                type: 'html',
                value: `</blockquote-no-alert>`
            };

            // 将 SVG 节点插入到 blockquote 的第一个位置
            node.children.unshift(svgNode);

            // 将关闭标签节点插入到 blockquote 的最后一个位置
            node.children.push(closingTagNode);
        });
    };
}
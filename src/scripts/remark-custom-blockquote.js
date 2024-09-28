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
<svg fill="#393939" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 14">
    <path d="M12,14h4c1.1,0,2-0.9,2-2V8c0-1.1-0.9-2-2-2h-4V5c0-1.7,1.3-3,3-3h1c0.6,0,1-0.4,1-1s-0.4-1-1-1h-1
	c-2.8,0-5,2.2-5,5v7C10,13.1,10.9,14,12,14z M2,14h4c1.1,0,2-0.9,2-2V8c0-1.1-0.9-2-2-2H2V5c0-1.7,1.3-3,3-3h1c0.6,0,1-0.4,1-1
	S6.6,0,6,0H5C2.2,0,0,2.2,0,5v7C0,13.1,0.9,14,2,14z"/>
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
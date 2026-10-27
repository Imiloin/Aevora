import { defineMdastPlugin } from 'satteri';

export function bareTextDirectives() {
  return defineMdastPlugin({
    name: 'aevora-bare-text-directives',
    options: { position: true },
    textDirective(node, ctx) {
      // Inspect the source to distinguish :name from explicit :name[] or :name{}.
      const { start, end } = node.position!;
      const source = ctx.source.slice(start.offset, end.offset);
      if (source === `:${node.name}`) {
        ctx.replaceNode(node, { type: 'text', value: source });
      }
    },
  });
}

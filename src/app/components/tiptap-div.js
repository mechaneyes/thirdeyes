import { Node, mergeAttributes } from '@tiptap/core';
import { ReplaceStep } from 'prosemirror-transform';
import { Slice, Fragment } from 'prosemirror-model';

const TiptapDiv = Node.create({
  name: 'div',
  group: 'block',
  content: 'block+',

  parseHTML() {
    return [
      {
        tag: 'div',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const customClass = 'tiptap__inner';
    return ['div', mergeAttributes(HTMLAttributes, { class: customClass }), 0];
  },

  addCommands() {
    return {
      wrapInDiv: (attributes = {}) => ({ chain }) => {
        const divAttributes = mergeAttributes({ class: 'tiptap__inner' }, attributes);

        return chain().command(({ tr, editor }) => {
          const { doc } = tr;
          tr.step(
            new ReplaceStep(
              0,
              editor.state.doc.content.size,
              new Slice(Fragment.from(editor.schema.nodes.div.create(divAttributes, doc.content)), 0, 0),
            ),
          );
          return true;
        }).run();
      },
    };
  },
});

export default TiptapDiv;

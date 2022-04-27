import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import css from 'highlight.js/lib/languages/css';
import html from 'highlight.js/lib/languages/xml';
import hljsVuePlugin from '@highlightjs/vue-plugin';
import 'highlight.js/styles/androidstudio.css';
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('css', css);
hljs.registerLanguage('html', html);
export default {
  components: {
    highlightjs: hljsVuePlugin.component,
  },
};

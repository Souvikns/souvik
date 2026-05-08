import rehypeExternalLinks from 'rehype-external-links'
import rehypeSanitize, { defaultSchema, type Options as SanitizeOptions } from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'

const markdownSchema: SanitizeOptions = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    code: [...(defaultSchema.attributes?.code ?? []), ['className', /^language-[\w-]+$/]],
    a: [...(defaultSchema.attributes?.a ?? []), ['target'], ['rel']],
  },
} as SanitizeOptions

export function renderMarkdownToHtml(markdown: string) {
  return String(
    unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypeExternalLinks, {
        target: '_blank',
        rel: ['noopener', 'noreferrer'],
      })
      .use(rehypeSanitize, markdownSchema)
      .use(rehypeStringify)
      .processSync(markdown)
  )
}

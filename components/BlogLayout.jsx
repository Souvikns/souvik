import formatDate from "../lib/utils/formatDate";
import PageTitle from "./PageTitle";
import SectionContainer from "./SectionContainer";

export default function BlogLayout({ frontmatter, next, prev, children }) {
  const { date, title } = frontmatter;

  return (
    <SectionContainer>
      <article>
        <div>
          <header>
            <div className="text-center pb-10 space-y-1 border-b">
              <dl>
                <dt className="sr-only">Published on</dt>
                <dd>
                  <time dateTime={date}>{formatDate(date)}</time>
                </dd>
              </dl>
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
            </div>
          </header>
        </div>
      </article>

      <div className="prose">{children}</div>
    </SectionContainer>
  );
}
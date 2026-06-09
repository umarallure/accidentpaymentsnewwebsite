/**
 * Renders schema.org JSON-LD into the document.
 *
 * Server component (no "use client") so the markup is in the initial HTML where
 * crawlers read it. Accepts a single schema object or an array; each becomes its
 * own <script type="application/ld+json"> tag.
 */

type Schema = Record<string, unknown>;

export function JsonLd({ schema }: { schema: Schema | Schema[] }) {
  const items = Array.isArray(schema) ? schema : [schema];

  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          // Structured data is build-time/static content from our own modules —
          // never user input — so direct injection is safe here.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}

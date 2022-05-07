import { MicroCMSContentId } from "microcms-js-sdk";
import { GetStaticPaths, GetStaticProps } from "next";
import { client } from "src/libs/client";

const BlogID = () => {
  return (
    <div>
      <h1>test</h1>
      <time>test</time>
      <div>test</div>
    </div>
  );
};
console.log();

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  const data = await client.getList({ endpoint: "blog" });
  const ids = data.contents.map((content) => `/blog/${content.id}`);
  return {
    paths: ids,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{}, { id: string }> = async (
  ctx
) => {
  if (!ctx.params) {
    return { notFound: true };
  }

  const data = await client.getListDetail({
    endpoint: "blog",
    contentId: ctx.params.id,
  });
};

export default BlogID;

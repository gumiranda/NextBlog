import Avatar from "./avatar";
import DateFormatter from "./date-formatter";
import Link from "next/link";
import Author from "../types/author";
import { useFetch } from "lib/fetcher";
import PostViews from "./post-views";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author: Author;
  slug: string;
};

const HeroPost = ({ title, coverImage, date, excerpt, author, slug }: Props) => {
  const { data } = useFetch(`/api/page-views-preview?id=${slug}`, true);

  const views = data?.total;

  return (
    <section>
      <div className="bg-purple-700 md:grid md:grid-cols-2 md:col-gap-16 lg:col-gap-8 mb-0 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-6xl leading-tight">
            <Link as={`/posts/${slug}`} href="/posts/[slug]">
              <a className="hover:underline">{title}</a>
            </Link>
          </h3>
          <div className="mb-4 md:mb-0 text-lg">
            <DateFormatter dateString={date} /> -{" "}
            <PostViews>{`${views >= 0 ? views : "..."} visualizações`}</PostViews>
          </div>
        </div>
        <div>
          <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
          <Avatar name={author.name} picture={author.picture} />
        </div>
      </div>
    </section>
  );
};

export default HeroPost;

import { CMS_NAME } from "lib/constants";

const Intro = () => {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        Laritcha UI/UX Designer Thinker
      </h1>
      <h2 className="text-center md:text-left text-lg mt-5 md:pl-8">
        Confira seus projetos e portfólios e {CMS_NAME}.
      </h2>
    </section>
  );
};

export default Intro;

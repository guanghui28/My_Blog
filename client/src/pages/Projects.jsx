/* eslint-disable react/no-unescaped-entities */
import CallToAction from "../components/ui/CallToAction";

const Projects = () => {
	// todo: add more project
	return (
		<section className="min-h-screen max-w-2xl mx-auto flex justify-center items-center flex-col gap-6 p-3">
			<h1 className="text-3xl font-semibold text-center my-7">Projects</h1>
			<p className="text-md text-justify text-slate-700 dark:text-white/80">
				This page serves as a window into my ongoing journey of learning and
				mastering ReactJS. Here, you'll find a collection of projects I've
				built, each one a stepping stone in my quest to solidify my
				understanding of this dynamic framework.
			</p>
			<CallToAction />
		</section>
	);
};

export default Projects;

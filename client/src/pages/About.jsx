/* eslint-disable react/no-unescaped-entities */
const About = () => {
	return (
		<section className="min-h-screen flex items-center justify-center">
			<div className="max-w-2xl mx-auto p-3 ">
				<div>
					<h1 className="text-3xl font-semibold text-center my-7">
						About GuangHui's Blog
					</h1>
					<div className="text-md text-justify text-slate-700 dark:text-white/80 flex flex-col gap-6">
						<p className="">
							This interactive web application serves as a learning playground
							for me to delve into the exciting world of ReactJS. As I embark on
							this journey, I'm actively building this blog app to solidify my
							understanding of React's core concepts and practical
							implementation.
						</p>
						<p>
							This project is an ongoing exploration of ReactJS. As I progress,
							I'll continuously refine and add new features. Feel free to check
							back periodically to see the latest developments!
						</p>
						<p>
							This description provides a clear overview of your project's
							purpose, the specific ReactJS skills you're focusing on, and the
							iterative learning approach you're taking. Feel free to customize
							it further
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default About;

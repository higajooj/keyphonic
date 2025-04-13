// TODO: sort css classes (prettier and biomejs)
// https://biomejs.dev/linter/rules/use-sorted-classes/
const Home = () => {
	return (
		// TODO: Icons library: (https://lucide.dev/ ??)
		<>
			<div className="bg-black text-gray-200 text-xs flex justify-end px-4 py-2">
				{/*TODO: add "pin" icon*/}
				<span>Deliver to 123456</span>
			</div>
			<div className="flex justify-between border-b border-gray-200 py-6 px-12 items-baseline">
				<h1 className="font-bold text-2xl">KeyPhonic</h1>

				<div className="asd">
					<a href="#" className="asd">
						Sign in
					</a>
				</div>
			</div>
		</>
	);
};

export default Home;

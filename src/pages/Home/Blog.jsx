import { Fade } from "react-awesome-reveal";
import './blog.css'
const Blog = () => {
    return (
		<div className="text-gray-600 font-body">
		<div>
		  <main className="bg-gray-100 px-16 py-6 min-h-screen">
			<div className="">
			  <h4 className="font-bold mt-12 text-4xl pb-2 border-b border-gray-200">
				Latest Recipes
			  </h4>
			  <Fade>
			  <div className="mt-8 grid lg:grid-cols-3 gap-10">
				<div className="card hover:shadow-lg">
				  <img
					src="https://i.ibb.co/tpCdNcX/stew.jpg"
					alt="stew"
					className="w-full h-32 sm:h-48 object-cover"
				  />
				  <div className="m-4">
					<span className="font-bold">5 Bean Chilli Stew</span>
					<span className="block text-gray-500 text-sm">
					  Recipe by Mario
					</span>
				  </div>
				  <div className="badge">
					<svg
					  className="w-5 inline-block"
					  xmlns="http://www.w3.org/2000/svg"
					  fill="none"
					  viewBox="0 0 24 24"
					  stroke="currentColor"
					>
					  <path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
					  />
					</svg>
					<span>25 mins</span>
				  </div>
				</div>
				<div className="card hover:shadow-lg">
				  <img
					src="https://i.ibb.co/b1DQyfG/noodles.jpg"
					alt="noodles"
					className="w-full h-32 sm:h-48 object-cover"
				  />
				  <div className="m-4">
					<span className="font-bold">Veg Noodles</span>
					<span className="block text-gray-500 text-sm">
					  Recipe by Mario
					</span>
				  </div>
				  <div className="badge">
					<svg
					  className="w-5 inline-block"
					  xmlns="http://www.w3.org/2000/svg"
					  fill="none"
					  viewBox="0 0 24 24"
					  stroke="currentColor"
					>
					  <path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
					  />
					</svg>
					<span>15 mins</span>
				  </div>
				</div>
				<div className="card hover:shadow-lg">
				  <img
					src="https://i.ibb.co/ZdP6cKQ/curry.jpg"
					alt="curry"
					className="w-full h-32 sm:h-48 object-cover"
				  />
				  <div className="m-4">
					<span className="font-bold">Tofu Curry</span>
					<span className="block text-gray-500 text-sm">
					  Recipe by Mario
					</span>
				  </div>
				  <div className="badge">
					<svg
					  className="w-5 inline-block"
					  xmlns="http://www.w3.org/2000/svg"
					  fill="none"
					  viewBox="0 0 24 24"
					  stroke="currentColor"
					>
					  <path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
					  />
					</svg>
					<span>30 mins</span>
				  </div>
				</div>
			  </div>
			  </Fade>
			</div>
		  </main>
		</div>
	  </div>
	  
    );
};

export default Blog;
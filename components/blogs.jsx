import PropTypes from 'prop-types';


const Blog = (props) => {
	return <div className="rounded shadow-md my-8" key={props.id}>
		<div className="flex">
			<div>
				<img src={props.coverImage} className="rounded-l" alt="coverImage" />
			</div>
			<div className="px-8 py-4 flex-column" >
				<a href={`https://souvikns.hashnode.dev/${props.slug}`}>
					<span className="text-2xl font-bold text-gray-600 hover:text-red-400">{props.title}</span>
				</a>

				<div className="my-4"></div>

				<p className="break text-gray-500">{props.brief}</p>
			</div>
		</div>
	</div>
}

Blog.propTypes = {
	id: PropTypes.string,
	title: PropTypes.string,
	coverImage: PropTypes.string,
	slug: PropTypes.string,
	brief: PropTypes.string
}

const Blogs = (props) => {
	return <div>
		{props.blogs.map(el => <Blog
			id={el.cuid}
			title={el.title}
			coverImage={el.coverImage}
			slug={el.slug}
			brief={el.brief}
		/>)}
	</div>
}

Blogs.propTypes = {
	blogs: PropTypes.array
}

export default Blogs;
import PropTypes from 'prop-types';
import client from '../apollo-client';
import { gql } from '@apollo/client';
import { useEffect, useState } from 'react';

const Blog = (props) => {
	return <div className="rounded shadow-md" key={props.id}>
		<div className="flex">
			<div>
				<img src={props.coverImage} className="rounded-l" alt="coverImage" />
			</div>
			<div className="px-8 py-4 flex-column divide-y divide-light-blue-400  space-y-6" >
				<a href={`https://souvikns.hashnode.dev/${props.slug}`}>
					<span className="text-2xl font-bold text-gray-600 hover:text-red-400">{props.title}</span>
				</a>

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
	let [blogs, setBlogs] = useState([]);
	const fetchBlogs = async () => {
		const { data, loading } = await client.query({
			query: gql`
			    query {
  user(username: "Souvikns"){
    username
    name
    _id
    tagline
    numFollowing
    photo
    publication {
      _id
      author
      title
      posts {
        title
        slug
        cuid
        totalReactions
        coverImage
        brief
      }
    }
  }
}
			`
		});
		let posts = data.user.publication.posts;
		setBlogs(posts);
	}
	useEffect(() => {
		fetchBlogs();
	}, [])
	return <div className="flex-column space-y-8">
		{blogs.map(el => <Blog
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
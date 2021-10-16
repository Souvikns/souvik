import client from '../../apollo-client';
import {useQuery, gql} from '@apollo/client';

export default () => {

  const blogQuery = gql`
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
        _id
      }
    }
  }
}
  `

  const {loading, error, data} = useQuery(blogQuery, {client: client})
  console.log(data, error);
  
  return <div>
    <h1 className="md:text-2xl text-xl font-bold">📃 Blogs</h1>

    <ul className="list-inside list-disc py-2">
      {(loading === false && typeof data !== 'undefined')? data.user.publication.posts.map(el => <li key={el.slug}>
        <a className="text-blue-600" href={`https://souvikns.hashnode.dev/${el.slug}`}>{el.title}</a>
        </li>) :null}
    </ul>
  </div>
}
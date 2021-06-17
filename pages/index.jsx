import React from "react";
import Navbar from "../components/navbar";
import { SCREEN_PADDING } from '../styleconstants';
import client from '../apollo-client';
import { gql } from '@apollo/client';
import Blogs from '../components/blogs';
import Landing from '../components/landing';

export default (props) => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <Landing />
      </div>


    </div>
  );
};

// export async function getStaticProps(context) {
//   const { data } = await client.query({
//     query: gql`
//     query {
//   user(username: "Souvikns"){
//     username
//     name
//     _id
//     tagline
//     numFollowing
//     photo
//     publication {
//       _id
//       author
//       title
//       posts {
//         title
//         slug
//         cuid
//         totalReactions
//         coverImage
//         brief
//       }
//     }
//   }
// }
//     `
//   })
//   let posts = data.user.publication.posts;
//   return {
//     props: { data, posts }
//   }
// }
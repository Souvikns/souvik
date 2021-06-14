import React from "react";
import Navbar from "../components/navbar";
import Screens from '../components/screens';
import { SCREEN_PADDING } from '../styleconstants';
import client from '../apollo-client';
import { gql } from '@apollo/client';

export default (props) => {
  console.log(props.data.user.publication.posts);
  return (
    <div>
      <Navbar />

      <div className={`${SCREEN_PADDING}`}>
        <Screens />
      </div>
    </div>
  );
};

export async function getStaticProps(context) {
  const { data } = await client.query({
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
      }
    }
  }
}
    `
  })
  let posts = data.user.publication.posts;
  return {
    props: { data, posts }
  }
}

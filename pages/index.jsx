import React from "react";
import Navbar from "../components/navbar";
import { SCREEN_PADDING } from '../styleconstants';
import client from '../apollo-client';
import { gql } from '@apollo/client';
import Blogs from '../components/blogs';
import Landing from '../components/landing';
import GithubContibutions from "../components/github-contibutions";

export default (props) => {
  return (
    <div>
      <Navbar />

      <div className="my-52" id="My Pitch">
        <h1 className="text-6xl heading text-secondary">Hi, I'm Souvik.</h1>
        <div className="py-2" />
        <p className="font-light w-7/12 sub-heading text-xl">
          I am an undergrad software developer, with 3 years of experience. I spent most of my days hacking things and contributing to cool open source projects. 
        </p>
      </div>

      <GithubContibutions />

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
        brief
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
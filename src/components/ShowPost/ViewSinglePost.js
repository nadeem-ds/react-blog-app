import React from "react";
import Page from "../Page/Page";

const ViewSinglePost = () => {
  return (
    <Page title="singlePost">
      <div class="d-flex justify-content-between">
        <h2>Example Post Title</h2>
        <span class="pt-2">
          <a href="#" class="text-primary mr-2" title="Edit">
            <i class="fas fa-edit"></i>
          </a>
          <a class="delete-post-button text-danger" title="Delete">
            <i class="fas fa-trash"></i>
          </a>
        </span>
      </div>
      <p class="text-muted small mb-4">
        <a href="#">
          <img
            class="avatar-tiny"
            src="https://gravatar.com/avatar/b9408a09298632b5151200f3449434ef?s=128"
          />
        </a>
        Posted by <a href="#">brad</a> on 2/10/2020
      </p>
      <div class="body-content">
        <p>
          Lorem ipsum dolor sit <strong>example</strong> post adipisicing elit.
          Iure ea at esse, tempore qui possimus soluta impedit natus voluptate,
          sapiente saepe modi est pariatur. Aut voluptatibus aspernatur fugiat
          asperiores at.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae quod
          asperiores corrupti omnis qui, placeat neque modi, dignissimos, ab
          exercitationem eligendi culpa explicabo nulla tempora rem? Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Iure ea at esse, tempore
          qui possimus soluta impedit natus voluptate, sapiente saepe modi est
          pariatur. Aut voluptatibus aspernatur fugiat asperiores at.
        </p>
      </div>
    </Page>
  );
};

export default ViewSinglePost;

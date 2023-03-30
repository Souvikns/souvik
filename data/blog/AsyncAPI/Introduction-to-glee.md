---
title: Why Glee could be the future of API development
date: '2023-03-22'
draft: false
tags: ['AsyncAPI', 'Glee']
summary:  Exploring Glee Framework. 
images: ['static/images/ameen-fahmy-_gEKtyIbRSM-unsplash.jpg']
---


For the last year, I have been working full-time on AsyncAPI, where I have actively taken part in building a new framework called [glee](https://github.com/asyncapi/glee). In this blog, I will share my thoughts and opinion on glee and provide insights into the exciting future that I see for this innovative API framework. 


## What is Glee?

[Glee](https://github.com/asyncapi/glee) is a powerful spec-first framework that streamlines the process of building server-side applications. By integrating your code with the spec, Glee takes care of the heavy lifting involved in creating and managing connections, allowing you to focus on the business logic that truly matters. 


## Features of Glee

### 1. Spec and your code are always in sync

Glee's exceptional capability to keep your code and spec synchronized is a standout feature that sets it apart from other frameworks. While some frameworks may permit developers to stray from the spec, Glee eliminates this possibility altogether. This compels you to embrace a spec-first methodology, ensuring that your API is always entirely defined and coherent.

Whenever you wish to alter your API, the changes must first be made to the spec. This approach guarantees that all incoming and outgoing messages are continuously validated against the specification, resulting in a cohesive development experience where your docs, spec, and code stay closely aligned. This robust validation process ensures that your API always performs as intended, providing a reliable and consistent experience for your users.


### 2. Glee creates your documentation automatically. 

When creating an API, it's important to document it so that others can understand how to interact with it. While you can generate API documentation using AsyncAPI, with glee, we take it a step further by eliminating the need for a manual generation. Glee generates documentation automatically as you develop your API, making the process seamless and effortless.


### 3. Glee manage your connections 

Glee simplifies the process of creating and maintaining connections, allowing you to concentrate solely on developing code that meets your business needs. By handling performance, scalability, resilience, and all other aspects necessary for production-readiness, Glee frees you from the burden of managing these technicalities, enabling you to focus on delivering a high-quality application that meets the demands of your users


## We could use your help

To improve Glee, we value user feedback and input. At present, Glee is stable for both websocket and MQTT, but we believe that user testing and feedback can help us make Glee even better. We invite individuals to try out Glee and share their thoughts on its functionality and usability. You can open an issue on our GitHub page at https://github.com/asyncapi/glee.

We are particularly interested in hearing whether users would be comfortable using Glee in production environments. If not, we would like to know what specific features they would require to make Glee a viable production tool. Our goal is to incorporate user feedback to enhance the user experience and ensure that Glee meets the needs of its users.

Therefore, we encourage users to test out Glee and provide feedback that can help us shape its development roadmap. Together, we can build a tool that truly meets the needs of the community.


## Future Plans for Glee.

Our current priority is to ensure the stability of Glee, therefore we have decided to suspend the development of support for new protocols. You can follow the development of glee [here](https://github.com/asyncapi/glee).


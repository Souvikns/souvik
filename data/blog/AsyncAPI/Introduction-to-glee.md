---
title: Why Glee could be the future of API development
date: '2023-03-22'
draft: false
tags: ['AsyncAPI', 'Glee']
summary:  Exploring Glee Framework. 
images: ['static/images/glee-file-structure.png']
---


For the last year, I have been working full-time on AsyncAPI, where I have actively taken part in building a new framework called [glee](https://github.com/asyncapi/glee). This is the first of many to come blogs where I will be talking about glee, and all the cool stuff we can build with it. In this blog, I will just introduce glee and give a broad overview of how to get started and keep up with glee's development.

# Introduction

[Glee](https://github.com/asyncapi/glee) is a powerful spec-first framework that streamlines the process of building server-side applications. By integrating your code with the spec, Glee takes care of the heavy lifting involved in creating and managing connections, allowing you to focus on the business logic that truly matters.

 - It makes sure your code, specification and documentation are synchronized, glee eliminates the possibility to stray from the spec, which compels you to embrace a spec-first methodology, ensuring that your API is always entirely defined and coherent. When your API evolves it does so along with the specification and documentation.

 - Glee simplifies the process of creating and maintaining connections, allowing you to concentrate solely on developing code that meets your business needs. By handling performance, scalability, resilience, and all other aspects necessary for production-readiness, Glee frees you from the burden of managing these technicalities, enabling you to focus on delivering a high-quality application that meets the demands of your users.


# Getting Started With Glee

Let's create a simple WebSocket API using glee to understand its magic. We will create a simple WebSocket server that receives a current time from the client and then send a "good morning", "good evening" or "good night" respectively.

### Setting up a glee project.

To work with Glee, you must install NPM and NodeJs version 10 or higher. To check if you have both installed, run the following commands in your terminal. 

```bash
# check if node is installed
node -v
# or
node --version

# check if NPM is installed
npm -v
# or
npm --version

```

If you don't have any of the above tools missing go ahead and install them.



#### Create glee project 

We recommend creating a new Glee app using `create-glee-app` which sets up everything automatically. (You don't need to create an empty directory. create-glee-app will make one for you.) To create a project, run:

```bash

npx create-glee-app

```

> `create-glee-app` can get decricated in the future as we are trying to bring this functionality to our CLI application. Check [here](https://github.com/asyncapi/cli/pull/418) for update. 


Once the process is complete you should have a new Glee app ready for development and see these files that were made.

<center>
![Glee File Structure](/static/images/glee-file-structure.png)
</center>


#### Define our Spec for our API

Glee being a spec-first framework, development starts with defining your API spec. For our case we will define our API 


```yaml:asyncapi.yaml
asyncapi: 2.1.0
info:
  title: Greet Bot
  version: 0.1.0

servers:
  websockets:
    url: ws://0.0.0.0:3000
    protocol: ws

channels:
  greet:
    publish:
      operationId: onGreet
      message:
        $ref: '#/components/messages/time'
    subscribe:
      messages:
        $ref: '#/components/messages/greet'

components:
  messages:
    time:
      payload:
        type: object
        properties:
          currentTime:
            type: number
          name:
            type: string
    greet:
      payload:
        type: string
```
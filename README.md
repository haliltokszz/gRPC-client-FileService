<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

**Introduction**

This is a Nest.js gRPC client application for file management. It uses the same proto file as the .NET Core 7 gRPC server.

**Prerequisites**

* Nest.js
* Node.js
* gRPC (@grpc/proto-loader and ts-proto) and protoc
* rxjs (for stream communication)

**Building and running the application**

To build and run the application, run the following commands:

```
npm install
npm run build
```

**Usage**

The application exposes three endpoints:

* `/file-controller/download` - Downloads a file from the server.
* `/file-controller/upload` - Uploads a file to the server.
* `/file-controller/get-file-path` - Gets the path of a file on the server.

**Download a file**

To download a file from the server, send a GET request to the `/file-controller/download` endpoint with the file name and extension as query parameters. The endpoint will return a stream of bytes, which you can write to a file on your local machine.

**Example:**

```
curl localhost:5001/file-controller/download?fileName=my-file.txt&fileExtension=txt
```

**Upload a file**

To upload a file to the server, send a POST request to the `/file-controller/upload` endpoint with the file as a form data parameter. The endpoint will save the file to the server.

**Example:**

```
curl -F "file=@my-file.txt" localhost:5001/file-controller/upload
```

**Get the path of a file**

To get the path of a file on the server, send a GET request to the `/file-controller/get-file-path` endpoint with the file name and extension as query parameters. The endpoint will return the path of the file on the server.

**Example:**

```
curl localhost:5001/file-controller/get-file-path?fileName=my-file.txt&fileExtension=txt
```

**Conclusion**

This is a simple Nest.js gRPC client application for file management. It can be used to download, upload, and get the path of files on a server.
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
